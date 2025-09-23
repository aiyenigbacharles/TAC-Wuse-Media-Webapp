"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Download,
  Share2,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag,
  FileImage,
  FileVideo,
  FileText,
  Music,
} from "lucide-react"

interface MediaFile {
  id: number
  name: string
  type: string
  fileType: string
  size: string
  uploadedBy: string
  uploadDate: string
  tags: string[]
  category: string
  thumbnail: string
  url: string
}

interface MediaPreviewDialogProps {
  file: MediaFile | null
  onClose: () => void
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "image":
      return FileImage
    case "video":
      return FileVideo
    case "audio":
      return Music
    case "document":
    case "presentation":
      return FileText
    default:
      return FileText
  }
}

const getFileTypeColor = (type: string) => {
  switch (type) {
    case "image":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "video":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "audio":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "document":
    case "presentation":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "service":
      return "bg-primary/10 text-primary border-primary/20"
    case "youth":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200"
    case "prayer":
      return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200"
    case "sermon":
      return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200"
    case "branding":
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200"
  }
}

export function MediaPreviewDialog({ file, onClose }: MediaPreviewDialogProps) {
  if (!file) return null

  const FileIcon = getFileIcon(file.type)

  const renderPreview = () => {
    switch (file.type) {
      case "image":
        return (
          <img
            src={file.thumbnail || "/placeholder.svg"}
            alt={file.name}
            className="w-full h-auto max-h-96 object-contain rounded-lg"
          />
        )
      case "video":
        return (
          <video controls className="w-full h-auto max-h-96 rounded-lg" poster={file.thumbnail}>
            <source src={file.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      case "audio":
        return (
          <div className="flex flex-col items-center space-y-4 py-8">
            <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Music className="h-12 w-12 text-primary" />
            </div>
            <audio controls className="w-full max-w-md">
              <source src={file.url} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center space-y-4 py-12">
            <div className="h-24 w-24 bg-muted rounded-lg flex items-center justify-center">
              <FileIcon className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Preview not available for this file type</p>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download to View
            </Button>
          </div>
        )
    }
  }

  return (
    <Dialog open={!!file} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileIcon className="h-5 w-5" />
            <span>{file.name}</span>
          </DialogTitle>
          <DialogDescription>
            {file.type} • {file.fileType.toUpperCase()} • {file.size}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-muted/30 rounded-lg p-4">{renderPreview()}</div>

          {/* File Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">File Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Uploaded by {file.uploadedBy}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{file.uploadDate}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Categories & Tags</h3>
                <div className="space-y-2">
                  <Badge variant="outline" className={getCategoryColor(file.category)}>
                    {file.category}
                  </Badge>
                  <div className="flex flex-wrap gap-1">
                    {file.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">File Type</h3>
                <Badge variant="outline" className={getFileTypeColor(file.type)}>
                  {file.fileType.toUpperCase()}
                </Badge>
              </div>

              <div>
                <h3 className="font-medium mb-2">Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
