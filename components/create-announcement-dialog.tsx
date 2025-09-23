"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Send, Plus, X } from "lucide-react"

interface CreateAnnouncementDialogProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

const teamMembers = [
  { id: 1, name: "John Smith", role: "Admin", selected: false },
  { id: 2, name: "Sarah Johnson", role: "Media Lead", selected: false },
  { id: 3, name: "Mike Davis", role: "Volunteer", selected: false },
  { id: 4, name: "Emily Wilson", role: "Volunteer", selected: false },
  { id: 5, name: "David Brown", role: "Volunteer", selected: false },
  { id: 6, name: "Lisa Chen", role: "Volunteer", selected: false },
]

export function CreateAnnouncementDialog({ children, open, onOpenChange }: CreateAnnouncementDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    priority: "medium",
    category: "general",
    isPinned: false,
    sendNotification: true,
    scheduleFor: "",
  })

  const [selectedMembers, setSelectedMembers] = useState<number[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleMemberToggle = (memberId: number) => {
    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  const selectAllMembers = () => {
    setSelectedMembers(teamMembers.map((member) => member.id))
  }

  const clearAllMembers = () => {
    setSelectedMembers([])
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = () => {
    // TODO: Implement announcement creation logic
    console.log("Creating announcement:", {
      ...formData,
      recipients: selectedMembers,
      tags,
    })
    onOpenChange(false)

    // Reset form
    setFormData({
      title: "",
      message: "",
      priority: "medium",
      category: "general",
      isPinned: false,
      sendNotification: true,
      scheduleFor: "",
    })
    setSelectedMembers([])
    setTags([])
    setNewTag("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Create New Announcement
          </DialogTitle>
          <DialogDescription>Share important updates and information with your team</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Announcement Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter announcement title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your announcement message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="youth">Youth</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="schedule">Schedule</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                  />
                  <Button variant="outline" size="sm" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipients */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recipients ({selectedMembers.length} selected)
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={selectAllMembers}>
                    Select All
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAllMembers}>
                    Clear All
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={() => handleMemberToggle(member.id)}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pinned"
                  checked={formData.isPinned}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPinned: !!checked })}
                />
                <Label htmlFor="pinned">Pin this announcement</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notification"
                  checked={formData.sendNotification}
                  onCheckedChange={(checked) => setFormData({ ...formData, sendNotification: !!checked })}
                />
                <Label htmlFor="notification">Send push notification</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduleFor">Schedule for later (Optional)</Label>
                <Input
                  id="scheduleFor"
                  type="datetime-local"
                  value={formData.scheduleFor}
                  onChange={(e) => setFormData({ ...formData, scheduleFor: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.title || !formData.message || selectedMembers.length === 0}
          >
            <Send className="mr-2 h-4 w-4" />
            {formData.scheduleFor ? "Schedule" : "Send"} Announcement
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
