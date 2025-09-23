"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Mail, Phone, Edit, Trash2 } from "lucide-react"

// Mock team data
const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@church.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    avatar: "/man-profile.png",
    status: "active",
    joinDate: "2023-01-15",
    assignedTasks: ["Audio Setup", "Video Recording"],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@church.com",
    phone: "+1 (555) 234-5678",
    role: "Media Lead",
    avatar: "/woman-profile.png",
    status: "active",
    joinDate: "2023-02-20",
    assignedTasks: ["Presentation Setup", "Live Streaming"],
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@church.com",
    phone: "+1 (555) 345-6789",
    role: "Volunteer",
    avatar: "/man-profile-2.png",
    status: "active",
    joinDate: "2023-03-10",
    assignedTasks: ["Camera Operation"],
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily@church.com",
    phone: "+1 (555) 456-7890",
    role: "Volunteer",
    avatar: "/woman-profile-two.png",
    status: "inactive",
    joinDate: "2023-04-05",
    assignedTasks: ["Sound Mixing"],
  },
]

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "Media Lead":
      return "bg-primary/10 text-primary dark:bg-primary/20"
    case "Volunteer":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

export function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-balance">Team Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage your church media team members and their roles</p>
        </div>
        <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
          <DialogTrigger asChild>
            <Button className="mobile-btn">
              <Plus className="mr-1 sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add Member</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Invite a new member to join your church media team</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mobile-form">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" className="mobile-btn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" className="mobile-btn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" className="mobile-btn" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger className="mobile-btn">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Media Lead">Media Lead</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)} className="mobile-btn">
                  Cancel
                </Button>
                <Button onClick={() => setIsAddMemberOpen(false)} className="mobile-btn">Send Invitation</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 mobile-btn"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-48 mobile-btn">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Media Lead">Media Lead</SelectItem>
            <SelectItem value="Volunteer">Volunteer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="mobile-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm sm:text-base">{member.name}</CardTitle>
                    <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(member.role)}`}>
                      {member.role}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="mobile-btn">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Member
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              <div className="space-y-2">
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-start space-x-2 text-xs sm:text-sm text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span className="truncate">{member.phone}</span>
                </div>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-medium mb-1">Assigned Tasks</p>
                <div className="flex flex-wrap gap-1">
                  {member.assignedTasks.map((task, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {task}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground space-y-1 sm:space-y-0">
                <span className="truncate">Joined {member.joinDate}</span>
                <Badge variant={member.status === "active" ? "default" : "secondary"} className="text-xs">
                  {member.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
            <p className="text-muted-foreground mb-4 text-center text-sm sm:text-base">No team members found matching your criteria</p>
            <Button
              variant="outline"
              className="mobile-btn"
              onClick={() => {
                setSearchTerm("")
                setRoleFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
