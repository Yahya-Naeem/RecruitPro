"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BriefcaseIcon, MapPinIcon, ClockIcon, SearchIcon, FilterIcon, BookmarkIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [jobType, setJobType] = useState<string>("all")
  const [location, setLocation] = useState<string>("all")
  const [experienceRange, setExperienceRange] = useState([0, 10])
  const [salaryRange, setSalaryRange] = useState([30000, 150000])

  // Mock data for jobs
  const jobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      postedAt: "2 days ago",
      salary: "$120,000 - $150,000",
      experience: "5-7 years",
      skills: ["React", "TypeScript", "Next.js"],
      description:
        "We are looking for a Senior Frontend Developer to join our team and help build innovative web applications. The ideal candidate has strong experience with modern JavaScript frameworks and a passion for creating exceptional user experiences.",
    },
    {
      id: "2",
      title: "UX/UI Designer",
      company: "DesignHub",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
      type: "Full-time",
      postedAt: "1 week ago",
      salary: "$90,000 - $120,000",
      experience: "3-5 years",
      skills: ["Figma", "Adobe XD", "User Research"],
      description:
        "Join our design team to create beautiful and functional interfaces for our clients. You'll work closely with product managers and developers to bring designs from concept to implementation.",
    },
    {
      id: "3",
      title: "Backend Engineer",
      company: "DataSystems",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Austin, TX (Hybrid)",
      type: "Full-time",
      postedAt: "3 days ago",
      salary: "$110,000 - $140,000",
      experience: "4-6 years",
      skills: ["Go", "PostgreSQL", "Docker"],
      description:
        "We're seeking a talented Backend Engineer to help build our infrastructure. You'll be responsible for designing and implementing APIs, optimizing database performance, and ensuring system reliability.",
    },
    {
      id: "4",
      title: "Financial Analyst",
      company: "FinGroup",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Chicago, IL",
      type: "Full-time",
      postedAt: "5 days ago",
      salary: "$80,000 - $100,000",
      experience: "2-4 years",
      skills: ["Financial Modeling", "Excel", "Data Analysis"],
      description:
        "Join our finance team to analyze market trends and provide insights to our investment committee. You'll prepare financial reports, conduct research, and help develop financial strategies.",
    },
    {
      id: "5",
      title: "Product Manager",
      company: "ProductCo",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Seattle, WA",
      type: "Full-time",
      postedAt: "1 day ago",
      salary: "$130,000 - $160,000",
      experience: "5-8 years",
      skills: ["Product Strategy", "Agile", "User Stories"],
      description:
        "We're looking for an experienced Product Manager to lead our product development efforts. You'll work with cross-functional teams to define product vision, create roadmaps, and deliver exceptional products.",
    },
    {
      id: "6",
      title: "DevOps Engineer",
      company: "CloudTech",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Remote",
      type: "Contract",
      postedAt: "4 days ago",
      salary: "$100,000 - $130,000",
      experience: "3-6 years",
      skills: ["AWS", "Kubernetes", "CI/CD"],
      description:
        "Help us build and maintain our cloud infrastructure. You'll implement automation, manage deployments, and ensure the reliability and security of our systems.",
    },
    {
      id: "7",
      title: "Marketing Specialist",
      company: "GrowthCo",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Boston, MA (Hybrid)",
      type: "Full-time",
      postedAt: "1 week ago",
      salary: "$70,000 - $90,000",
      experience: "2-4 years",
      skills: ["Digital Marketing", "SEO", "Content Creation"],
      description:
        "Join our marketing team to help drive growth through digital channels. You'll develop and execute marketing campaigns, analyze performance, and optimize our marketing strategy.",
    },
    {
      id: "8",
      title: "Data Scientist",
      company: "AnalyticsPro",
      companyLogo: "/placeholder.svg?height=40&width=40",
      location: "Remote",
      type: "Full-time",
      postedAt: "3 days ago",
      salary: "$120,000 - $150,000",
      experience: "4-7 years",
      skills: ["Python", "Machine Learning", "SQL"],
      description:
        "We're looking for a Data Scientist to help us extract insights from our data. You'll build predictive models, conduct statistical analyses, and communicate findings to stakeholders.",
    },
  ]

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filter by job type
    const matchesJobType = jobType === "all" || job.type.toLowerCase() === jobType.toLowerCase()

    // Filter by location
    const matchesLocation =
      location === "all" ||
      (location === "remote" && job.location.toLowerCase().includes("remote")) ||
      job.location.toLowerCase().includes(location.toLowerCase())

    // Filter by experience (simplified for demo)
    const jobExperienceYears = Number.parseInt(job.experience.split("-")[0])
    const matchesExperience = jobExperienceYears >= experienceRange[0] && jobExperienceYears <= experienceRange[1]

    // Filter by salary (simplified for demo)
    const jobSalaryMin = Number.parseInt(job.salary.replace(/[^0-9]/g, "")) / 1000
    const matchesSalary = jobSalaryMin >= salaryRange[0] && jobSalaryMin <= salaryRange[1]

    return matchesSearch && matchesJobType && matchesLocation && matchesExperience && matchesSalary
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-brand-dark text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                RecruitPro
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/jobs" className="hover:text-gray-300 transition-colors">
                Browse Jobs
              </Link>
              <Link href="/employers" className="hover:text-gray-300 transition-colors">
                For Employers
              </Link>
              <Link href="/about" className="hover:text-gray-300 transition-colors">
                About Us
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-dark">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-white text-brand-dark hover:bg-gray-200">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Find Your Dream Job</h1>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search jobs, companies, or skills..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters Toggle */}
            <div className="flex justify-end mb-4">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center">
                <FilterIcon className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Type</label>
                      <Select value={jobType} onValueChange={setJobType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="san francisco">San Francisco</SelectItem>
                          <SelectItem value="new york">New York</SelectItem>
                          <SelectItem value="austin">Austin</SelectItem>
                          <SelectItem value="seattle">Seattle</SelectItem>
                          <SelectItem value="chicago">Chicago</SelectItem>
                          <SelectItem value="boston">Boston</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Experience (years)</label>
                      <div className="px-2 pt-4">
                        <Slider
                          defaultValue={experienceRange}
                          min={0}
                          max={10}
                          step={1}
                          onValueChange={(value) => setExperienceRange(value as number[])}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>{experienceRange[0]} years</span>
                          <span>{experienceRange[1]} years</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Salary Range ($)</label>
                      <div className="px-2 pt-4">
                        <Slider
                          defaultValue={salaryRange}
                          min={30000}
                          max={200000}
                          step={5000}
                          onValueChange={(value) => setSalaryRange(value as number[])}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>${(salaryRange[0] / 1000).toFixed(0)}k</span>
                          <span>${(salaryRange[1] / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => {
                        setSearchTerm("")
                        setJobType("all")
                        setLocation("all")
                        setExperienceRange([0, 10])
                        setSalaryRange([30000, 150000])
                      }}
                    >
                      Reset Filters
                    </Button>
                    <Button>Apply Filters</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Job Results */}
            <div className="mb-4">
              <p className="text-muted-foreground">
                Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>

            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                            <img
                              src={job.companyLogo || "/placeholder.svg"}
                              alt={job.company}
                              className="h-full w-full object-cover"
                            />
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
                            <div className="mt-4 flex flex-wrap items-center gap-4">
                              <div className="text-sm">
                                <span className="font-medium">Salary:</span> {job.salary}
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">Experience:</span> {job.experience}
                              </div>
                            </div>
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
                          <Button variant="outline" size="sm" className="mr-2">
                            View Details
                          </Button>
                        </Link>
                        <Link href={`/login?redirect=/jobs/${job.id}/apply`}>
                          <Button size="sm">Apply Now</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setJobType("all")
                      setLocation("all")
                      setExperienceRange([0, 10])
                      setSalaryRange([30000, 150000])
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RecruitPro</h3>
              <p className="text-gray-400">Connecting talented professionals with the best opportunities worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/jobs" className="text-gray-400 hover:text-white">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/signup?type=candidate" className="text-gray-400 hover:text-white">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-400 hover:text-white">
                    Career Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/employers" className="text-gray-400 hover:text-white">
                    Why RecruitPro
                  </Link>
                </li>
                <li>
                  <Link href="/signup?type=employer" className="text-gray-400 hover:text-white">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} RecruitPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
