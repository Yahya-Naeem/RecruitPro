"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AdminNavbar } from "@/components/admin-navbar"
import { useToast } from "@/components/ui/use-toast"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"

export default function EmployerProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [companyLogo, setCompanyLogo] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    location: "",
    about: "",
    contactEmail: "",
    contactPhone: "",
  })

  useEffect(() => {
    if (user) {
      fetchEmployerProfile()
    }
  }, [user])

  const fetchEmployerProfile = async () => {
    try {
      setIsLoading(true)

      if (!user) return

      const employerDoc = await getDoc(doc(db, "employers", user.uid))

      if (employerDoc.exists()) {
        const data = employerDoc.data()
        setFormData({
          companyName: data.companyName || "",
          companyWebsite: data.companyWebsite || "",
          industry: data.industry || "",
          companySize: data.companySize || "",
          location: data.location || "",
          about: data.about || "",
          contactEmail: data.contactEmail || user.email || "",
          contactPhone: data.contactPhone || "",
        })

        if (data.companyLogo) {
          setCompanyLogo(data.companyLogo)
        }
      } else {
        // Initialize with user data if available
        setFormData({
          ...formData,
          companyName: user.displayName || "",
          contactEmail: user.email || "",
        })
      }
    } catch (error) {
      console.error("Error fetching employer profile:", error)
      toast({
        title: "Error loading profile",
        description: "There was an error loading your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Preview the image
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCompanyLogo(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)

      // In a real app, you would upload the file to Firebase Storage here
      try {
        if (!user) return

        const storageRef = ref(storage, `company-logos/${user.uid}/${file.name}`)
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)

        // Update the company logo URL in the state
        setCompanyLogo(downloadURL)

        toast({
          title: "Logo uploaded",
          description: "Your company logo has been uploaded successfully.",
        })
      } catch (error) {
        console.error("Error uploading logo:", error)
        toast({
          title: "Error uploading logo",
          description: "There was an error uploading your company logo. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      if (!user) return

      await updateDoc(doc(db, "employers", user.uid), {
        ...formData,
        companyLogo,
        updatedAt: new Date(),
      })

      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error updating profile",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Company Profile</h1>

          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Update your company details to help candidates learn more about your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="space-y-4">
                    <div className="flex flex-col items-center space-y-2">
                      <Avatar className="w-32 h-32">
                        <AvatarImage src={companyLogo || ""} />
                        <AvatarFallback className="text-2xl">{formData.companyName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center">
                        <Label
                          htmlFor="logo"
                          className="cursor-pointer text-sm text-brand-dark dark:text-brand-light hover:underline"
                        >
                          Change logo
                        </Label>
                        <Input id="logo" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyWebsite">Company Website</Label>
                      <Input
                        id="companyWebsite"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <select
                          id="industry"
                          name="industry"
                          className="w-full p-2 border rounded-md bg-background"
                          value={formData.industry}
                          onChange={handleInputChange}
                        >
                          <option value="">Select industry</option>
                          <option value="technology">Technology</option>
                          <option value="finance">Finance</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="retail">Retail</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <select
                          id="companySize"
                          name="companySize"
                          className="w-full p-2 border rounded-md bg-background"
                          value={formData.companySize}
                          onChange={handleInputChange}
                        >
                          <option value="">Select size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1001+">1001+ employees</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about">About the Company</Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    placeholder="Describe your company, mission, values, and culture..."
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>This information will be used for communications with candidates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
