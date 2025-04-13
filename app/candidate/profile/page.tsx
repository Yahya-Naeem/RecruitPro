"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CandidateNavbar } from "@/components/candidate-navbar"

export default function CandidateProfilePage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Complete Your Profile</h1>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="professional">Professional Details</TabsTrigger>
              <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Add your personal details to help employers get to know you better.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center space-y-2">
                        <Avatar className="w-32 h-32">
                          <AvatarImage src={profileImage || ""} />
                          <AvatarFallback className="text-2xl">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center">
                          <Label
                            htmlFor="picture"
                            className="cursor-pointer text-sm text-purple-700 hover:text-purple-800"
                          >
                            Change picture
                          </Label>
                          <Input
                            id="picture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, State, Country" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Details</CardTitle>
                  <CardDescription>Add your professional experience, skills, and education.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input id="title" placeholder="e.g. Senior Frontend Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input id="experience" type="number" min="0" max="50" placeholder="5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub Profile</Label>
                      <Input id="github" placeholder="https://github.com/username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn Profile</Label>
                      <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="resume">Resume</Label>
                      <div className="flex items-center gap-4">
                        <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
                        {resumeFile && (
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                        )}
                      </div>
                      {resumeFile && <p className="text-sm text-muted-foreground">Selected file: {resumeFile.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skills">Skills (comma separated)</Label>
                      <Input id="skills" placeholder="React, TypeScript, Node.js, etc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Summary</Label>
                      <Textarea id="bio" placeholder="Write a short professional summary about yourself" rows={4} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Preferences</CardTitle>
                  <CardDescription>Tell us what kind of job opportunities you're looking for.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobType">Job Type</Label>
                      <Select defaultValue="fulltime">
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
                    <div className="space-y-2">
                      <Label htmlFor="jobCategory">Job Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="software">Software Development</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="customer">Customer Service</SelectItem>
                          <SelectItem value="admin">Administrative</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Preferred Location</Label>
                      <Input id="location" placeholder="City, State, Country or Remote" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Expected Salary (USD/year)</Label>
                      <Input id="salary" type="number" placeholder="70000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remote">Remote Work Preference</Label>
                      <Select defaultValue="hybrid">
                        <SelectTrigger>
                          <SelectValue placeholder="Select remote work preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="onsite">On-site only</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="remote">Remote only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
