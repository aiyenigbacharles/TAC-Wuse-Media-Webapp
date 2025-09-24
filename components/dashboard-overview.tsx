"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, FileImage, Users, Plus, ChevronRight, UserPlus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

// Mock data - in real app this would come from API
const upcomingServices = [
  {
    id: 1,
    name: "Sunday Morning Service",
    date: "2024-01-21",
    time: "10:00 AM",
    role: "Video Operator",
    status: "confirmed",
  },
  {
    id: 2,
    name: "Wednesday Prayer Meeting",
    date: "2024-01-24",
    time: "7:00 PM",
    role: "Audio Technician",
    status: "pending",
  },
]

const recentMedia = [
  {
    id: 1,
    name: "Worship Slides - Jan 21",
    type: "Presentation",
    uploadedBy: "John Smith",
    date: "2024-01-20",
  },
  {
    id: 2,
    name: "Sermon Background",
    type: "Image",
    uploadedBy: "Sarah Johnson",
    date: "2024-01-19",
  },
]

const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "Admin",
    avatar: "/man-profile.png",
    status: "online",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Media Lead",
    avatar: "/woman-profile.png",
    status: "online",
  },
  {
    id: 3,
    name: "Mike Davis",
    role: "Volunteer",
    avatar: "/man-profile-2.png",
    status: "offline",
  },
]

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-red-500/20 text-red-300 border-red-500/30"
    case "Media Lead":
      return "bg-primary/20 text-primary border-primary/30"
    case "Volunteer":
      return "bg-green-500/20 text-green-300 border-green-500/30"
    default:
      return "bg-muted/20 text-muted-foreground border-border"
  }
}

export function DashboardOverview() {
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    const fetchUserName = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // Try to get name from user metadata first, then from profile
        const fullName = user.user_metadata?.full_name
        if (fullName) {
          setUserName(fullName)
        } else {
          // Fallback: fetch from profiles table
          const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single()

          if (profile?.full_name) {
            setUserName(profile.full_name)
          }
        }
      }
    }

    fetchUserName()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance text-foreground">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your church media team today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-gradient border-border/50 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Upcoming Services</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border/50 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Team Members</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground">Active volunteers</p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border/50 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Media Files</CardTitle>
            <FileImage className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">48</div>
            <p className="text-xs text-muted-foreground">Ready for services</p>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border/50 hover:border-primary/20 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Hours Saved</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Services */}
        <Card className="card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Your Upcoming Assignments</CardTitle>
            <CardDescription>Services you're scheduled for this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingServices.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{service.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{service.date}</span>
                    <Clock className="h-3 w-3" />
                    <span>{service.time}</span>
                  </div>
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    {service.role}
                  </Badge>
                </div>
                <Badge
                  variant={service.status === "confirmed" ? "default" : "secondary"}
                  className={service.status === "confirmed" ? "bg-primary text-primary-foreground" : ""}
                >
                  {service.status}
                </Badge>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full bg-transparent border-border hover:bg-card/50 hover:border-primary/30"
            >
              <Plus className="mr-2 h-4 w-4" />
              View All Assignments
            </Button>
          </CardContent>
        </Card>

        {/* Team Overview */}
        <Card className="card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Team Members</CardTitle>
            <CardDescription>Active members in your media team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-card/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                        member.status === "online" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <Badge variant="outline" className={`text-xs ${getRoleBadgeColor(member.role)}`}>
                      {member.role}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-card/50">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full bg-transparent border-border hover:bg-card/50 hover:border-primary/30"
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Team
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Media */}
      <Card className="card-gradient border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Media</CardTitle>
          <CardDescription>Latest files uploaded to your media library</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentMedia.map((media) => (
              <div
                key={media.id}
                className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-card/30 hover:bg-card/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileImage className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{media.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {media.type} • Uploaded by {media.uploadedBy} • {media.date}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-card/50">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full mt-4 bg-transparent border-border hover:bg-card/50 hover:border-primary/30"
          >
            <FileImage className="mr-2 h-4 w-4" />
            View Media Library
          </Button>
        </CardContent>
      </Card>

      <Card className="card-gradient border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-8 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Want to Join the Media Team?</h3>
            <p className="text-muted-foreground text-balance">
              Help us create amazing worship experiences and serve our church community through media ministry.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-2">
              Apply to Join Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
