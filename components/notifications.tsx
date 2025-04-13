"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BellIcon } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  read: boolean
  type: "info" | "success" | "warning" | "error"
  link?: string
}

export function Notifications() {
  const { user, userRole } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (user) {
      fetchNotifications()
    }
  }, [user])

  const fetchNotifications = async () => {
    try {
      setLoading(true)

      // In a real app, this would fetch from Firestore
      // For demo purposes, we'll use mock data
      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "New message received",
          message:
            userRole === "candidate"
              ? "You have received a message from TechCorp regarding your application."
              : "John Doe has applied to your Senior Frontend Developer position.",
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          read: false,
          type: "info",
          link: userRole === "candidate" ? "/candidate/messages" : "/admin/communications",
        },
        {
          id: "2",
          title: userRole === "candidate" ? "Interview scheduled" : "Interview confirmed",
          message:
            userRole === "candidate"
              ? "Your interview with DesignHub has been scheduled for tomorrow at 2:00 PM."
              : "Interview with Jane Smith confirmed for tomorrow at 2:00 PM.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          read: false,
          type: "success",
          link: userRole === "candidate" ? "/candidate/interviews" : "/admin/calendar",
        },
        {
          id: "3",
          title: userRole === "candidate" ? "Application viewed" : "New candidate match",
          message:
            userRole === "candidate"
              ? "Your application for Backend Engineer at DataSystems has been viewed."
              : "New high-match candidate for Backend Engineer position.",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          read: true,
          type: "info",
          link: userRole === "candidate" ? "/candidate/applications" : "/admin/candidates",
        },
      ]

      setNotifications(mockNotifications)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      // In a real app, this would update the notification in Firestore
      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      // In a real app, this would update all notifications in Firestore
      setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">Loading notifications...</div>
          ) : notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b last:border-b-0 ${notification.read ? "" : "bg-gray-50 dark:bg-gray-800"}`}
                  onClick={() => {
                    if (!notification.read) {
                      markAsRead(notification.id)
                    }
                    if (notification.link) {
                      window.location.href = notification.link
                    }
                    setOpen(false)
                  }}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 mr-2 ${
                        notification.type === "success"
                          ? "bg-green-500"
                          : notification.type === "warning"
                            ? "bg-yellow-500"
                            : notification.type === "error"
                              ? "bg-red-500"
                              : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        {" • "}
                        {notification.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
