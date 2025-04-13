"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Copy, CheckCircle, RefreshCw } from "lucide-react"

interface AIMessageGeneratorProps {
  candidateName?: string
  candidateEmail?: string
  jobTitle?: string
  onSelectMessage?: (message: string) => void
}

export function AIMessageGenerator({
  candidateName,
  candidateEmail,
  jobTitle,
  onSelectMessage,
}: AIMessageGeneratorProps) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMessage, setGeneratedMessage] = useState("")
  const [messageType, setMessageType] = useState("interview_invitation")
  const [customPrompt, setCustomPrompt] = useState("")
  const [activeTab, setActiveTab] = useState("generate")
  const [selectedTemplate, setSelectedTemplate] = useState("")

  // Mock templates
  const templates = {
    interview_invitation: [
      {
        id: "template1",
        title: "Standard Interview Invitation",
        content: `Dear ${candidateName || "[Candidate Name]"},

Thank you for applying for the ${jobTitle || "[Position]"} role at our company. We were impressed with your qualifications and would like to invite you for an interview to discuss your application further.

Please let us know your availability for the coming week, and we'll schedule a time that works for both of us.

Looking forward to speaking with you!

Best regards,
[Your Name]
[Your Company]`,
      },
      {
        id: "template2",
        title: "Technical Interview Invitation",
        content: `Dear ${candidateName || "[Candidate Name]"},

Thank you for your application for the ${jobTitle || "[Position]"} position. After reviewing your profile, we'd like to invite you for a technical interview to further assess your skills and experience.

The interview will include a coding exercise and discussion about your previous projects. It will last approximately 1 hour.

Please let us know your availability for the next few days, and we'll arrange a suitable time.

Best regards,
[Your Name]
[Your Company]`,
      },
    ],
    rejection: [
      {
        id: "template3",
        title: "Standard Rejection",
        content: `Dear ${candidateName || "[Candidate Name]"},

Thank you for your interest in the ${jobTitle || "[Position]"} position and for taking the time to apply.

After careful consideration, we have decided to move forward with other candidates whose qualifications better match our current needs. We appreciate your interest in our company and wish you success in your job search.

Best regards,
[Your Name]
[Your Company]`,
      },
      {
        id: "template4",
        title: "Encouraging Rejection",
        content: `Dear ${candidateName || "[Candidate Name]"},

Thank you for applying for the ${jobTitle || "[Position]"} role at our company. We appreciate the time and effort you put into your application.

While we were impressed with your background, we have decided to proceed with candidates whose experience more closely aligns with our current requirements. We encourage you to apply for future positions that match your skills and interests.

We wish you the best in your career endeavors.

Sincerely,
[Your Name]
[Your Company]`,
      },
    ],
    offer: [
      {
        id: "template5",
        title: "Job Offer",
        content: `Dear ${candidateName || "[Candidate Name]"},

We are pleased to offer you the position of ${jobTitle || "[Position]"} at our company. We were impressed with your skills, experience, and the insights you shared during the interview process.

The starting salary for this position is $[Salary], and you will be eligible for our comprehensive benefits package including health insurance, retirement plan, and paid time off.

Please review the attached offer letter for complete details. To accept this offer, please sign and return the letter by [Date].

We're excited about the possibility of you joining our team!

Best regards,
[Your Name]
[Your Company]`,
      },
    ],
    followup: [
      {
        id: "template6",
        title: "Interview Follow-up",
        content: `Dear ${candidateName || "[Candidate Name]"},

Thank you for taking the time to interview for the ${jobTitle || "[Position]"} position. It was a pleasure speaking with you and learning more about your background and experience.

We are currently in the process of interviewing candidates and expect to make a decision within the next week. We will contact you as soon as we have an update.

If you have any questions in the meantime, please don't hesitate to reach out.

Best regards,
[Your Name]
[Your Company]`,
      },
    ],
  }

  const handleGenerateMessage = async () => {
    setIsGenerating(true)

    try {
      // In a real implementation, this would call an API endpoint that uses OpenAI or another AI service
      // For demo purposes, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a message based on the selected type and available information
      let generatedContent = ""

      switch (messageType) {
        case "interview_invitation":
          generatedContent = `Dear ${candidateName || "Candidate"},

I hope this message finds you well. We've reviewed your application for the ${jobTitle || "open position"} at our company, and we're impressed with your qualifications and experience.

We would like to invite you for an interview to discuss your application further and learn more about your skills and how they align with our team's needs.

Would you be available for a 45-minute video interview next week? Please let me know your availability, and we can schedule a time that works for both of us.

Looking forward to speaking with you!

Best regards,
[Your Name]
[Your Company]`
          break

        case "rejection":
          generatedContent = `Dear ${candidateName || "Candidate"},

Thank you for your interest in the ${jobTitle || "open position"} and for taking the time to go through our application process.

After careful consideration of your profile against the requirements for this role, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

We appreciate your interest in joining our team and encourage you to apply for future positions that align with your skills and experience.

We wish you the best in your job search and professional endeavors.

Sincerely,
[Your Name]
[Your Company]`
          break

        case "offer":
          generatedContent = `Dear ${candidateName || "Candidate"},

I am delighted to offer you the position of ${jobTitle || "the role"} at our company. After our interviews and discussions, we are confident that your skills, experience, and approach make you an excellent fit for our team.

Your starting salary will be $[Salary] per year, and you will be eligible for our full benefits package, including health insurance, retirement plan, and paid time off.

Your anticipated start date would be [Start Date]. Please review the attached formal offer letter for complete details about the position and benefits.

To accept this offer, please sign and return the offer letter by [Response Date].

We are excited about the possibility of you joining our team and contributing to our success. If you have any questions or need further information, please don't hesitate to contact me.

Congratulations, and we look forward to welcoming you aboard!

Best regards,
[Your Name]
[Your Company]`
          break

        case "followup":
          generatedContent = `Dear ${candidateName || "Candidate"},

I wanted to follow up regarding your recent interview for the ${jobTitle || "position"} at our company.

We appreciate the time you spent with our team and the insights you shared during our conversation. Your experience with [specific skill/project mentioned during interview] was particularly interesting to us.

We are currently finalizing our decision process and expect to have an update for you by [specific date]. In the meantime, if you have any questions or if there's any additional information you'd like to share, please feel free to reach out.

Thank you again for your interest in joining our team.

Best regards,
[Your Name]
[Your Company]`
          break

        case "custom":
          generatedContent = `Dear ${candidateName || "Candidate"},

${customPrompt || "Thank you for your interest in our company. We appreciate your application and the time you've invested in the process."}

Please let me know if you have any questions or need any additional information.

Best regards,
[Your Name]
[Your Company]`
          break

        default:
          generatedContent = "Please select a message type to generate content."
      }

      setGeneratedMessage(generatedContent)
    } catch (error) {
      console.error("Error generating message:", error)
      toast({
        title: "Error generating message",
        description: "There was an error generating your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage)
    toast({
      title: "Message copied",
      description: "The message has been copied to your clipboard.",
    })
  }

  const handleSelectTemplate = (templateId: string) => {
    const template = Object.values(templates)
      .flat()
      .find((t) => t.id === templateId)

    if (template) {
      setSelectedTemplate(templateId)
      setGeneratedMessage(template.content)
    }
  }

  const handleUseMessage = () => {
    if (onSelectMessage && generatedMessage) {
      onSelectMessage(generatedMessage)
      toast({
        title: "Message selected",
        description: "The message has been added to your communication.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Message Generator</CardTitle>
        <CardDescription>Generate professional messages for candidate communications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="generate">Generate Message</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="messageType">Message Type</Label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select message type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interview_invitation">Interview Invitation</SelectItem>
                  <SelectItem value="rejection">Rejection</SelectItem>
                  <SelectItem value="offer">Job Offer</SelectItem>
                  <SelectItem value="followup">Interview Follow-up</SelectItem>
                  <SelectItem value="custom">Custom Message</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {messageType === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="customPrompt">Custom Prompt</Label>
                <Textarea
                  id="customPrompt"
                  placeholder="Describe what kind of message you want to generate..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                />
              </div>
            )}

            <div className="flex justify-end">
              <Button onClick={handleGenerateMessage} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Message
                  </>
                )}
              </Button>
            </div>

            {generatedMessage && (
              <div className="mt-4 space-y-4">
                <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900">
                  <pre className="whitespace-pre-wrap font-sans text-sm">{generatedMessage}</pre>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCopyMessage}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  {onSelectMessage && (
                    <Button onClick={handleUseMessage}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Use This Message
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="templateCategory">Template Category</Label>
              <Select value={messageType} onValueChange={setMessageType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select template category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interview_invitation">Interview Invitations</SelectItem>
                  <SelectItem value="rejection">Rejections</SelectItem>
                  <SelectItem value="offer">Job Offers</SelectItem>
                  <SelectItem value="followup">Follow-ups</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {templates[messageType as keyof typeof templates]?.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-md p-4 cursor-pointer transition-colors ${
                    selectedTemplate === template.id
                      ? "border-brand-dark dark:border-brand-light bg-gray-50 dark:bg-gray-800"
                      : "hover:border-gray-400 dark:hover:border-gray-600"
                  }`}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <h3 className="font-medium mb-2">{template.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
                </div>
              ))}
            </div>

            {selectedTemplate && (
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCopyMessage}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                {onSelectMessage && (
                  <Button onClick={handleUseMessage}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Use This Template
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
