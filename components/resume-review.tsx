"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { FileIcon, UploadIcon, CheckCircleIcon, AlertCircleIcon, Loader2Icon, FileTextIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ResumeReviewProps {
  onReviewComplete?: (feedback: ResumeReviewFeedback) => void
}

interface ResumeReviewFeedback {
  score: number
  strengths: string[]
  improvements: string[]
  keywords: string[]
  summary: string
}

export function ResumeReview({ onReviewComplete }: ResumeReviewProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isReviewing, setIsReviewing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [reviewProgress, setReviewProgress] = useState(0)
  const [feedback, setFeedback] = useState<ResumeReviewFeedback | null>(null)
  const [activeTab, setActiveTab] = useState("upload")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Check file type
      if (
        !selectedFile.type.includes("pdf") &&
        !selectedFile.type.includes("word") &&
        !selectedFile.type.includes("document")
      ) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        })
        return
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a resume file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setUploadProgress(i)
      }

      toast({
        title: "Upload complete",
        description: "Your resume has been uploaded successfully.",
      })

      // Start the review process
      handleReview()
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your resume. Please try again.",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }

  const handleReview = async () => {
    setIsReviewing(true)
    setReviewProgress(0)
    setActiveTab("review")

    try {
      // Simulate AI review process with progress
      for (let i = 0; i <= 100; i += 5) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setReviewProgress(i)
      }

      // Mock feedback data
      const mockFeedback: ResumeReviewFeedback = {
        score: 78,
        strengths: [
          "Strong technical skills section with relevant technologies",
          "Clear work experience with quantifiable achievements",
          "Well-organized education section",
          "Good use of action verbs in job descriptions",
        ],
        improvements: [
          "Add a more targeted professional summary",
          "Include more industry-specific keywords",
          "Quantify more achievements with specific metrics",
          "Consider adding a projects section to showcase practical skills",
          "Improve formatting for better readability",
        ],
        keywords: [
          "JavaScript",
          "React",
          "Node.js",
          "TypeScript",
          "Frontend Development",
          "UI/UX",
          "Responsive Design",
          "API Integration",
          "Git",
          "Agile",
        ],
        summary:
          "Your resume demonstrates solid experience and technical skills, but could benefit from more targeted content and quantifiable achievements. Consider tailoring your resume more specifically to each job application and highlighting metrics that demonstrate your impact.",
      }

      setFeedback(mockFeedback)

      if (onReviewComplete) {
        onReviewComplete(mockFeedback)
      }

      toast({
        title: "Review complete",
        description: "Your resume has been reviewed. Check out the feedback!",
      })
    } catch (error) {
      console.error("Error reviewing resume:", error)
      toast({
        title: "Review failed",
        description: "There was an error reviewing your resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsReviewing(false)
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]

      // Check file type
      if (
        !droppedFile.type.includes("pdf") &&
        !droppedFile.type.includes("word") &&
        !droppedFile.type.includes("document")
      ) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        })
        return
      }

      // Check file size (max 5MB)
      if (droppedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      setFile(droppedFile)
    }
  }

  const resetReview = () => {
    setFile(null)
    setFeedback(null)
    setActiveTab("upload")
    setUploadProgress(0)
    setReviewProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileTextIcon className="mr-2 h-5 w-5" />
          AI Resume Review
        </CardTitle>
        <CardDescription>Get professional feedback on your resume to improve your job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload">Upload Resume</TabsTrigger>
            <TabsTrigger value="review" disabled={!file && !feedback}>
              Review Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                file ? "border-green-500 dark:border-green-700" : "border-gray-300 dark:border-gray-700"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="resume"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={isUploading || isReviewing}
              />

              {!file ? (
                <div className="py-4">
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload your resume</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your resume file here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                  <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading || isReviewing}>
                    Browse Files
                  </Button>
                </div>
              ) : (
                <div className="py-4">
                  <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">File selected</h3>
                  <div className="flex items-center justify-center mb-4">
                    <FileIcon className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <Button variant="outline" onClick={resetReview} disabled={isUploading || isReviewing}>
                      Change File
                    </Button>
                    <Button onClick={handleUpload} disabled={isUploading || isReviewing}>
                      {isUploading ? (
                        <>
                          <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Start Review"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {isUploading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </TabsContent>

          <TabsContent value="review">
            {isReviewing ? (
              <div className="py-8 text-center">
                <Loader2Icon className="mx-auto h-12 w-12 text-brand-dark dark:text-brand-light animate-spin mb-4" />
                <h3 className="text-lg font-medium mb-2">Analyzing your resume...</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI is reviewing your resume for strengths, areas of improvement, and industry keywords.
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{reviewProgress}%</span>
                  </div>
                  <Progress value={reviewProgress} className="h-2" />
                </div>
              </div>
            ) : feedback ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Resume Score</h3>
                  <div className="flex items-center">
                    <div
                      className={`text-2xl font-bold ${
                        feedback.score >= 80
                          ? "text-green-600 dark:text-green-500"
                          : feedback.score >= 60
                            ? "text-amber-600 dark:text-amber-500"
                            : "text-red-600 dark:text-red-500"
                      }`}
                    >
                      {feedback.score}/100
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Summary</h3>
                  <p className="text-sm text-muted-foreground">{feedback.summary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-green-600 dark:text-green-500">Strengths</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {feedback.strengths.map((strength, index) => (
                        <li key={index} className="text-sm">
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 text-amber-600 dark:text-amber-500">
                      Areas for Improvement
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {feedback.improvements.map((improvement, index) => (
                        <li key={index} className="text-sm">
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Detected Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {feedback.keywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Consider implementing the suggested improvements and uploading your revised resume for another
                    review.
                  </p>
                  <Button onClick={resetReview}>Review Another Resume</Button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <AlertCircleIcon className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">No review results yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please upload your resume to get AI-powered feedback.
                </p>
                <Button onClick={() => setActiveTab("upload")}>Upload Resume</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <div className="text-xs text-muted-foreground">
          <p>Your resume data is processed securely and not stored permanently.</p>
          <p>Powered by AI resume analysis technology.</p>
        </div>
        <div>
          <Button variant="outline" size="sm" onClick={() => window.open("https://example.com/resume-tips", "_blank")}>
            Resume Writing Tips
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
