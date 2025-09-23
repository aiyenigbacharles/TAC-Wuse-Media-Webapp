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
  FileText,
  Calendar,
  Clock,
  Users,
  Share2,
  Download,
  Copy,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
} from "lucide-react"
import { CreateRunSheetDialog } from "@/components/create-run-sheet-dialog"
import { RunSheetEditor } from "@/components/run-sheet-editor"

// Mock run sheet data
const runSheets = [
  {
    id: 1,
    title: "Sunday Morning Service - Jan 21",
    serviceDate: "2024-01-21",
    serviceTime: "10:00 AM",
    status: "draft",
    createdBy: "Sarah Johnson",
    createdDate: "2024-01-20",
    lastModified: "2024-01-20",
    sharedWith: ["John Smith", "Mike Davis"],
    itemCount: 12,
    estimatedDuration: "90 minutes",
    category: "sunday-service",
  },
  {
    id: 2,
    title: "Wednesday Prayer Meeting - Jan 24",
    serviceDate: "2024-01-24",
    serviceTime: "7:00 PM",
    status: "published",
    createdBy: "John Smith",
    createdDate: "2024-01-22",
    lastModified: "2024-01-23",
    sharedWith: ["Sarah Johnson", "Emily Wilson"],
    itemCount: 8,
    estimatedDuration: "60 minutes",
    category: "prayer-meeting",
  },
  {
    id: 3,
    title: "Youth Service - Jan 26",
    serviceDate: "2024-01-26",
    serviceTime: "6:00 PM",
    status: "review",
    createdBy: "Emily Wilson",
    createdDate: "2024-01-23",
    lastModified: "2024-01-24",
    sharedWith: ["Sarah Johnson"],
    itemCount: 10,
    estimatedDuration: "75 minutes",
    category: "youth-service",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "review":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "published":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "archived":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "sunday-service":
      return "bg-primary/10 text-primary border-primary/20"
    case "prayer-meeting":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200"
    case "youth-service":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200"
    case "special-event":
      return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200"
  }
}

export function RunSheetManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingRunSheet, setEditingRunSheet] = useState<number | null>(null)

  const filteredRunSheets = runSheets.filter((sheet) => {
    const matchesSearch = sheet.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sheet.status === statusFilter
    const matchesCategory = categoryFilter === "all" || sheet.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  if (editingRunSheet) {
    const runSheet = runSheets.find((sheet) => sheet.id === editingRunSheet)
    return <RunSheetEditor runSheet={runSheet!} onBack={() => setEditingRunSheet(null)} />
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Run Sheets</h1>
          <p className="text-muted-foreground">Create and manage service run sheets for your team</p>
        </div>
        <CreateRunSheetDialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Run Sheet
          </Button>
        </CreateRunSheetDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Run Sheets</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runSheets.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runSheets.filter((s) => s.status === "published").length}</div>
            <p className="text-xs text-muted-foreground">Ready for services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runSheets.filter((s) => s.status === "review").length}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runSheets.filter((s) => s.status === "draft").length}</div>
            <p className="text-xs text-muted-foreground">Work in progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search run sheets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">In Review</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="sunday-service">Sunday Service</SelectItem>
            <SelectItem value="prayer-meeting">Prayer Meeting</SelectItem>
            <SelectItem value="youth-service">Youth Service</SelectItem>
            <SelectItem value="special-event">Special Event</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Run Sheets Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRunSheets.map((sheet) => (
          <Card key={sheet.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg line-clamp-2">{sheet.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{sheet.serviceDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{sheet.serviceTime}</span>
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
                    <DropdownMenuItem onClick={() => setEditingRunSheet(sheet.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View/Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Export PDF
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
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getStatusColor(sheet.status)}>
                  {sheet.status}
                </Badge>
                <Badge variant="outline" className={getCategoryColor(sheet.category)}>
                  {sheet.category.replace("-", " ")}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Items:</span>
                  <span>{sheet.itemCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>{sheet.estimatedDuration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Created by:</span>
                  <span>{sheet.createdBy}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Shared with:</p>
                <div className="flex items-center space-x-2">
                  {sheet.sharedWith.slice(0, 3).map((person, index) => (
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
                  {sheet.sharedWith.length > 3 && (
                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs">+{sheet.sharedWith.length - 3}</span>
                    </div>
                  )}
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Users className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => setEditingRunSheet(sheet.id)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRunSheets.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No run sheets found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setCategoryFilter("all")
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
