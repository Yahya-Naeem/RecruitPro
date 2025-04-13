"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminNavbar } from "@/components/admin-navbar"
import { BarChart, LineChart, PieChart } from "@/components/charts"

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("week")

  // Mock data for charts
  const applicationData = {
    week: [
      { name: "Mon", value: 12 },
      { name: "Tue", value: 18 },
      { name: "Wed", value: 15 },
      { name: "Thu", value: 25 },
      { name: "Fri", value: 20 },
      { name: "Sat", value: 8 },
      { name: "Sun", value: 5 },
    ],
    month: Array.from({ length: 30 }, (_, i) => ({
      name: `${i + 1}`,
      value: Math.floor(Math.random() * 30) + 5,
    })),
    year: Array.from({ length: 12 }, (_, i) => ({
      name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      value: Math.floor(Math.random() * 100) + 20,
    })),
  }

  const matchQualityData = [
    { name: "Best Match", value: 35 },
    { name: "Partial Match", value: 45 },
    { name: "No Match", value: 20 },
  ]

  const jobCategoryData = [
    { name: "Software Dev", value: 40 },
    { name: "Design", value: 15 },
    { name: "Marketing", value: 20 },
    { name: "Finance", value: 10 },
    { name: "Other", value: 15 },
  ]

  // Mock data for active job listings
  const activeJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      applicants: 24,
      posted: "2 days ago",
      bestMatch: 8,
      partialMatch: 12,
      noMatch: 4,
    },
    {
      id: 2,
      title: "UX/UI Designer",
      applicants: 18,
      posted: "1 week ago",
      bestMatch: 5,
      partialMatch: 10,
      noMatch: 3,
    },
    {
      id: 3,
      title: "Backend Engineer",
      applicants: 15,
      posted: "3 days ago",
      bestMatch: 6,
      partialMatch: 7,
      noMatch: 2,
    },
    {
      id: 4,
      title: "Financial Analyst",
      applicants: 12,
      posted: "5 days ago",
      bestMatch: 3,
      partialMatch: 6,
      noMatch: 3,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/post-job">
            <Button className="mt-4 md:mt-0">Post New Job</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Job Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">4 closing this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Best Match Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">35%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Application Trends</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={timeRange === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange("week")}
                  >
                    Week
                  </Button>
                  <Button
                    variant={timeRange === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange("month")}
                  >
                    Month
                  </Button>
                  <Button
                    variant={timeRange === "year" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange("year")}
                  >
                    Year
                  </Button>
                </div>
              </div>
              <CardDescription>Number of applications over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart
                  data={applicationData[timeRange as keyof typeof applicationData]}
                  xAxisKey="name"
                  yAxisKey="value"
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Match Quality Distribution</CardTitle>
              <CardDescription>Breakdown of candidate match quality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <PieChart data={matchQualityData} className="h-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Listings</CardTitle>
              <CardDescription>Overview of your current job postings and applicants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Job Title</th>
                      <th className="text-center py-3 px-4 font-medium">Total Applicants</th>
                      <th className="text-center py-3 px-4 font-medium">Best Match</th>
                      <th className="text-center py-3 px-4 font-medium">Partial Match</th>
                      <th className="text-center py-3 px-4 font-medium">No Match</th>
                      <th className="text-center py-3 px-4 font-medium">Posted</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeJobs.map((job) => (
                      <tr key={job.id} className="border-b">
                        <td className="py-3 px-4">{job.title}</td>
                        <td className="text-center py-3 px-4">{job.applicants}</td>
                        <td className="text-center py-3 px-4 text-green-600">{job.bestMatch}</td>
                        <td className="text-center py-3 px-4 text-yellow-600">{job.partialMatch}</td>
                        <td className="text-center py-3 px-4 text-red-600">{job.noMatch}</td>
                        <td className="text-center py-3 px-4">{job.posted}</td>
                        <td className="text-right py-3 px-4">
                          <Link href={`/admin/jobs/${job.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Categories</CardTitle>
              <CardDescription>Distribution of jobs by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart data={jobCategoryData} className="h-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-purple-700"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">New application received</p>
                    <p className="text-sm text-muted-foreground">John Doe applied for Senior Frontend Developer</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-700"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Interview scheduled</p>
                    <p className="text-sm text-muted-foreground">Interview with Sarah Smith for UX/UI Designer</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-700"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">New job posted</p>
                    <p className="text-sm text-muted-foreground">Backend Engineer position published</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
