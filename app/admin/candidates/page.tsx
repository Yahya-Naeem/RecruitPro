"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { AdminNavbar } from "@/components/admin-navbar"
import { SearchIcon, BriefcaseIcon, GraduationCapIcon, MapPinIcon, FilterIcon } from "lucide-react"

interface Candidate {
  id: string
  name: string
  title: string
  location: string
  experience: number
  skills: string[]
  education: string
  matchScore: number
  resumeKeywords?: string[]
}

export default function CandidatesSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [experienceRange, setExperienceRange] = useState([0, 15])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [resumeKeywords, setResumeKeywords] = useState("")
  const [matchCategory, setMatchCategory] = useState("all")

  // Mock data for candidates (in a real app, this would come from Firebase)
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "John Doe",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      experience: 7,
      skills: ["React", "TypeScript", "Next.js", "CSS"],
      education: "BS Computer Science, Stanford University",
      matchScore: 95,
      resumeKeywords: ["web development", "user interface", "responsive design", "agile"],
    },
    {
      id: "2",
      name: "Jane Smith",
      title: "UX/UI Designer",
      location: "New York, NY",
      experience: 5,
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      education: "MFA Design, Rhode Island School of Design",
      matchScore: 85,
      resumeKeywords: ["user experience", "wireframing", "usability testing", "design systems"],
    },
    {
      id: "3",
      name: "Michael Johnson",
      title: "Backend Engineer",
      location: "Austin, TX",
      experience: 8,
      skills: ["Go", "PostgreSQL", "Docker", "Kubernetes"],
      education: "MS Computer Engineering, MIT",
      matchScore: 75,
      resumeKeywords: ["microservices", "database optimization", "API design", "cloud infrastructure"],
    },
    {
      id: "4",
      name: "Sarah Williams",
      title: "Full Stack Developer",
      location: "Seattle, WA",
      experience: 4,
      skills: ["JavaScript", "React", "Node.js", "MongoDB"],
      education: "BS Software Engineering, University of Washington",
      matchScore: 90,
      resumeKeywords: ["full stack", "MERN stack", "RESTful APIs", "authentication"],
    },
    {
      id: "5",
      name: "David Chen",
      title: "Data Scientist",
      location: "Boston, MA",
      experience: 6,
      skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
      education: "PhD Statistics, Harvard University",
      matchScore: 65,
      resumeKeywords: ["statistical analysis", "predictive modeling", "data mining", "big data"],
    },
  ]

  // Filter candidates based on search and filters
  const filteredCandidates = candidates.filter((candidate) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filter by experience range
    const matchesExperience = candidate.experience >= experienceRange[0] && candidate.experience <= experienceRange[1]

    // Filter by selected skills
    const matchesSkills =
      selectedSkills.length === 0 || selectedSkills.every((skill) => candidate.skills.includes(skill))

    // Filter by location
    const matchesLocation = selectedLocation === "" || candidate.location.includes(selectedLocation)

    // Filter by resume keywords
    const matchesResumeKeywords =
      resumeKeywords === "" ||
      (candidate.resumeKeywords &&
        candidate.resumeKeywords.some((keyword) => keyword.toLowerCase().includes(resumeKeywords.toLowerCase())))

    // Filter by match category
    const matchesCategory =
      matchCategory === "all" ||
      (matchCategory === "best" && candidate.matchScore >= 85) ||
      (matchCategory === "partial" && candidate.matchScore >= 70 && candidate.matchScore < 85) ||
      (matchCategory === "low" && candidate.matchScore < 70)

    return (
      matchesSearch && matchesExperience && matchesSkills && matchesLocation && matchesResumeKeywords && matchesCategory
    )
  })

  // Available skills for filtering
  const availableSkills = [
    "React",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Node.js",
    "Python",
    "Go",
    "SQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "AWS",
    "Figma",
    "Adobe XD",
    "User Research",
  ]

  // Available locations for filtering
  const availableLocations = [
    "San Francisco, CA",
    "New York, NY",
    "Austin, TX",
    "Seattle, WA",
    "Boston, MA",
    "Chicago, IL",
    "Los Angeles, CA",
    "Denver, CO",
  ]

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Candidate Search</h1>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center">
              <FilterIcon className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search candidates by name, title, or skills..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {showFilters && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Experience</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={experienceRange}
                        min={0}
                        max={15}
                        step={1}
                        onValueChange={(value) => setExperienceRange(value as number[])}
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>{experienceRange[0]} years</span>
                        <span>{experienceRange[1]} years</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Location</h3>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any location</SelectItem>
                        {availableLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Resume Keywords</h3>
                    <Input
                      placeholder="Enter keywords to search in resumes"
                      value={resumeKeywords}
                      onChange={(e) => setResumeKeywords(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Search for specific terms in candidate resumes</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="all" onValueChange={setMatchCategory}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Candidates</TabsTrigger>
              <TabsTrigger value="best">Best Match (85%+)</TabsTrigger>
              <TabsTrigger value="partial">Partial Match (70-84%)</TabsTrigger>
              <TabsTrigger value="low">Low Match (Below 70%)</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">{candidate.name}</h3>
                              <p className="text-muted-foreground">{candidate.title}</p>
                            </div>
                            <Badge
                              className={`${
                                candidate.matchScore >= 85
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : candidate.matchScore >= 70
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              }`}
                            >
                              {candidate.matchScore}% Match
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2 mt-2 mb-3">
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              <span>{candidate.location}</span>
                            </div>
                            <div className="flex items-center">
                              <BriefcaseIcon className="h-4 w-4 mr-1" />
                              <span>{candidate.experience} years experience</span>
                            </div>
                            <div className="flex items-center">
                              <GraduationCapIcon className="h-4 w-4 mr-1" />
                              <span>{candidate.education}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {candidate.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          {candidate.resumeKeywords && (
                            <div className="mt-2">
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium">Resume keywords: </span>
                                {candidate.resumeKeywords.join(", ")}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-row md:flex-col justify-end gap-2 mt-4 md:mt-0 md:ml-4">
                          <Link href={`/admin/candidates/${candidate.id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              View Profile
                            </Button>
                          </Link>
                          <Link href={`/admin/communications?candidate=${candidate.id}`}>
                            <Button size="sm" className="w-full">
                              Contact
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No candidates found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setExperienceRange([0, 15])
                      setSelectedSkills([])
                      setSelectedLocation("")
                      setResumeKeywords("")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="best" className="space-y-4">
              {/* Same content as "all" tab but filtered by match score */}
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                    {/* Same card content as above */}
                    <CardContent className="p-6">
                      {/* Same content structure as above */}
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold">{candidate.name}</h3>
                              <p className="text-muted-foreground">{candidate.title}</p>
                            </div>
                            <Badge
                              className={`${
                                candidate.matchScore >= 85
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  : candidate.matchScore >= 70
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              }`}
                            >
                              {candidate.matchScore}% Match
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2 mt-2 mb-3">
                            <div className="flex items-center">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              <span>{candidate.location}</span>
                            </div>
                            <div className="flex items-center">
                              <BriefcaseIcon className="h-4 w-4 mr-1" />
                              <span>{candidate.experience} years experience</span>
                            </div>
                            <div className="flex items-center">
                              <GraduationCapIcon className="h-4 w-4 mr-1" />
                              <span>{candidate.education}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {candidate.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-row md:flex-col justify-end gap-2 mt-4 md:mt-0 md:ml-4">
                          <Link href={`/admin/candidates/${candidate.id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              View Profile
                            </Button>
                          </Link>
                          <Link href={`/admin/communications?candidate=${candidate.id}`}>
                            <Button size="sm" className="w-full">
                              Contact
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No candidates found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setExperienceRange([0, 15])
                      setSelectedSkills([])
                      setSelectedLocation("")
                      setResumeKeywords("")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Similar content for "partial" and "low" tabs */}
            <TabsContent value="partial" className="space-y-4">
              {/* Similar content structure */}
            </TabsContent>
            <TabsContent value="low" className="space-y-4">
              {/* Similar content structure */}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
