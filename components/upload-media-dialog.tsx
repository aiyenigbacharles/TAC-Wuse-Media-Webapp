"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, FileImage, FileVideo, FileText, Music, Plus } from "lucide-react"

interface UploadMediaDialogProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FileUpload {
  file: File
  preview?: string
  name: string
  category: string
  tags: string[]
  description: string
}

export function UploadMediaDialog({ children, open, onOpenChange }: UploadMediaDialogProps) {
  const [files, setFiles] = useState<FileUpload[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [newTag, setNewTag] = useState("")

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return FileImage
    if (type.startsWith("video/")) return FileVideo
    if (type.startsWith("audio/")) return Music
    return FileText
  }

  const getFileType = (type: string) => {
    if (type.startsWith("image/")) return "image"
    if (type.startsWith("video/")) return "video"
    if (type.startsWith("audio/")) return "audio"
    return "document"
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = (fileList: File[]) => {
    const newFiles: FileUpload[] = fileList.map((file) => {
      const fileUpload: FileUpload = {
        file,
        name: file.name,
        category: "service",
        tags: [],
        description: "",
      }

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFiles((prev) => prev.map((f) => (f.file === file ? { ...f, preview: e.target?.result as string } : f)))
        }
        reader.readAsDataURL(file)
      }

      return fileUpload
    })

    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const updateFile = (index: number, updates: Partial<FileUpload>) => {
    setFiles((prev) => prev.map((file, i) => (i === index ? { ...file, ...updates } : file)))
  }

  const addTag = (index: number, tag: string) => {
    if (tag.trim() && !files[index].tags.includes(tag.trim())) {
      updateFile(index, {
        tags: [...files[index].tags, tag.trim()],
      })
    }
  }

  const removeTag = (index: number, tagToRemove: string) => {
    updateFile(index, {
      tags: files[index].tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSubmit = () => {
    // TODO: Implement file upload logic
    console.log("Uploading files:", files)
    onOpenChange(false)
    setFiles([])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Upload Media Files</DialogTitle>
          <DialogDescription className="text-sm">Upload images, videos, audio files, and documents to your media library</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* File Drop Zone */}
          <Card
            className={`border-2 border-dashed transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
              <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
              <p className="text-base sm:text-lg font-medium mb-2 text-center">Drop files here or click to browse</p>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 text-center">
                Supports images, videos, audio, and documents up to 50MB each
              </p>
              <Input
                type="file"
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" asChild>
                <Button variant="outline" className="mobile-btn">
                  <Upload className="mr-1 sm:mr-2 h-4 w-4" />
                  Choose Files
                </Button>
              </Label>
            </CardContent>
          </Card>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-medium">Files to Upload ({files.length})</h3>
              <div className="space-y-4">
                {files.map((fileUpload, index) => {
                  const FileIcon = getFileIcon(fileUpload.file.type)
                  return (
                    <Card key={index} className="mobile-card">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          {/* File Preview/Icon */}
                          <div className="flex-shrink-0">
                            {fileUpload.preview ? (
                              <img
                                src={fileUpload.preview || "/placeholder.svg"}
                                alt={fileUpload.name}
                                className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg mobile-img"
                              />
                            ) : (
                              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-muted rounded-lg flex items-center justify-center">
                                <FileIcon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>

                          {/* File Details */}
                          <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm sm:text-base truncate">{fileUpload.file.name}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  {getFileType(fileUpload.file.type)} • {formatFileSize(fileUpload.file.size)}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mobile-btn"
                                onClick={() => removeFile(index)}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`name-${index}`}>Display Name</Label>
                                <Input
                                  id={`name-${index}`}
                                  value={fileUpload.name}
                                  onChange={(e) => updateFile(index, { name: e.target.value })}
                                  className="mobile-btn"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`category-${index}`}>Category</Label>
                                <Select
                                  value={fileUpload.category}
                                  onValueChange={(value) => updateFile(index, { category: value })}
                                >
                                  <SelectTrigger className="mobile-btn">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="service">Service</SelectItem>
                                    <SelectItem value="youth">Youth</SelectItem>
                                    <SelectItem value="prayer">Prayer</SelectItem>
                                    <SelectItem value="sermon">Sermon</SelectItem>
                                    <SelectItem value="branding">Branding</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Tags</Label>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {fileUpload.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-auto p-0 ml-1 hover:bg-transparent"
                                      onClick={() => removeTag(index, tag)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex space-x-2">
                                <Input
                                  placeholder="Add tag..."
                                  className="mobile-btn"
                                  value={newTag}
                                  onChange={(e) => setNewTag(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      addTag(index, newTag)
                                      setNewTag("")
                                    }
                                  }}
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mobile-btn"
                                  onClick={() => {
                                    addTag(index, newTag)
                                    setNewTag("")
                                  }}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                              <Textarea
                                id={`description-${index}`}
                                placeholder="Add a description for this file..."
                                value={fileUpload.description}
                                onChange={(e) => updateFile(index, { description: e.target.value })}
                                rows={2}
                                className="mobile-btn"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mobile-btn">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={files.length === 0} className="mobile-btn">
            Upload {files.length} {files.length === 1 ? "File" : "Files"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
