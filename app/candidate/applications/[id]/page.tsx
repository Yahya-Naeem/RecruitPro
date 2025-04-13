"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CandidateNavbar } from "@/components/candidate-navbar"
import {
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  CalendarClock,
  ChevronRight,
  Download,
  Send,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface ApplicationStep {
  id: number
  name: string
  date: string
  status: "completed" | "current" | "upcoming"
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  isEmployer: boolean
}

interface Interview {
  id: string
  type: string
  date: string
  time: string
  duration: string
  interviewers: string[]
  location?: string
  meetingLink?: string
  notes?: string
  status: "scheduled" | "completed" | "cancelled"
}

export default function ApplicationDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const applicationId = params.id as string
  const [loading, setLoading] = useState(true)
  const [messageText, setMessageText] = useState("")
  const [isSending, setIsSending] = useState(false)

  // Mock application data
  const [application, setApplication] = useState({
    id: applicationId,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp",
    companyLogo: "/placeholder.svg?height=64&width=64",
    location: "San Francisco, CA (Remote)",
    appliedDate: "May 15, 2023",
    status: "interview",
    matchScore: 92,
    salary: "$120,000 - $150,000",
    jobType: "Full-time",
    description:
      "We are looking for a Senior Frontend Developer to join our team and help build innovative web applications. The ideal candidate has strong experience with modern JavaScript frameworks and a passion for creating exceptional user experiences.",
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and Next.js",
      "Experience with responsive design and cross-browser compatibility",
      "Knowledge of modern frontend build tools and practices",
      "Excellent problem-solving skills and attention to detail",
    ],
    resume: {
      filename: "john_doe_resume.pdf",
      uploadDate: "May 15, 2023",
    },
    coverLetter: {
      filename: "john_doe_cover_letter.pdf",
      uploadDate: "May 15, 2023",
    },
  })

  const [applicationSteps, setApplicationSteps] = useState<ApplicationStep[]>([
    {
      id: 1,
      name: "Application Submitted",
      date: "May 15, 2023",
      status: "completed",
    },
    {
      id: 2,
      name: "Application Reviewed",
      date: "May 18, 2023",
      status: "completed",
    },
    {
      id: 3,
      name: "Initial Screening",
      date: "May 22, 2023",
      status: "completed",
    },
    {
      id: 4,
      name: "Technical Interview",
      date: "May 29, 2023",
      status: "current",
    },
    {
      id: 5,
      name: "Final Interview",
      date: "TBD",
      status: "upcoming",
    },
    {
      id: 6,
      name: "Decision",
      date: "TBD",
      status: "upcoming",
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Sarah Johnson, HR Manager",
      content:
        "Thank you for applying to the Senior Frontend Developer position at TechCorp. We've reviewed your application and would like to schedule an initial screening call.",
      timestamp: new Date(2023, 4, 18, 14, 30), // May 18, 2023, 2:30 PM
      isEmployer: true,
    },
    {
      id: "2",
      sender: "John Doe",
      content:
        "Thank you for considering my application. I'm available for a screening call this week. Please let me know what times work best for you.",
      timestamp: new Date(2023, 4, 18, 16, 45), // May 18, 2023, 4:45 PM
      isEmployer: false,
    },
    {
      id: "3",
      sender: "Sarah Johnson, HR Manager",
      content:
        "Great! How about this Friday (May 22) at 10:00 AM PST? The call will be with our technical lead, Michael Chen, and should last about 30 minutes.",
      timestamp: new Date(2023, 4, 19, 9, 15), // May 19, 2023, 9:15 AM
      isEmployer: true,
    },
    {
      id: "4",
      sender: "John Doe",
      content: "Friday at 10:00 AM PST works perfectly for me. I look forward to speaking with Michael.",
      timestamp: new Date(2023, 4, 19, 10, 30), // May 19, 2023, 10:30 AM
      isEmployer: false,
    },
    {
      id: "5",
      sender: "Sarah Johnson, HR Manager",
      content:
        "Your initial screening went well! We'd like to invite you for a technical interview. This will be a more in-depth discussion about your technical skills and experience.",
      timestamp: new Date(2023, 4, 23, 11, 0), // May 23, 2023, 11:00 AM
      isEmployer: true,
    },
  ])

  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: "1",
      type: "Initial Screening",
      date: "May 22, 2023",
      time: "10:00 AM - 10:30 AM PST",
      duration: "30 minutes",
      interviewers: ["Michael Chen, Technical Lead"],
      location: "Remote",
      meetingLink: "https://zoom.us/j/123456789",
      notes: "General discussion about your experience and the role.",
      status: "completed",
    },
    {
      id: "2",
      type: "Technical Interview",
      date: "May 29, 2023",
      time: "1:00 PM - 2:30 PM PST",
      duration: "90 minutes",
      interviewers: ["Michael Chen, Technical Lead", "Lisa Wong, Senior Developer"],
      location: "Remote",
      meetingLink: "https://zoom.us/j/987654321",
      notes:
        "This will include technical questions, a code review discussion, and a system design problem. Please be prepared to share your screen.",
      status: "scheduled",
    },
  ])

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message before sending.",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)

    // Simulate sending a message
    setTimeout(() => {
      const newMessage: Message = {
        id: `message-${Date.now()}`,
        sender: "John Doe",
        content: messageText,
        timestamp: new Date(),
        isEmployer: false,
      }

      setMessages([...messages, newMessage])
      setMessageText("")
      setIsSending(false)

      toast({
        title: "Message sent",
        description: "Your message has been sent to the employer.",
      })
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "interview":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Interview Stage
          </Badge>
        )
      case "reviewing":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <AlertCircle className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      case "offered":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Offer Received
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  const getInterviewStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <Calendar className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <CandidateNavbar />
        <main className="container mx-auto py-8 px-4 pt-20 md:pt-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-8 animate-pulse">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-4 md:mt-0"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CandidateNavbar />
      <main className="container mx-auto py-8 px-4 pt-20 md:pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/candidate/applications"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Applications
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                  <img
                    src={application.companyLogo || "/placeholder.svg"}
                    alt={application.company}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-1">{application.jobTitle}</h1>
                  <p className="text-muted-foreground mb-2">{application.company}</p>
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{application.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Applied on {application.appliedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">{getStatusBadge(application.status)}</div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Application Progress</h2>
                <span className="text-sm font-medium">
                  Step {applicationSteps.findIndex((step) => step.status === "current") + 1} of{" "}
                  {applicationSteps.length}
                </span>
              </div>
              <Progress
                value={
                  ((applicationSteps.filter((step) => step.status === "completed").length +
                    (applicationSteps.some((step) => step.status === "current") ? 0.5 : 0)) /
                    applicationSteps.length) *
                  100
                }
                className="h-2 mb-4"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {applicationSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`p-3 rounded-md border ${
                      step.status === "current"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : step.status === "completed"
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`rounded-full p-1 mr-2 ${
                          step.status === "current"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : step.status === "completed"
                              ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : step.status === "current" ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{step.name}</p>
                        <p className="text-xs text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Job Details</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="interviews">Interviews</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Job Description</h2>
                    <p className="text-muted-foreground">{application.description}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {application.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <div className="flex items-center mb-2">
                        <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                        <h3 className="font-medium">Job Type</h3>
                      </div>
                      <p>{application.jobType}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                        <h3 className="font-medium">Location</h3>
                      </div>
                      <p>{application.location}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                        <h3 className="font-medium">Applied On</h3>
                      </div>
                      <p>{application.appliedDate}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                      <div className="flex items-center mb-2">
                        <AlertCircle className="h-5 w-5 mr-2 text-muted-foreground" />
                        <h3 className="font-medium">Salary Range</h3>
                      </div>
                      <p>{application.salary}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium mr-2">Match Score:</span>
                      <span
                        className={`font-semibold ${
                          application.matchScore >= 90
                            ? "text-green-600 dark:text-green-400"
                            : application.matchScore >= 80
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-orange-600 dark:text-orange-400"
                        }`}
                      >
                        {application.matchScore}%
                      </span>
                    </div>
                    <Button>Withdraw Application</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="messages" className="mt-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 rounded-lg ${
                          message.isEmployer
                            ? "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                            : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{message.sender}</span>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleDateString()} at{" "}
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Send a Message</h3>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        rows={4}
                      />
                      <div className="flex justify-end">
                        <Button onClick={handleSendMessage} disabled={isSending}>
                          {isSending ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span> Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" /> Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="interviews" className="mt-6">
                <div className="space-y-6">
                  {interviews.length > 0 ? (
                    interviews.map((interview) => (
                      <Card key={interview.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{interview.type}</CardTitle>
                              <CardDescription>
                                {interview.date} • {interview.time}
                              </CardDescription>
                            </div>
                            {getInterviewStatusBadge(interview.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium mb-1">Duration</p>
                                <p className="text-sm text-muted-foreground">{interview.duration}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">Location</p>
                                <p className="text-sm text-muted-foreground">{interview.location}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-1">Interviewers</p>
                                <ul className="text-sm text-muted-foreground">
                                  {interview.interviewers.map((interviewer, index) => (
                                    <li key={index}>{interviewer}</li>
                                  ))}
                                </ul>
                              </div>
                              {interview.meetingLink && (
                                <div>
                                  <p className="text-sm font-medium mb-1">Meeting Link</p>
                                  <a
                                    href={interview.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                  >
                                    {interview.meetingLink}
                                  </a>
                                </div>
                              )}
                            </div>
                            {interview.notes && (
                              <div>
                                <p className="text-sm font-medium mb-1">Notes</p>
                                <p className="text-sm text-muted-foreground">{interview.notes}</p>
                              </div>
                            )}
                            {interview.status === "scheduled" && (
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Reschedule</Button>
                                <Button>Add to Calendar</Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <CalendarClock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Interviews Scheduled</h3>
                      <p className="text-muted-foreground mb-4">
                        You don't have any interviews scheduled for this application yet.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Application Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Resume</CardTitle>
                          <CardDescription>Uploaded on {application.resume.uploadDate}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-8 w-8 text-muted-foreground mr-2" />
                              <span>{application.resume.filename}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Cover Letter</CardTitle>
                          <CardDescription>Uploaded on {application.coverLetter.uploadDate}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-8 w-8 text-muted-foreground mr-2" />
                              <span>{application.coverLetter.filename}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-4">Update Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Update Resume</CardTitle>
                          <CardDescription>Upload a new version of your resume</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <input type="file" className="text-sm" />
                            <Button size="sm">Upload</Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Update Cover Letter</CardTitle>
                          <CardDescription>Upload a new version of your cover letter</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <input type="file" className="text-sm" />
                            <Button size="sm">Upload</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Similar Job Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-1">Frontend Developer</h3>
                <p className="text-sm text-muted-foreground mb-2">WebTech Inc.</p>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Remote</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">95% Match</Badge>
                  <Button variant="outline" size="sm">
                    View Job
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-1">Senior React Developer</h3>
                <p className="text-sm text-muted-foreground mb-2">AppWorks</p>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>New York, NY</span>
                </div>
                <div className="flex justify-between items-center">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">90% Match</Badge>
                  <Button variant="outline" size="sm">
                    View Job
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
