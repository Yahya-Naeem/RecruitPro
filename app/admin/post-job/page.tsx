"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AdminNavbar } from "@/components/admin-navbar"

export default function PostJobPage() {
  const router = useRouter()
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle the job posting process here
    // For now, we'll just redirect to the dashboard
    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Post a New Job</h1>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Provide detailed information about the job position you're posting.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g. Senior Frontend Developer" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fulltime">Full-time</SelectItem>
                          <SelectItem value="parttime">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g. San Francisco, CA" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remote">Remote Work</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select remote work option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onsite">On-site only</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="remote">Remote only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minSalary">Minimum Salary (USD/year)</Label>
                      <Input id="minSalary" type="number" placeholder="e.g. 70000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxSalary">Maximum Salary (USD/year)</Label>
                      <Input id="maxSalary" type="number" placeholder="e.g. 90000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Required (years)</Label>
                    <Input id="experience" type="number" min="0" max="20" placeholder="e.g. 3" required />
                  </div>

                  <div className="space-y-2">
                    <Label>Required Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Add a skill"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddSkill()
                          }
                        }}
                      />
                      <Button type="button" onClick={handleAddSkill}>
                        Add
                      </Button>
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill) => (
                          <div
                            key={skill}
                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-2 text-purple-800 hover:text-purple-900"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a detailed description of the job..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsibilities">Responsibilities</Label>
                    <Textarea
                      id="responsibilities"
                      placeholder="List the key responsibilities for this role..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Textarea
                      id="qualifications"
                      placeholder="List the required qualifications for this role..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">Benefits</Label>
                    <Textarea id="benefits" placeholder="List the benefits offered with this position..." rows={4} />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="featured" />
                    <Label htmlFor="featured">Feature this job listing (highlighted on the homepage)</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="hideCompany" />
                    <Label htmlFor="hideCompany">Hide company name (post as anonymous)</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit">Post Job</Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
