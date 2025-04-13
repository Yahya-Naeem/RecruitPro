"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CandidateNavbar } from "@/components/candidate-navbar"
import { ResumeReview } from "@/components/resume-review"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ResumeReviewPage() {
  const [reviewCompleted, setReviewCompleted] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CandidateNavbar />
      <main className="container mx-auto py-8 px-4 pt-20 md:pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/candidate/profile"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI Resume Review</h1>
            <p className="text-muted-foreground">
              Get professional feedback on your resume to improve your job applications
            </p>
          </div>

          {!reviewCompleted ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <ResumeReview onReviewComplete={() => setReviewCompleted(true)} />
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Why Review Your Resume?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                          <svg
                            className="h-3 w-3 text-green-600 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">Identify strengths and weaknesses</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                          <svg
                            className="h-3 w-3 text-green-600 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">Optimize for ATS systems</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                          <svg
                            className="h-3 w-3 text-green-600 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">Improve your match score</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                          <svg
                            className="h-3 w-3 text-green-600 dark:text-green-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">Get professional feedback</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resume Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Tailor to the job</h3>
                      <p className="text-xs text-muted-foreground">
                        Customize your resume for each position you apply to.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Use keywords</h3>
                      <p className="text-xs text-muted-foreground">
                        Include industry-specific keywords from the job description.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Quantify achievements</h3>
                      <p className="text-xs text-muted-foreground">
                        Use numbers and metrics to demonstrate your impact.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Keep it concise</h3>
                      <p className="text-xs text-muted-foreground">Aim for 1-2 pages with clear, scannable sections.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Resume Review Complete!</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Your resume has been reviewed. Consider implementing the suggested improvements to increase your chances
                of getting hired.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={() => setReviewCompleted(false)}>Review Another Resume</Button>
                <Link href="/candidate/profile">
                  <Button variant="outline">Back to Profile</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
