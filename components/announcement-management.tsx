"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MessageSquare,
  Clock,
  Users,
  Pin,
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
  Bell,
  Eye,
} from "lucide-react"
import { CreateAnnouncementDialog } from "@/components/create-announcement-dialog"
import { NotificationCenter } from "@/components/notification-center"

// Mock announcements data
const announcements = [
  {
    id: 1,
    title: "Youth Retreat Registration Open",
    message:
      "Registration is now open for our annual youth retreat happening March 15-17. Early bird pricing available until February 15th. Contact the youth office for more details.",
    author: "Sarah Johnson",
    authorRole: "Media Lead",
    createdAt: "2024-01-20T10:30:00Z",
    priority: "high",
    category: "youth",
    isPinned: true,
    readBy: ["John Smith", "Mike Davis"],
    totalRecipients: 12,
    tags: ["youth", "retreat", "registration"],
  },
  {
    id: 2,
    title: "New Sound Equipment Training",
    message:
      "We'll be hosting a training session for our new sound equipment this Saturday at 2 PM. All audio volunteers are encouraged to attend. Pizza will be provided!",
    author: "John Smith",
    authorRole: "Admin",
    createdAt: "2024-01-19T14:15:00Z",
    priority: "medium",
    category: "training",
    isPinned: false,
    readBy: ["Sarah Johnson", "Emily Wilson", "Mike Davis"],
    totalRecipients: 8,
    tags: ["training", "audio", "equipment"],
  },
  {
    id: 3,
    title: "Service Schedule Update",
    message:
      "Please note that next Sunday's service will start 30 minutes earlier due to the special guest speaker. All team members should arrive by 9:00 AM for setup.",
    author: "Emily Wilson",
    authorRole: "Volunteer",
    createdAt: "2024-01-18T16:45:00Z",
    priority: "high",
    category: "schedule",
    isPinned: false,
    readBy: ["John Smith", "Sarah Johnson"],
    totalRecipients: 12,
    tags: ["schedule", "service", "timing"],
  },
  {
    id: 4,
    title: "Media Library Cleanup",
    message:
      "We'll be organizing and cleaning up the media library this week. Please make sure all your files are properly tagged and categorized. Old files will be archived.",
    author: "Mike Davis",
    authorRole: "Volunteer",
    createdAt: "2024-01-17T11:20:00Z",
    priority: "low",
    category: "maintenance",
    isPinned: false,
    readBy: ["Sarah Johnson"],
    totalRecipients: 6,
    tags: ["media", "cleanup", "organization"],
  },
]

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

const getCategoryColor = (category: string) => {
  switch (category) {
    case "youth":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200"
    case "training":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200"
    case "schedule":
      return "bg-primary/10 text-primary border-primary/20"
    case "maintenance":
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200"
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

export function AnnouncementManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesPriority = priorityFilter === "all" || announcement.priority === priorityFilter
    const matchesCategory = categoryFilter === "all" || announcement.category === categoryFilter
    return matchesSearch && matchesPriority && matchesCategory
  })

  // Sort by pinned first, then by date
  const sortedAnnouncements = filteredAnnouncements.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Announcements</h1>
          <p className="text-muted-foreground">Keep your team informed with important updates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowNotifications(true)}>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <CreateAnnouncementDialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </CreateAnnouncementDialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Announcements</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.filter((a) => a.priority === "high").length}</div>
            <p className="text-xs text-muted-foreground">Urgent items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pinned</CardTitle>
            <Pin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.filter((a) => a.isPinned).length}</div>
            <p className="text-xs text-muted-foreground">Important notices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active recipients</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="youth">Youth</SelectItem>
            <SelectItem value="training">Training</SelectItem>
            <SelectItem value="schedule">Schedule</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {sortedAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={`${announcement.isPinned ? "border-primary/50 bg-primary/5" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    {announcement.isPinned && <Pin className="h-4 w-4 text-primary" />}
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(announcement.category)}`}>
                      {announcement.category}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="/placeholder.svg" alt={announcement.author} />
                        <AvatarFallback className="text-xs">
                          {announcement.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{announcement.author}</span>
                      <Badge variant="secondary" className="text-xs">
                        {announcement.authorRole}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(announcement.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pin className="mr-2 h-4 w-4" />
                      {announcement.isPinned ? "Unpin" : "Pin"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Send className="mr-2 h-4 w-4" />
                      Resend Notification
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{announcement.message}</p>

              {announcement.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {announcement.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>
                      {announcement.readBy.length} of {announcement.totalRecipients} read
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{announcement.totalRecipients} recipients</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {announcement.readBy.slice(0, 3).map((person, index) => (
                    <Avatar key={index} className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" alt={person} />
                      <AvatarFallback className="text-xs">
                        {person
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {announcement.readBy.length > 3 && (
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs">+{announcement.readBy.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedAnnouncements.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No announcements found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setPriorityFilter("all")
                setCategoryFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      <NotificationCenter open={showNotifications} onOpenChange={setShowNotifications} />
    </div>
  )
}
