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
import { FileText } from "lucide-react"

interface CreateRunSheetDialogProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateRunSheetDialog({ children, open, onOpenChange }: CreateRunSheetDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    serviceDate: "",
    serviceTime: "",
    category: "sunday-service", // Updated default value
    description: "",
    template: "", // Updated default value
  })

  const handleSubmit = () => {
    // TODO: Implement run sheet creation logic
    console.log("Creating run sheet:", formData)
    onOpenChange(false)

    // Reset form
    setFormData({
      title: "",
      serviceDate: "",
      serviceTime: "",
      category: "sunday-service", // Updated default value
      description: "",
      template: "", // Updated default value
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
            Create New Run Sheet
          </DialogTitle>
          <DialogDescription className="text-sm">Set up a new service run sheet for your team</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 mobile-form">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              placeholder="Sunday Morning Service"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mobile-btn"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceDate">Service Date</Label>
              <Input
                id="serviceDate"
                type="date"
                value={formData.serviceDate}
                onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                className="mobile-btn"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceTime">Service Time</Label>
              <Input
                id="serviceTime"
                type="time"
                value={formData.serviceTime}
                onChange={(e) => setFormData({ ...formData, serviceTime: e.target.value })}
                className="mobile-btn"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="mobile-btn">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday-service">Sunday Service</SelectItem>
                <SelectItem value="prayer-meeting">Prayer Meeting</SelectItem>
                <SelectItem value="youth-service">Youth Service</SelectItem>
                <SelectItem value="special-event">Special Event</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="template">Start from Template (Optional)</Label>
            <Select value={formData.template} onValueChange={(value) => setFormData({ ...formData, template: value })}>
              <SelectTrigger className="mobile-btn">
                <SelectValue placeholder="Choose a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blank">Blank Run Sheet</SelectItem>
                <SelectItem value="sunday-morning">Sunday Morning Template</SelectItem>
                <SelectItem value="prayer-meeting">Prayer Meeting Template</SelectItem>
                <SelectItem value="youth-service">Youth Service Template</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Additional notes about this service..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="mobile-btn"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mobile-btn">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="mobile-btn">Create Run Sheet</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
