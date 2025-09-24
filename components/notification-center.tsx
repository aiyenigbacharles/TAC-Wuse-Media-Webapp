"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Bell, CheckCheck, Clock, MessageSquare, Calendar, Settings } from "lucide-react"

interface NotificationCenterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "announcement",
    title: "Youth Retreat Registration Open",
    message: "Registration is now open for our annual youth retreat...",
    author: "Sarah Johnson",
    timestamp: "2024-01-20T10:30:00Z",
    isRead: false,
    priority: "high",
  },
  {
    id: 2,
    type: "schedule",
    title: "Schedule Assignment",
    message: "You've been assigned to Sunday Morning Service - Video Operator",
    author: "System",
    timestamp: "2024-01-19T14:15:00Z",
    isRead: true,
    priority: "medium",
  },
  {
    id: 3,
    type: "reminder",
    title: "Service Reminder",
    message: "Don't forget about tomorrow's service at 10:00 AM",
    author: "System",
    timestamp: "2024-01-18T16:45:00Z",
    isRead: false,
    priority: "medium",
  },
  {
    id: 4,
    type: "announcement",
    title: "New Sound Equipment Training",
    message: "Training session this Saturday at 2 PM...",
    author: "John Smith",
    timestamp: "2024-01-17T11:20:00Z",
    isRead: true,
    priority: "low",
  },
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "announcement":
      return MessageSquare
    case "schedule":
      return Calendar
    case "reminder":
      return Clock
    default:
      return Bell
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  return date.toLocaleDateString()
}

export function NotificationCenter({ open, onOpenChange }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    return notification.type === activeTab
  })

  const markAllAsRead = () => {
    // TODO: Implement mark all as read logic
    console.log("Marking all notifications as read")
  }

  const markAsRead = (id: number) => {
    // TODO: Implement mark as read logic
    console.log("Marking notification as read:", id)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md" side="right">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription className="text-sm">Stay updated with the latest announcements and reminders</SheetDescription>
        </SheetHeader>

        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={markAllAsRead} className="mobile-btn text-xs">
              <CheckCheck className="mr-1 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Mark All Read</span>
              <span className="sm:hidden">Mark Read</span>
            </Button>
            <Button variant="ghost" size="sm" className="mobile-btn">
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 h-8 sm:h-9">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-0.5 sm:ml-1 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="announcement" className="text-xs">
                News
              </TabsTrigger>
              <TabsTrigger value="schedule" className="text-xs">
                Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <div className="space-y-2 sm:space-y-3">
                {filteredNotifications.map((notification) => {
                  const NotificationIcon = getNotificationIcon(notification.type)
                  return (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                        !notification.isRead ? "border-primary/50 bg-primary/5" : ""
                      } mobile-card`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-muted flex items-center justify-center">
                              <NotificationIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                            </div>
                          </div>

                          <div className="flex-1 space-y-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-xs sm:text-sm font-medium line-clamp-1 flex-1">{notification.title}</p>
                              {!notification.isRead && (
                                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-1 sm:space-y-0">
                              <div className="flex items-center space-x-1 sm:space-x-2">
                                {notification.author !== "System" && (
                                  <Avatar className="h-3 w-3 sm:h-4 sm:w-4">
                                    <AvatarImage src="/placeholder.svg" alt={notification.author} />
                                    <AvatarFallback className="text-xs">
                                      {notification.author
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                <span className="text-xs text-muted-foreground truncate">{notification.author}</span>
                              </div>

                              <div className="flex items-center space-x-1 sm:space-x-2">
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getPriorityColor(notification.priority)}`}
                                >
                                  {notification.priority}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(notification.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredNotifications.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center text-sm">
                    {activeTab === "unread" ? "No unread notifications" : "No notifications found"}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
