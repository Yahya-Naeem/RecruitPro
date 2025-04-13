"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BriefcaseIcon, MapPinIcon, ClockIcon, SearchIcon, BookmarkIcon } from "lucide-react"
import { CandidateNavbar } from "@/components/candidate-navbar"
import { useAuth } from "@/contexts/auth-context"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface JobPost {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  type: string
  postedAt: string
  skills: string[]
  description: string
}

export default function FeedPage() {
  const { user, userRole } = useAuth()
  const [jobPosts, setJobPosts] = useState<JobPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const jobsQuery = query(collection(db, "jobs"), orderBy("createdAt", "desc"), limit(20))

        const querySnapshot = await getDocs(jobsQuery)
        const jobs: JobPost[] = []

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<JobPost, "id">
          jobs.push({
            id: doc.id,
            ...data,
          })
        })

        setJobPosts(jobs)
      } catch (error) {
        console.error("Error fetching job posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobPosts()
  }, [])

  // Filter jobs based on search term
  const filteredJobs = jobPosts.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // For demo purposes, use mock data if no jobs are loaded from Firebase
  const mockJobs: JobPost[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      postedAt: "2 days ago",
      skills: ["React", "TypeScript", "Next.js"],
      description: "We are looking for a Senior Frontend Developer to join our team...",
    },
    {
      id: "2",
      title: "UX/UI Designer",
      company: "DesignHub",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
      type: "Full-time",
      postedAt: "1 week ago",
      skills: ["Figma", "Adobe XD", "User Research"],
      description: "Join our design team to create beautiful and functional interfaces...",
    },
    {
      id: "3",
      title: "Backend Engineer",
      company: "DataSystems",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Austin, TX (Hybrid)",
      type: "Full-time",
      postedAt: "3 days ago",
      skills: ["Go", "PostgreSQL", "Docker"],
      description: "We're seeking a talented Backend Engineer to help build our infrastructure...",
    },
    {
      id: "4",
      title: "Financial Analyst",
      company: "FinGroup",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Chicago, IL",
      type: "Full-time",
      postedAt: "5 days ago",
      skills: ["Financial Modeling", "Excel", "Data Analysis"],
      description: "Join our finance team to analyze market trends and provide insights...",
    },
  ]

  const displayJobs = jobPosts.length > 0 ? filteredJobs : mockJobs

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CandidateNavbar />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Job Feed</h1>
            <div className="w-full md:w-auto">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search jobs, companies, or skills..."
                  className="pl-10 w-full md:w-[300px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayJobs.length > 0 ? (
            <div className="space-y-4">
              {displayJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                          {job.companyLogo ? (
                            <img
                              src={job.companyLogo || "/placeholder.svg"}
                              alt={job.company}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-500">
                              {job.company.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                          <p className="text-muted-foreground mb-2">{job.company}</p>
                          <div className="flex flex-wrap items-center text-muted-foreground text-sm gap-x-4 gap-y-2 mb-3">
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <BriefcaseIcon className="h-4 w-4 mr-1" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              <span>{job.postedAt}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Button variant="ghost" size="icon">
                          <BookmarkIcon className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Link href={`/jobs/${job.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      {user && (
                        <Link href={`/jobs/${job.id}/apply`}>
                          <Button size="sm" className="ml-2">
                            Apply Now
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
              <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
