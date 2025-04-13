"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CandidateNavbar } from "@/components/candidate-navbar"
import { MapPinIcon, ClockIcon, CheckCircleIcon, XCircleIcon, AlertCircleIcon, SearchIcon } from "lucide-react"
import { CandidateStatsChart } from "@/components/candidate-stats-chart"

interface Application {
  id: number
  jobTitle: string
  company: string
  companyLogo?: string
  location: string
  appliedDate: string
  status: "pending" | "reviewing" | "interview" | "rejected" | "offered" | "accepted" | "withdrawn"
  matchScore: number
}

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for applications
  const applications: Application[] = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA (Remote)",
      appliedDate: "2 days ago",
      status: "interview",
      matchScore: 92,
    },
    {
      id: 2,
      jobTitle: "UX/UI Designer",
      company: "DesignHub",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
      appliedDate: "1 week ago",
      status: "reviewing",
      matchScore: 85,
    },
    {
      id: 3,
      jobTitle: "Backend Engineer",
      company: "DataSystems",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Austin, TX (Hybrid)",
      appliedDate: "3 days ago",
      status: "rejected",
      matchScore: 70,
    },
    {
      id: 4,
      jobTitle: "Product Manager",
      company: "ProductCo",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Seattle, WA",
      appliedDate: "2 weeks ago",
      status: "offered",
      matchScore: 88,
    },
    {
      id: 5,
      jobTitle: "Data Scientist",
      company: "AnalyticsPro",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Remote",
      appliedDate: "1 month ago",
      status: "accepted",
      matchScore: 95,
    },
    {
      id: 6,
      jobTitle: "Marketing Specialist",
      company: "GrowthCo",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Chicago, IL",
      appliedDate: "3 weeks ago",
      status: "withdrawn",
      matchScore: 75,
    },
    {
      id: 7,
      jobTitle: "DevOps Engineer",
      company: "CloudTech",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Boston, MA (Hybrid)",
      appliedDate: "5 days ago",
      status: "pending",
      matchScore: 82,
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

  // Filter applications based on search term and status filter
  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      searchTerm === "" ||
      application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || application.status === statusFilter

    return matchesSearch && matchesStatus
  })

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
      case "offered":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 hover:bg-purple-200 dark:hover:bg-purple-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Offered
          </Badge>
        )
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        )
      case "withdrawn":
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Withdrawn
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
      <main className="container mx-auto py-8 px-4 pt-20 md:pt-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Applications</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <CandidateStatsChart
                data={applicationStats}
                title="Application Activity"
                description="Overview of your applications, interviews, and offers"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Applications</span>
                    <span className="font-medium">{applications.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Applications</span>
                    <span className="font-medium">
                      {
                        applications.filter(
                          (app) => app.status === "pending" || app.status === "reviewing" || app.status === "interview",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Interviews</span>
                    <span className="font-medium">
                      {applications.filter((app) => app.status === "interview").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Offers</span>
                    <span className="font-medium">
                      {applications.filter((app) => app.status === "offered" || app.status === "accepted").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Rejections</span>
                    <span className="font-medium">
                      {applications.filter((app) => app.status === "rejected").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Application Tracking</CardTitle>
              <CardDescription>Track and manage all your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search applications..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Applications</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewing">Under Review</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredApplications.length > 0 ? (
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          {application.companyLogo && (
                            <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                              <img
                                src={application.companyLogo || "/placeholder.svg"}
                                alt={application.company}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold">{application.jobTitle}</h3>
                            <p className="text-sm text-muted-foreground">{application.company}</p>
                          </div>
                        </div>
                        <div className="mt-2 md:mt-0">{renderStatusBadge(application.status)}</div>
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
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No applications found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "You haven't applied to any jobs yet"}
                  </p>
                  {searchTerm || statusFilter !== "all" ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setStatusFilter("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  ) : (
                    <Link href="/jobs">
                      <Button>Browse Jobs</Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Tips</CardTitle>
              <CardDescription>Improve your chances of getting hired</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Tailor Your Resume</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize your resume for each job application to highlight relevant skills and experience.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Follow Up</h3>
                  <p className="text-sm text-muted-foreground">
                    Send a follow-up message if you haven't heard back within a week of applying.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Prepare for Interviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Research the company and practice answering common interview questions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
