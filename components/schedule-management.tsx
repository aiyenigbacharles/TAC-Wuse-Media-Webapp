"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CalendarDays, List, Plus, Clock, Users, MapPin } from "lucide-react"
import { ScheduleCalendar } from "@/components/schedule-calendar"
import { CreateEventDialog } from "@/components/create-event-dialog"

// Mock schedule data
const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Morning Service",
    date: "2024-01-21",
    time: "10:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    type: "service",
    assignments: [
      { role: "Video Operator", assignee: "John Smith", confirmed: true },
      { role: "Audio Technician", assignee: "Sarah Johnson", confirmed: true },
      { role: "Camera 1", assignee: "Mike Davis", confirmed: false },
      { role: "Camera 2", assignee: null, confirmed: false },
      { role: "Live Stream", assignee: "Emily Wilson", confirmed: true },
    ],
  },
  {
    id: 2,
    title: "Wednesday Prayer Meeting",
    date: "2024-01-24",
    time: "7:00 PM - 8:30 PM",
    location: "Fellowship Hall",
    type: "prayer",
    assignments: [
      { role: "Audio Setup", assignee: "Mike Davis", confirmed: true },
      { role: "Presentation", assignee: "Sarah Johnson", confirmed: false },
    ],
  },
  {
    id: 3,
    title: "Youth Service",
    date: "2024-01-26",
    time: "6:00 PM - 8:00 PM",
    location: "Youth Center",
    type: "youth",
    assignments: [
      { role: "Sound Engineer", assignee: null, confirmed: false },
      { role: "Video Recording", assignee: "John Smith", confirmed: true },
      { role: "Lighting", assignee: "Emily Wilson", confirmed: false },
    ],
  },
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "service":
      return "bg-primary/10 text-primary border-primary/20"
    case "prayer":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200"
    case "youth":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200"
    case "special":
      return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200"
  }
}

export function ScheduleManagement() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [activeView, setActiveView] = useState("list")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Schedule Management</h1>
          <p className="text-muted-foreground">Manage service schedules and team assignments</p>
        </div>
        <CreateEventDialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </CreateEventDialog>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Calendar View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Team Assignments ({event.assignments.filter((a) => a.assignee).length}/
                        {event.assignments.length})
                      </h4>
                      <Button variant="outline" size="sm">
                        Manage Assignments
                      </Button>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {event.assignments.map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-lg bg-card/50">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {assignment.role}
                            </Badge>
                            {assignment.assignee ? (
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg" alt={assignment.assignee} />
                                  <AvatarFallback className="text-xs">
                                    {assignment.assignee
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{assignment.assignee}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">Unassigned</span>
                            )}
                          </div>
                          <Badge variant={assignment.confirmed ? "default" : "secondary"} className="text-xs">
                            {assignment.assignee ? (assignment.confirmed ? "Confirmed" : "Pending") : "Open"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <ScheduleCalendar events={upcomingEvents} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
