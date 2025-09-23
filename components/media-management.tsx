"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Upload,
  Grid3X3,
  List,
  FileImage,
  FileVideo,
  FileText,
  Music,
  Download,
  Share2,
  MoreHorizontal,
  Eye,
  Trash2,
  Edit,
  Calendar,
  User,
  Tag,
} from "lucide-react"
import { UploadMediaDialog } from "@/components/upload-media-dialog"
import { MediaPreviewDialog } from "@/components/media-preview-dialog"

// Mock media data
const mediaFiles = [
  {
    id: 1,
    name: "Sunday Service Slides - Jan 21",
    type: "presentation",
    fileType: "pptx",
    size: "2.4 MB",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2024-01-20",
    tags: ["sunday", "worship", "slides"],
    category: "service",
    thumbnail: "/presentation-slides.png",
    url: "/media/slides-jan-21.pptx",
  },
  {
    id: 2,
    name: "Worship Background Video",
    type: "video",
    fileType: "mp4",
    size: "45.2 MB",
    uploadedBy: "John Smith",
    uploadDate: "2024-01-19",
    tags: ["worship", "background", "loop"],
    category: "service",
    thumbnail: "/worship-background-video.jpg",
    url: "/media/worship-bg.mp4",
  },
  {
    id: 3,
    name: "Church Logo - High Res",
    type: "image",
    fileType: "png",
    size: "1.8 MB",
    uploadedBy: "Mike Davis",
    uploadDate: "2024-01-18",
    tags: ["logo", "branding", "high-res"],
    category: "branding",
    thumbnail: "/church-logo.png",
    url: "/media/church-logo.png",
  },
  {
    id: 4,
    name: "Youth Event Promo",
    type: "image",
    fileType: "jpg",
    size: "3.1 MB",
    uploadedBy: "Emily Wilson",
    uploadDate: "2024-01-17",
    tags: ["youth", "promo", "event"],
    category: "youth",
    thumbnail: "/youth-event-promo.jpg",
    url: "/media/youth-promo.jpg",
  },
  {
    id: 5,
    name: "Sermon Audio - Pastor Mark",
    type: "audio",
    fileType: "mp3",
    size: "28.5 MB",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2024-01-16",
    tags: ["sermon", "audio", "pastor-mark"],
    category: "sermon",
    thumbnail: "/audio-waveform.png",
    url: "/media/sermon-audio.mp3",
  },
  {
    id: 6,
    name: "Prayer Meeting Notes",
    type: "document",
    fileType: "pdf",
    size: "0.8 MB",
    uploadedBy: "John Smith",
    uploadDate: "2024-01-15",
    tags: ["prayer", "notes", "meeting"],
    category: "prayer",
    thumbnail: "/document-pages.jpg",
    url: "/media/prayer-notes.pdf",
  },
]

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

export function MediaManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [previewFile, setPreviewFile] = useState<(typeof mediaFiles)[0] | null>(null)

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || file.category === categoryFilter
    const matchesType = typeFilter === "all" || file.type === typeFilter
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-balance">Media Library</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage your church media files and resources</p>
        </div>
        <UploadMediaDialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <Button className="mobile-btn">
            <Upload className="mr-1 sm:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Upload Media</span>
            <span className="sm:hidden">Upload</span>
          </Button>
        </UploadMediaDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Files</CardTitle>
            <FileImage className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold">{mediaFiles.length}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Images</CardTitle>
            <FileImage className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold">{mediaFiles.filter((f) => f.type === "image").length}</div>
            <p className="text-xs text-muted-foreground">Photos and graphics</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Videos</CardTitle>
            <FileVideo className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold">{mediaFiles.filter((f) => f.type === "video").length}</div>
            <p className="text-xs text-muted-foreground">Video content</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Storage Used</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-xl sm:text-2xl font-bold">82.8 MB</div>
            <p className="text-xs text-muted-foreground">Of 1 GB available</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-3 sm:gap-4 items-stretch sm:items-center sm:flex-row justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search media files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 mobile-btn"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 mobile-btn">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="youth">Youth</SelectItem>
                <SelectItem value="prayer">Prayer</SelectItem>
                <SelectItem value="sermon">Sermon</SelectItem>
                <SelectItem value="branding">Branding</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48 mobile-btn">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="presentation">Presentations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2 justify-center sm:justify-start">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")} className="mobile-btn">
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")} className="mobile-btn">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Media Files */}
      {viewMode === "grid" ? (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file.type)
            return (
              <Card key={file.id} className="overflow-hidden hover:shadow-lg transition-shadow mobile-card">
                <div className="aspect-video relative bg-muted">
                  <img
                    src={file.thumbnail || "/placeholder.svg"}
                    alt={file.name}
                    className="w-full h-full object-cover mobile-img"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.nextElementSibling?.classList.remove("hidden")
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                    <FileIcon className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                          <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setPreviewFile(file)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-3 sm:p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-xs sm:text-sm line-clamp-2">{file.name}</h3>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`text-xs ${getFileTypeColor(file.type)}`}>
                        {file.fileType.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(file.category)}`}>
                      {file.category}
                    </Badge>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span className="truncate">{file.uploadedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{file.uploadDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {file.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {file.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{file.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type)
                return (
                  <div key={file.id} className="flex items-center justify-between p-3 sm:p-4 hover:bg-accent/50">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-muted flex items-center justify-center">
                        <FileIcon className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
                      </div>
                      <div className="space-y-1 flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base truncate">{file.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span className="truncate">{file.uploadedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{file.uploadDate}</span>
                          </div>
                          <span>{file.size}</span>
                        </div>
                        <div className="flex items-center space-x-2 flex-wrap gap-1">
                          <Badge variant="outline" className={`text-xs ${getFileTypeColor(file.type)}`}>
                            {file.fileType.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getCategoryColor(file.category)}`}>
                            {file.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Tag className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">
                              {file.tags.slice(0, 2).join(", ")}
                              {file.tags.length > 2 && ` +${file.tags.length - 2}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="mobile-btn">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setPreviewFile(file)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
            <FileImage className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4 text-center text-sm sm:text-base">No media files found matching your criteria</p>
            <Button
              variant="outline"
              className="mobile-btn"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setTypeFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      <MediaPreviewDialog file={previewFile} onClose={() => setPreviewFile(null)} />
    </div>
  )
}
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="service">Service</SelectItem>
              <SelectItem value="youth">Youth</SelectItem>
              <SelectItem value="prayer">Prayer</SelectItem>
              <SelectItem value="sermon">Sermon</SelectItem>
              <SelectItem value="branding">Branding</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
              <SelectItem value="presentation">Presentations</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Media Files */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file.type)
            return (
              <Card key={file.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative bg-muted">
                  <img
                    src={file.thumbnail || "/placeholder.svg"}
                    alt={file.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.nextElementSibling?.classList.remove("hidden")
                    }}
                  />
                  <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                    <FileIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setPreviewFile(file)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2">{file.name}</h3>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`text-xs ${getFileTypeColor(file.type)}`}>
                        {file.fileType.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(file.category)}`}>
                      {file.category}
                    </Badge>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{file.uploadedBy}</span>
                      <Calendar className="h-3 w-3" />
                      <span>{file.uploadDate}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {file.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {file.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{file.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type)
                return (
                  <div key={file.id} className="flex items-center justify-between p-4 hover:bg-accent/50">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                        <FileIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{file.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{file.uploadedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{file.uploadDate}</span>
                          </div>
                          <span>{file.size}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`text-xs ${getFileTypeColor(file.type)}`}>
                            {file.fileType.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${getCategoryColor(file.category)}`}>
                            {file.category}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <Tag className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">
                              {file.tags.slice(0, 2).join(", ")}
                              {file.tags.length > 2 && ` +${file.tags.length - 2}`}
                            </span>
                          </div>
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
                        <DropdownMenuItem onClick={() => setPreviewFile(file)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileImage className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No media files found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setCategoryFilter("all")
                setTypeFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      <MediaPreviewDialog file={previewFile} onClose={() => setPreviewFile(null)} />
    </div>
  )
}
