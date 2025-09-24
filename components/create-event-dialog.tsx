"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Users } from "lucide-react"

interface CreateEventDialogProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

const availableRoles = [
  "Video Operator",
  "Audio Technician",
  "Camera 1",
  "Camera 2",
  "Live Stream",
  "Presentation",
  "Sound Engineer",
  "Lighting",
  "Audio Setup",
  "Video Recording",
]

const teamMembers = [
  { id: 1, name: "John Smith", role: "Admin" },
  { id: 2, name: "Sarah Johnson", role: "Media Lead" },
  { id: 3, name: "Mike Davis", role: "Volunteer" },
  { id: 4, name: "Emily Wilson", role: "Volunteer" },
]

export function CreateEventDialog({ children, open, onOpenChange }: CreateEventDialogProps) {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    type: "",
    description: "",
  })

  const [assignments, setAssignments] = useState<Array<{ role: string; assignee: string | null }>>([])

  const addAssignment = () => {
    setAssignments([...assignments, { role: availableRoles[0], assignee: null }])
  }

  const removeAssignment = (index: number) => {
    setAssignments(assignments.filter((_, i) => i !== index))
  }

  const updateAssignment = (index: number, field: "role" | "assignee", value: string) => {
    const updated = [...assignments]
    updated[index] = { ...updated[index], [field]: value === "" ? null : value }
    setAssignments(updated)
  }

  const handleSubmit = () => {
    // TODO: Implement event creation logic
    console.log("Creating event:", { eventData, assignments })
    onOpenChange(false)

    // Reset form
    setEventData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      type: "",
      description: "",
    })
    setAssignments([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Create New Event</DialogTitle>
          <DialogDescription className="text-sm">Schedule a new service or event and assign team members to roles</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Event Details */}
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 mobile-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    placeholder="Sunday Morning Service"
                    value={eventData.title}
                    onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                    className="mobile-btn"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={eventData.type} onValueChange={(value) => setEventData({ ...eventData, type: value })}>
                    <SelectTrigger className="mobile-btn">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="prayer">Prayer Meeting</SelectItem>
                      <SelectItem value="youth">Youth Event</SelectItem>
                      <SelectItem value="special">Special Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                    className="mobile-btn"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={eventData.startTime}
                    onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
                    className="mobile-btn"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={eventData.endTime}
                    onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
                    className="mobile-btn"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Main Sanctuary"
                  value={eventData.location}
                  onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                  className="mobile-btn"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Additional details about the event..."
                  value={eventData.description}
                  onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                  className="mobile-btn"
                />
              </div>
            </CardContent>
          </Card>

          {/* Team Assignments */}
          <Card className="mobile-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  Team Assignments
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addAssignment} className="mobile-btn text-xs">
                  <Plus className="mr-1 sm:mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Add Role</span>
                  <span className="sm:hidden">Add</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              {assignments.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-muted-foreground">
                  <Users className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No assignments yet. Click "Add Role" to start assigning team members.</p>
                </div>
              ) : (
                assignments.map((assignment, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 border rounded-lg space-y-2 sm:space-y-0">
                    <div className="flex-1">
                      <Select value={assignment.role} onValueChange={(value) => updateAssignment(index, "role", value)}>
                        <SelectTrigger className="mobile-btn">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Select
                        value={assignment.assignee || ""}
                        onValueChange={(value) => updateAssignment(index, "assignee", value)}
                      >
                        <SelectTrigger className="mobile-btn">
                          <SelectValue placeholder="Assign to..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Unassigned</SelectItem>
                          {teamMembers.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              {member.name} ({member.role})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mobile-btn self-end sm:self-center"
                      onClick={() => removeAssignment(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mobile-btn">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="mobile-btn">Create Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
