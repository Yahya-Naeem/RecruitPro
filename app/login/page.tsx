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

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || ""
  const defaultTab = searchParams.get("type") || "candidate"
  const [userType, setUserType] = useState<"candidate" | "employer">(defaultTab as "candidate" | "employer")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { signIn, signInWithGoogle, signInWithGithub, userRole } = useAuth()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      //await signIn(email, password)

      toast({
        title: "Logged in successfully",
        description: "Welcome back to RecruitPro!",
      })

      // Redirect based on user role or redirect parameter
      if (redirect) {
        router.push(redirect)
      } else if (userRole === "candidate") {
        router.push("/candidate/dashboard")
      } else if (userRole === "employer") {
        router.push("/admin/dashboard")
      } else {
        // If role is not yet determined, redirect based on selected tab
        if (userType === "candidate") {
          router.push("/candidate/dashboard")
        } else {
          router.push("/admin/dashboard")
        }
      }
    } catch (error: any) {
      toast({
        title: "Error logging in",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsLoading(true)
    try {
      if (provider === "google") {
        await signInWithGoogle(userType)
      } else if (provider === "github") {
        await signInWithGithub(userType)
      }

      toast({
        title: "Logged in successfully",
        description: "Welcome back to RecruitPro!",
      })

      // Redirect based on user role or redirect parameter
      if (redirect) {
        router.push(redirect)
      } else if (userRole === "candidate") {
        router.push("/candidate/dashboard")
      } else if (userRole === "employer") {
        router.push("/admin/dashboard")
      } else {
        // If role is not yet determined, redirect based on selected tab
        if (userType === "candidate") {
          router.push("/candidate/dashboard")
        } else {
          router.push("/admin/dashboard")
        }
      }
    } catch (error: any) {
      toast({
        title: "Error logging in",
        description: error.message || "There was an error logging in.",
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
          <CardTitle className="text-2xl font-bold text-center">Log in to your account</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={userType} onValueChange={(value) => setUserType(value as "candidate" | "employer")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
            </TabsList>
            <TabsContent value="candidate">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-brand-dark dark:text-brand-light hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="employer">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employerEmail">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="hr@acme.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-brand-dark dark:text-brand-light hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
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
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("github")}
              disabled={isLoading}
            >
              GitHub
            </Button>
          </div>
          <div className="text-center text-sm mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup?type=${userType}`}
              className="text-brand-dark dark:text-brand-light hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
