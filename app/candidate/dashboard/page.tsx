"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CandidateNavbar } from "@/components/candidate-navbar"
import { OnboardingTour } from "@/components/onboarding-tour"
import { MapPinIcon, ClockIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import { CandidateStatsChart } from "@/components/candidate-stats-chart"

export default function CandidateDashboardPage() {
  const { user } = useAuth()
  const [showTooltips, setShowTooltips] = useState(false)

  useEffect(() => {
    // Show tooltips after a delay
    const timer = setTimeout(() => {
      setShowTooltips(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Mock data for applications
  const applications = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA (Remote)",
      appliedDate: "2 days ago",
      status: "interview",
      matchScore: 92,
    },
    {
      id: 2,
      jobTitle: "UX/UI Designer",
      company: "DesignHub",
      location: "New York, NY",
      appliedDate: "1 week ago",
      status: "reviewing",
      matchScore: 85,
    },
    {
      id: 3,
      jobTitle: "Backend Engineer",
      company: "DataSystems",
      location: "Austin, TX (Hybrid)",
      appliedDate: "3 days ago",
      status: "rejected",
      matchScore: 70,
    },
  ]

  // Mock data for recommended jobs
  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "WebTech Inc.",
      location: "Remote",
      postedAt: "1 day ago",
      matchScore: 95,
    },
    {
      id: 2,
      title: "React Developer",
      company: "AppWorks",
      location: "New York, NY",
      postedAt: "3 days ago",
      matchScore: 90,
    },
    {
      id: 3,
      title: "UI Engineer",
      company: "DesignSoft",
      location: "San Francisco, CA",
      postedAt: "5 days ago",
      matchScore: 88,
    },
  ]

  // Mock data for application statistics
  const applicationStats = [
    { name: "Jan", applications: 5, interviews: 2, offers: 0 },
    { name: "Feb", applications: 8, interviews: 3, offers: 1 },
    { name: "Mar", applications: 12, interviews: 5, offers: 2 },
    { name: "Apr", applications: 10, interviews: 4, offers: 1 },
    { name: "May", applications: 15, interviews: 6, offers: 2 },
    { name: "Jun", applications: 7, interviews: 3, offers: 1 },
  ]

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "interview":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Interview
          </Badge>
        )
      case "reviewing":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            Reviewing
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CandidateNavbar />
      {user && <OnboardingTour userType="candidate" />}
      <main className="container mx-auto py-8 px-4 pt-20 md:pt-8">
        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <Tooltip open={showTooltips}>
              <TooltipTrigger asChild>
                <Card className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-bold">75%</span>
                      <Link href="/candidate/profile">
                        <Button variant="outline" size="sm" data-tour="complete-profile-btn">
                          Complete Profile
                        </Button>
                      </Link>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Add your resume and work experience to improve your profile.
                    </p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              {/* <TooltipContent side="bottom" className="bg-brand-dark text-white p-3">
                <p className="font-semibold">Complete your profile</p>
                <p className="text-sm">A complete profile increases your chances of getting hired!</p>
              </TooltipContent> */}
            </Tooltip>

            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    1 Interview
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">1 Reviewing</Badge>
                  <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">1 Rejected</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-md" data-tour="recommendations">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Job Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">New jobs matching your profile in the last 7 days</p>
              </CardContent>
            </Card>
          </div>
        </TooltipProvider>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <CandidateStatsChart
              data={applicationStats}
              title="Your Application Activity"
              description="Overview of your applications, interviews, and offers"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profile Strength</CardTitle>
              <CardDescription>Tips to improve your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-2 mt-0.5">
                    <AlertCircleIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">Add your resume</p>
                    <p className="text-sm text-muted-foreground">Upload your resume to apply to jobs with one click</p>
                    <Link href="/candidate/profile/resume-review">
                      <Button variant="link" className="p-0 h-auto text-sm mt-1">
                        Get Resume Review
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-2 mt-0.5">
                    <AlertCircleIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">Add your skills</p>
                    <p className="text-sm text-muted-foreground">List your top skills to match with relevant jobs</p>
                    <Button variant="link" className="p-0 h-auto text-sm mt-1">
                      Add Skills
                    </Button>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 dark:bg-amber-900 rounded-full p-2 mt-0.5">
                    <AlertCircleIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">Add work experience</p>
                    <p className="text-sm text-muted-foreground">Add your work history to showcase your experience</p>
                    <Button variant="link" className="p-0 h-auto text-sm mt-1">
                      Add Experience
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>Track the status of your job applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {applications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{application.jobTitle}</h3>
                          <p className="text-sm text-muted-foreground">{application.company}</p>
                        </div>
                        {renderStatusBadge(application.status)}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm mb-4">
                        <div className="flex items-center text-muted-foreground">
                          <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{application.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <ClockIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>Applied {application.appliedDate}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">Match:</span>
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
                      </div>
                      <div className="flex justify-end">
                        <Link href={`/candidate/applications/${application.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/candidate/applications">
                    <Button variant="outline">View All Applications</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Jobs</CardTitle>
                <CardDescription>Jobs that match your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 transition-all hover:shadow-md">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {job.matchScore}% Match
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2 mb-3">
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>Posted {job.postedAt}</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Link href={`/jobs/${job.id}`}>
                          <Button size="sm">View Job</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Search Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3">
                    <p className="font-medium mb-1">Update your profile regularly</p>
                    <p className="text-sm text-muted-foreground">
                      Keep your skills and experience up to date to improve matching.
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3">
                    <p className="font-medium mb-1">Set up job alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new jobs matching your criteria are posted.
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-3">
                    <p className="font-medium mb-1">Follow up on applications</p>
                    <p className="text-sm text-muted-foreground">
                      Send a follow-up message if you haven't heard back in a week.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">TechCorp</h3>
                      <Badge variant="outline">Tomorrow</Badge>
                    </div>
                    <p className="text-sm mb-1">Senior Frontend Developer</p>
                    <p className="text-xs text-muted-foreground">2:00 PM - 3:00 PM</p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">DesignHub</h3>
                      <Badge variant="outline">Next Week</Badge>
                    </div>
                    <p className="text-sm mb-1">UX/UI Designer</p>
                    <p className="text-xs text-muted-foreground">Monday, 10:00 AM - 11:30 AM</p>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
