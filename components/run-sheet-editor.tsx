"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Save,
  Share2,
  Download,
  Plus,
  GripVertical,
  Clock,
  Music,
  Mic,
  Video,
  FileText,
  MoreHorizontal,
  Trash2,
  Edit,
} from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

interface RunSheetItem {
  id: string
  type: "worship" | "sermon" | "announcement" | "prayer" | "media" | "transition"
  title: string
  duration: number
  notes: string
  assignedTo: string
  mediaFiles: string[]
  cues: string[]
}

interface RunSheet {
  id: number
  title: string
  serviceDate: string
  serviceTime: string
  status: string
  createdBy: string
  createdDate: string
  lastModified: string
  sharedWith: string[]
  itemCount: number
  estimatedDuration: string
  category: string
}

interface RunSheetEditorProps {
  runSheet: RunSheet
  onBack: () => void
}

// Mock run sheet items
const initialItems: RunSheetItem[] = [
  {
    id: "1",
    type: "worship",
    title: "Welcome & Opening Prayer",
    duration: 5,
    notes: "Welcome everyone, brief announcements",
    assignedTo: "Pastor John",
    mediaFiles: [],
    cues: ["Lights up", "Mic check"],
  },
  {
    id: "2",
    type: "worship",
    title: "Worship Set 1",
    duration: 20,
    notes: "3 songs: Amazing Grace, How Great Thou Art, Blessed Be Your Name",
    assignedTo: "Worship Team",
    mediaFiles: ["worship-slides-1.pptx", "background-video.mp4"],
    cues: ["Start background video", "Slides ready"],
  },
  {
    id: "3",
    type: "announcement",
    title: "Church Announcements",
    duration: 5,
    notes: "Youth retreat, upcoming events",
    assignedTo: "Sarah Johnson",
    mediaFiles: ["announcements-slides.pptx"],
    cues: ["Switch to announcement slides"],
  },
  {
    id: "4",
    type: "sermon",
    title: "Main Message",
    duration: 30,
    notes: "Topic: Faith in Action - Matthew 5:14-16",
    assignedTo: "Pastor Mark",
    mediaFiles: ["sermon-slides.pptx"],
    cues: ["Sermon slides ready", "Lower lights"],
  },
  {
    id: "5",
    type: "worship",
    title: "Closing Worship",
    duration: 15,
    notes: "2 songs: Here I Am to Worship, Blessed Be Your Name",
    assignedTo: "Worship Team",
    mediaFiles: ["closing-worship-slides.pptx"],
    cues: ["Lights up", "Final slides"],
  },
  {
    id: "6",
    type: "prayer",
    title: "Closing Prayer & Benediction",
    duration: 5,
    notes: "Prayer for the week ahead",
    assignedTo: "Pastor John",
    mediaFiles: [],
    cues: ["Soft background music"],
  },
]

const getItemIcon = (type: string) => {
  switch (type) {
    case "worship":
      return Music
    case "sermon":
      return Mic
    case "media":
      return Video
    case "announcement":
      return FileText
    case "prayer":
      return FileText
    case "transition":
      return Clock
    default:
      return FileText
  }
}

const getItemColor = (type: string) => {
  switch (type) {
    case "worship":
      return "bg-primary/10 text-primary border-primary/20"
    case "sermon":
      return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200"
    case "media":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200"
    case "announcement":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200"
    case "prayer":
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200"
    case "transition":
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200"
  }
}

export function RunSheetEditor({ runSheet, onBack }: RunSheetEditorProps) {
  const [items, setItems] = useState<RunSheetItem[]>(initialItems)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<string | null>(null)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
  }

  const addNewItem = () => {
    const newItem: RunSheetItem = {
      id: Date.now().toString(),
      type: "announcement",
      title: "New Item",
      duration: 5,
      notes: "",
      assignedTo: "",
      mediaFiles: [],
      cues: [],
    }
    setItems([...items, newItem])
    setEditingItem(newItem.id)
  }

  const updateItem = (id: string, updates: Partial<RunSheetItem>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const totalDuration = items.reduce((sum, item) => sum + item.duration, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Run Sheets
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-balance">{runSheet.title}</h1>
            <p className="text-muted-foreground">
              {runSheet.serviceDate} at {runSheet.serviceTime} • {totalDuration} minutes total
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Run Sheet Items */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Service Order</CardTitle>
                <Button onClick={addNewItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="run-sheet-items">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                      {items.map((item, index) => {
                        const ItemIcon = getItemIcon(item.type)
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`border rounded-lg p-4 bg-card ${snapshot.isDragging ? "shadow-lg" : ""}`}
                              >
                                <div className="flex items-center space-x-4">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="text-muted-foreground hover:text-foreground cursor-grab"
                                  >
                                    <GripVertical className="h-5 w-5" />
                                  </div>

                                  <div className="flex items-center space-x-3 flex-1">
                                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                      <ItemIcon className="h-5 w-5" />
                                    </div>

                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <h3 className="font-medium">{item.title}</h3>
                                        <Badge variant="outline" className={`text-xs ${getItemColor(item.type)}`}>
                                          {item.type}
                                        </Badge>
                                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                          <Clock className="h-3 w-3" />
                                          <span>{item.duration}min</span>
                                        </div>
                                      </div>
                                      {item.notes && (
                                        <p className="text-sm text-muted-foreground line-clamp-2">{item.notes}</p>
                                      )}
                                      {item.assignedTo && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                          Assigned to: {item.assignedTo}
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => setEditingItem(item.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => deleteItem(item.id)}
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Item
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Service Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Items:</span>
                <span className="text-sm font-medium">{items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Duration:</span>
                <span className="text-sm font-medium">{totalDuration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant="outline" className="text-xs">
                  {runSheet.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Worship Item
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Sermon Item
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Announcement
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Prayer Time
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Team Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Add notes for the team..." rows={4} className="resize-none" />
              <Button size="sm" className="mt-2">
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Item Edit Modal would go here */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md m-4">
            <CardHeader>
              <CardTitle>Edit Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Edit form would go here */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingItem(null)}>
                  Cancel
                </Button>
                <Button onClick={() => setEditingItem(null)}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
