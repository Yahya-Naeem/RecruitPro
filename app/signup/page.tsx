"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("type") || "candidate"
  const [userType, setUserType] = useState<"candidate" | "employer">(defaultTab as "candidate" | "employer")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      const confirmPassword = formData.get("confirmPassword") as string

      if (password !== confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      let displayName = ""
      if (userType === "candidate") {
        const firstName = formData.get("firstName") as string
        const lastName = formData.get("lastName") as string
        displayName = `${firstName} ${lastName}`
      } else {
        displayName = formData.get("companyName") as string
      }

      await signUp(email, password, userType, displayName)

      toast({
        title: "Account created!",
        description: "You have successfully signed up.",
      })

      // Redirect to the appropriate dashboard
      if (userType === "candidate") {
        router.push("/candidate/profile")
      } else {
        router.push("/admin/profile")
      }
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message || "There was an error creating your account.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignup = async (provider: "google" | "github") => {
    setIsLoading(true)
    try {
      if (provider === "google") {
        await signInWithGoogle(userType)
      } else if (provider === "github") {
        await signInWithGithub(userType)
      }

      toast({
        title: "Account created!",
        description: "You have successfully signed up.",
      })

      // Redirect to the appropriate dashboard
      if (userType === "candidate") {
        router.push("/candidate/profile")
      } else {
        router.push("/admin/profile")
      }
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message || "There was an error creating your account.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="text-2xl font-bold text-brand-dark dark:text-white">
              RecruitPro
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Sign up to start your journey with RecruitPro</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={userType} onValueChange={(value) => setUserType(value as "candidate" | "employer")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
            </TabsList>
            <TabsContent value="candidate">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" name="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Candidate Account"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="employer">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company name</Label>
                  <Input id="companyName" name="companyName" placeholder="Acme Inc." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company website</Label>
                  <Input id="companyWebsite" name="companyWebsite" placeholder="https://acme.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employerEmail">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="hr@acme.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Employer Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialSignup("google")}
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialSignup("github")}
              disabled={isLoading}
            >
              GitHub
            </Button>
          </div>
          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-dark dark:text-brand-light hover:underline font-medium">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
