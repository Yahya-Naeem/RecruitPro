"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CalendarIcon, CheckIcon } from "lucide-react"

// This would be replaced with actual Google Calendar API integration
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

interface CalendarEvent {
  id: string
  summary: string
  description?: string
  location?: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
}

interface CalendarIntegrationProps {
  candidateEmail?: string
  candidateName?: string
  jobTitle?: string
}

export function CalendarIntegration({ candidateEmail, candidateName, jobTitle }: CalendarIntegrationProps) {
  const { toast } = useToast()
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([])
  const [eventDetails, setEventDetails] = useState({
    summary: jobTitle ? `Interview for ${jobTitle} position` : "Interview",
    description: "",
    location: "",
    startDate: "",
    startTime: "10:00",
    endDate: "",
    endTime: "11:00",
  })

  useEffect(() => {
    // Check if user is already connected to Google Calendar
    const checkConnection = async () => {
      // In a real app, this would check if the user has authorized the app
      // and has a valid token stored
      const hasToken = localStorage.getItem("google_calendar_token")
      setIsConnected(!!hasToken)

      if (hasToken) {
        fetchEvents()
      }
    }

    checkConnection()
  }, [])

  useEffect(() => {
    if (candidateName && jobTitle) {
      setEventDetails({
        ...eventDetails,
        summary: `Interview with ${candidateName} for ${jobTitle} position`,
        description: `Interview with ${candidateName} ${candidateEmail ? `(${candidateEmail})` : ""} for the ${jobTitle} position.`,
      })
    }
  }, [candidateName, candidateEmail, jobTitle])

  const connectToGoogleCalendar = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would redirect to Google OAuth flow
      // For demo purposes, we'll simulate a successful connection
      setTimeout(() => {
        localStorage.setItem("google_calendar_token", "mock_token")
        setIsConnected(true)
        setIsLoading(false)

        toast({
          title: "Connected to Google Calendar",
          description: "You can now schedule interviews and view your calendar events.",
        })

        // Mock some upcoming events
        setUpcomingEvents([
          {
            id: "1",
            summary: "Team Meeting",
            location: "Conference Room A",
            start: {
              dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
              timeZone: "America/New_York",
            },
            end: {
              dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // Tomorrow + 1 hour
              timeZone: "America/New_York",
            },
          },
          {
            id: "2",
            summary: "Interview with Sarah Williams",
            description: "Interview for Full Stack Developer position",
            start: {
              dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
              timeZone: "America/New_York",
            },
            end: {
              dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // Day after tomorrow + 1 hour
              timeZone: "America/New_York",
            },
          },
        ])
      }, 1500)
    } catch (error) {
      console.error("Error connecting to Google Calendar:", error)
      setIsLoading(false)

      toast({
        title: "Connection failed",
        description: "There was an error connecting to Google Calendar. Please try again.",
        variant: "destructive",
      })
    }
  }

  const disconnectFromGoogleCalendar = () => {
    // In a real app, this would revoke the token and sign out
    localStorage.removeItem("google_calendar_token")
    setIsConnected(false)
    setUpcomingEvents([])

    toast({
      title: "Disconnected from Google Calendar",
      description: "You have successfully disconnected from Google Calendar.",
    })
  }

  const fetchEvents = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would fetch events from the Google Calendar API
      // For demo purposes, we'll use the mock events already set
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching events:", error)
      setIsLoading(false)

      toast({
        title: "Error fetching events",
        description: "There was an error fetching your calendar events. Please try again.",
        variant: "destructive",
      })
    }
  }

  const scheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would create an event in Google Calendar
      // and send an invitation to the candidate

      // Validate form
      if (!eventDetails.summary || !eventDetails.startDate || !eventDetails.endDate) {
        throw new Error("Please fill in all required fields")
      }

      // Create start and end datetime strings
      const startDateTime = `${eventDetails.startDate}T${eventDetails.startTime}:00`
      const endDateTime = `${eventDetails.endDate}T${eventDetails.endTime}:00`

      // Simulate API call
      setTimeout(() => {
        const newEvent: CalendarEvent = {
          id: Math.random().toString(36).substring(2, 11),
          summary: eventDetails.summary,
          description: eventDetails.description,
          location: eventDetails.location,
          start: {
            dateTime: new Date(startDateTime).toISOString(),
            timeZone: "America/New_York",
          },
          end: {
            dateTime: new Date(endDateTime).toISOString(),
            timeZone: "America/New_York",
          },
        }

        setUpcomingEvents([newEvent, ...upcomingEvents])
        setIsLoading(false)

        toast({
          title: "Interview scheduled",
          description: `Interview invitation has been sent to ${candidateEmail || "the candidate"}.`,
        })

        // Reset form
        setEventDetails({
          ...eventDetails,
          startDate: "",
          endDate: "",
        })
      }, 1500)
    } catch (error: any) {
      console.error("Error scheduling interview:", error)
      setIsLoading(false)

      toast({
        title: "Error scheduling interview",
        description: error.message || "There was an error scheduling the interview. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatEventTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Google Calendar Integration
        </CardTitle>
        <CardDescription>Connect your Google Calendar to schedule interviews and manage appointments</CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="flex justify-center py-6">
            <Button onClick={connectToGoogleCalendar} disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect to Google Calendar"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="font-medium">Connected to Google Calendar</span>
              </div>
              <Button variant="outline" size="sm" onClick={disconnectFromGoogleCalendar}>
                Disconnect
              </Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Schedule an Interview</h3>
              <form onSubmit={scheduleInterview} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="summary">Event Title</Label>
                  <Input
                    id="summary"
                    value={eventDetails.summary}
                    onChange={(e) => setEventDetails({ ...eventDetails, summary: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={eventDetails.description}
                    onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={eventDetails.location}
                    onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                    placeholder="Office address or video call link"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={eventDetails.startDate}
                      onChange={(e) => setEventDetails({ ...eventDetails, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={eventDetails.startTime}
                      onChange={(e) => setEventDetails({ ...eventDetails, startTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={eventDetails.endDate}
                      onChange={(e) => setEventDetails({ ...eventDetails, endDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={eventDetails.endTime}
                      onChange={(e) => setEventDetails({ ...eventDetails, endTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Scheduling..." : "Schedule Interview & Send Invitation"}
                </Button>
              </form>
            </div>

            {upcomingEvents.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="font-medium">{event.summary}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatEventTime(event.start.dateTime)} - {formatEventTime(event.end.dateTime)}
                      </div>
                      {event.location && (
                        <div className="text-sm text-muted-foreground mt-1">Location: {event.location}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
