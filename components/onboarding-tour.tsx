"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { XIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface OnboardingStep {
  title: string
  description: string
  target: string
  placement?: "top" | "right" | "bottom" | "left"
  highlight?: boolean
}

interface OnboardingTourProps {
  userType: "candidate" | "employer"
}

export function OnboardingTour({ userType }: OnboardingTourProps) {
  const { user } = useAuth()
  const [showTour, setShowTour] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltips, setTooltips] = useState<{ [key: string]: boolean }>({})
  const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Define onboarding steps based on user type
  const candidateSteps: OnboardingStep[] = [
    {
      title: "Welcome to RecruitPro!",
      description: "Let's take a quick tour to help you get started with your job search journey.",
      target: "body",
    },
    {
      title: "Complete Your Profile",
      description: "Fill out your profile details to increase your chances of getting noticed by employers.",
      target: "[data-tour='profile-link']",
      placement: "bottom",
      highlight: true,
    },
    {
      title: "Browse Jobs",
      description: "Explore job listings that match your skills and preferences.",
      target: "[data-tour='jobs-link']",
      placement: "bottom",
      highlight: true,
    },
    {
      title: "Track Applications",
      description: "Keep track of your job applications and their status.",
      target: "[data-tour='applications-link']",
      placement: "bottom",
      highlight: true,
    },
    {
      title: "Get Recommendations",
      description: "View job recommendations based on your profile and preferences.",
      target: "[data-tour='recommendations']",
      placement: "left",
      highlight: true,
    },
  ]

  const employerSteps: OnboardingStep[] = [
    {
      title: "Welcome to RecruitPro!",
      description: "Let's take a quick tour to help you get started with finding the perfect candidates.",
      target: "body",
    },
    {
      title: "Complete Company Profile",
      description: "Add your company details to attract the right candidates.",
      target: "[data-tour='profile-link']",
      placement: "bottom",
      highlight: true,
    },
    {
      title: "Post a Job",
      description: "Create job listings with detailed requirements to find qualified candidates.",
      target: "[data-tour='post-job']",
      placement: "bottom",
      highlight: true,
    },
    {
      title: "Search Candidates",
      description: "Search and filter candidates based on skills, experience, and other criteria.",
      target: "[data-tour='candidates-link']",
      placement: "bottom",
      highlight: true,
    },
    {
      title: "View Analytics",
      description: "Track application metrics and candidate matches for your job postings.",
      target: "[data-tour='analytics-link']",
      placement: "bottom",
      highlight: true,
    },
    {
      title: "Communicate with Candidates",
      description: "Send messages and schedule interviews with potential candidates.",
      target: "[data-tour='communications-link']",
      placement: "bottom",
      highlight: true,
    },
  ]

  const steps = userType === "candidate" ? candidateSteps : employerSteps

  useEffect(() => {
    if (!user) return

    const checkOnboardingStatus = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))

        if (userDoc.exists()) {
          const userData = userDoc.data()
          // Show tour if onboarding is not completed
          setShowTour(!userData.onboardingCompleted)
        } else {
          // New user, show tour
          setShowTour(true)
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error)
        // Default to showing tour if there's an error
        setShowTour(true)
      }
    }

    checkOnboardingStatus()

    // Setup feature discovery tooltips after onboarding
    return () => {
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current)
      }
    }
  }, [user])

  useEffect(() => {
    if (!showTour) {
      // After tour is completed, show tooltips for key features over time
      setupFeatureDiscoveryTooltips()
      return
    }

    // Find target element for current step
    const target = steps[currentStep].target
    if (target === "body") {
      setTargetElement(document.body)
    } else {
      const element = document.querySelector(target) as HTMLElement
      setTargetElement(element)

      // Scroll element into view if it exists
      if (element && steps[currentStep].highlight) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })

        // Add a highlight effect
        const originalBackground = element.style.background
        const originalTransition = element.style.transition
        element.style.transition = "all 0.5s ease-in-out"
        element.style.background = "rgba(139, 92, 246, 0.2)"
        element.style.boxShadow = "0 0 0 4px rgba(139, 92, 246, 0.4)"
        element.style.borderRadius = "4px"

        // Remove highlight after a delay
        setTimeout(() => {
          element.style.background = originalBackground
          element.style.boxShadow = "none"
          element.style.transition = originalTransition
        }, 2000)
      }
    }
  }, [showTour, currentStep, steps])

  const setupFeatureDiscoveryTooltips = () => {
    // Show tooltips for key features one by one with delays
    const keyFeatures =
      userType === "candidate"
        ? ["profile-link", "jobs-link", "applications-link"]
        : ["profile-link", "post-job", "candidates-link", "communications-link"]

    keyFeatures.forEach((feature, index) => {
      tooltipTimerRef.current = setTimeout(
        () => {
          setTooltips((prev) => ({ ...prev, [feature]: true }))

          // Hide tooltip after 5 seconds
          setTimeout(() => {
            setTooltips((prev) => ({ ...prev, [feature]: false }))
          }, 5000)
        },
        (index + 1) * 10000,
      ) // Show each tooltip 10 seconds apart
    })
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeOnboarding()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    completeOnboarding()
  }

  const completeOnboarding = async () => {
    setShowTour(false)

    if (user) {
      try {
        // Mark onboarding as completed in Firestore
        await setDoc(
          doc(db, "users", user.uid),
          {
            onboardingCompleted: true,
          },
          { merge: true },
        )
      } catch (error) {
        console.error("Error updating onboarding status:", error)
      }
    }
  }

  // Calculate position based on target element and placement
  const getPosition = () => {
    if (!targetElement || steps[currentStep].target === "body") {
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "90vw",
        width: "400px",
      }
    }

    const rect = targetElement.getBoundingClientRect()
    const placement = steps[currentStep].placement || "bottom"
    const margin = 16 // margin from the element

    switch (placement) {
      case "top":
        return {
          bottom: `${window.innerHeight - rect.top + margin}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: "translateX(-50%)",
          maxWidth: "min(400px, 90vw)",
        }
      case "right":
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + margin}px`,
          transform: "translateY(-50%)",
          maxWidth: "min(400px, 90vw)",
        }
      case "bottom":
        return {
          top: `${rect.bottom + margin}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: "translateX(-50%)",
          maxWidth: "min(400px, 90vw)",
        }
      case "left":
        return {
          top: `${rect.top + rect.height / 2}px`,
          right: `${window.innerWidth - rect.left + margin}px`,
          transform: "translateY(-50%)",
          maxWidth: "min(400px, 90vw)",
        }
      default:
        return {
          top: `${rect.bottom + margin}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: "translateX(-50%)",
          maxWidth: "min(400px, 90vw)",
        }
    }
  }

  const position = getPosition()

  // Render feature discovery tooltips
  const renderFeatureTooltips = () => {
    if (showTour) return null

    return (
      <TooltipProvider>
        {Object.entries(tooltips).map(([feature, show]) => {
          if (!show) return null

          const element = document.querySelector(`[data-tour='${feature}']`) as HTMLElement
          if (!element) return null

          const featureTitle =
            feature === "profile-link"
              ? "Complete your profile"
              : feature === "jobs-link"
                ? "Browse available jobs"
                : feature === "applications-link"
                  ? "Track your applications"
                  : feature === "post-job"
                    ? "Post a new job"
                    : feature === "candidates-link"
                      ? "Search for candidates"
                      : feature === "communications-link"
                        ? "Message candidates"
                        : ""

          return (
            <Tooltip key={feature} open={true}>
              <TooltipTrigger asChild>
                <span
                  className="absolute"
                  style={{
                    top: `${element.getBoundingClientRect().bottom}px`,
                    left: `${element.getBoundingClientRect().left + element.getBoundingClientRect().width / 2}px`,
                  }}
                ></span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-brand-dark text-white p-3 max-w-xs">
                <p className="font-semibold">{featureTitle}</p>
                <p className="text-sm">Click to explore this feature</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </TooltipProvider>
    )
  }

  return (
    <>
      {showTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="absolute z-50" style={position}>
            <Card className="shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{steps[currentStep].title}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleSkip} className="h-8 w-8">
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p>{steps[currentStep].description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  {currentStep > 0 && (
                    <Button variant="outline" size="sm" onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {currentStep + 1} of {steps.length}
                  </span>
                  <Button size="sm" onClick={handleNext}>
                    {currentStep < steps.length - 1 ? "Next" : "Finish"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {renderFeatureTooltips()}
    </>
  )
}
