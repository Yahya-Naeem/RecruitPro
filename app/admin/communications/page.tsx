"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AdminNavbar } from "@/components/admin-navbar"
import { useToast } from "@/components/ui/use-toast"
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { AIMessageGenerator } from "@/components/ai-message-generator"

interface Message {
  id: string
  candidateId: string
  candidateName: string
  candidateEmail: string
  subject: string
  content: string
  sentAt: Date
  read: boolean
}

export default function CommunicationsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("inbox")
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<{ id: string; name: string; email: string } | null>(null)
  const [subject, setSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAIGenerator, setShowAIGenerator] = useState(false)

  useEffect(() => {
    if (user) {
      fetchMessages()
    }
  }, [user])

  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const messagesQuery = query(
        collection(db, "messages"),
        where("employerId", "==", user?.uid),
        orderBy("sentAt", "desc"),
      )

      const querySnapshot = await getDocs(messagesQuery)
      const fetchedMessages: Message[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        fetchedMessages.push({
          id: doc.id,
          candidateId: data.candidateId,
          candidateName: data.candidateName,
          candidateEmail: data.candidateEmail,
          subject: data.subject,
          content: data.content,
          sentAt: data.sentAt.toDate(),
          read: data.read,
        })
      })

      setMessages(fetchedMessages)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCandidate) {
      toast({
        title: "No candidate selected",
        description: "Please select a candidate to send a message to.",
        variant: "destructive",
      })
      return
    }

    if (!subject || !messageContent) {
      toast({
        title: "Missing information",
        description: "Please provide both subject and message content.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      await addDoc(collection(db, "messages"), {
        employerId: user?.uid,
        employerName: user?.displayName,
        employerEmail: user?.email,
        candidateId: selectedCandidate.id,
        candidateName: selectedCandidate.name,
        candidateEmail: selectedCandidate.email,
        subject,
        content: messageContent,
        sentAt: serverTimestamp(),
        read: false,
      })

      toast({
        title: "Message sent",
        description: `Your message has been sent to ${selectedCandidate.name}.`,
      })

      // Reset form
      setSelectedCandidate(null)
      setSubject("")
      setMessageContent("")
      setShowAIGenerator(false)

      // Refresh messages
      fetchMessages()
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error sending message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAIMessageSelect = (message: string) => {
    setMessageContent(message)
    setShowAIGenerator(false)
  }

  // Mock data for candidates (in a real app, this would come from Firebase)
  const candidates = [
    { id: "1", name: "John Doe", email: "john.doe@example.com" },
    { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
    { id: "3", name: "Michael Johnson", email: "michael.johnson@example.com" },
  ]

  // Mock data for messages (in a real app, this would come from Firebase)
  const mockMessages: Message[] = [
    {
      id: "1",
      candidateId: "1",
      candidateName: "John Doe",
      candidateEmail: "john.doe@example.com",
      subject: "Interview Invitation",
      content: "We would like to invite you for an interview for the Senior Frontend Developer position.",
      sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
    },
    {
      id: "2",
      candidateId: "2",
      candidateName: "Jane Smith",
      candidateEmail: "jane.smith@example.com",
      subject: "Application Status Update",
      content:
        "Thank you for your application. We are currently reviewing your qualifications and will get back to you soon.",
      sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      read: true,
    },
    {
      id: "3",
      candidateId: "3",
      candidateName: "Michael Johnson",
      candidateEmail: "michael.johnson@example.com",
      subject: "Next Steps in Hiring Process",
      content: "Congratulations on passing the initial interview! We would like to schedule a technical assessment.",
      sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
    },
  ]

  const displayMessages = messages.length > 0 ? messages : mockMessages

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Candidate Communications</h1>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="inbox">Sent Messages</TabsTrigger>
              <TabsTrigger value="compose">Compose Message</TabsTrigger>
            </TabsList>

            <TabsContent value="inbox">
              <Card>
                <CardHeader>
                  <CardTitle>Sent Messages</CardTitle>
                  <CardDescription>View all messages sent to candidates</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 border rounded-lg animate-pulse">
                          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  ) : displayMessages.length > 0 ? (
                    <div className="space-y-4">
                      {displayMessages.map((message) => (
                        <div key={message.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{message.subject}</h3>
                              <p className="text-sm text-muted-foreground">
                                To: {message.candidateName} ({message.candidateEmail})
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-muted-foreground">
                                {message.sentAt.toLocaleDateString()} at{" "}
                                {message.sentAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                              {!message.read && <Badge className="ml-2 bg-brand-light text-white">Unread</Badge>}
                            </div>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Start communicating with candidates by composing a message
                      </p>
                      <Button onClick={() => setActiveTab("compose")}>Compose Message</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compose">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compose Message</CardTitle>
                    <CardDescription>Send a message to a candidate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSendMessage} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="candidate" className="block text-sm font-medium">
                          Recipient
                        </label>
                        <select
                          id="candidate"
                          className="w-full p-2 border rounded-md bg-background"
                          value={selectedCandidate?.id || ""}
                          onChange={(e) => {
                            const candidateId = e.target.value
                            const candidate = candidates.find((c) => c.id === candidateId)
                            setSelectedCandidate(candidate || null)
                          }}
                          required
                        >
                          <option value="">Select a candidate</option>
                          {candidates.map((candidate) => (
                            <option key={candidate.id} value={candidate.id}>
                              {candidate.name} ({candidate.email})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Enter message subject"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label htmlFor="message" className="block text-sm font-medium">
                            Message
                          </label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAIGenerator(!showAIGenerator)}
                          >
                            {showAIGenerator ? "Hide AI Generator" : "Use AI Generator"}
                          </Button>
                        </div>
                        <Textarea
                          id="message"
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          placeholder="Enter your message"
                          rows={6}
                          required
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {showAIGenerator && (
                  <AIMessageGenerator
                    candidateName={selectedCandidate?.name}
                    candidateEmail={selectedCandidate?.email}
                    jobTitle="Senior Frontend Developer"
                    onSelectMessage={handleAIMessageSelect}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
