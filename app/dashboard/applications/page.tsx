"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Phone, Briefcase, Code, Calendar, Loader2 } from "lucide-react"

interface Application {
  id: string
  full_name: string
  phone_number: string
  occupation: string
  technical_skills: string
  created_at: string
  status: "pending" | "under_review" | "approved" | "rejected"
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("pending")

  useEffect(() => {
    fetchApplications()
  }, [filter])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/applications?status=${filter}`)
      const result = await response.json()

      if (result.success) {
        setApplications(result.applications)
      }
    } catch (error) {
      console.error("[v0] Error fetching applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "under_review":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Media Team Applications</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Review and manage applications to join the media team</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {["pending", "under_review", "approved", "rejected", "all"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            className="mobile-btn text-xs sm:text-sm"
            onClick={() => setFilter(status)}
          >
            <span className="capitalize">{status.replace("_", " ")}</span>
          </Button>
        ))}
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-primary" />
        </div>
      ) : applications.length === 0 ? (
        <Card className="bg-card/50 border-white/10 glow-border mobile-card">
          <CardContent className="py-8 sm:py-12 text-center">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-sm sm:text-base">No applications found for the selected filter.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <Card key={application.id} className="bg-card/50 border-white/10 glow-border mobile-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base sm:text-lg text-foreground">{application.full_name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1 text-xs sm:text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(application.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(application.status)} glow-border-subtle`}>
                    {application.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm text-foreground truncate">{application.phone_number}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm text-foreground truncate">{application.occupation}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs sm:text-sm font-medium text-foreground">Technical Skills:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground bg-background/50 rounded-lg p-3 border border-white/10 leading-relaxed">
                    {application.technical_skills}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
