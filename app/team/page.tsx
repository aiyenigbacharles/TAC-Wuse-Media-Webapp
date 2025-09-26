"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Mail, Phone, Calendar, Users, FileImage } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Media Lead",
    email: "sarah@church.com",
    phone: "+1 (555) 123-4567",
    avatar: "/professional-woman-media-director.jpg",
    specialties: ["Video Production", "Live Streaming", "Team Coordination"],
    joinDate: "2022-01-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Audio Engineer",
    email: "michael@church.com",
    phone: "+1 (555) 234-5678",
    avatar: "/professional-man-audio-engineer.jpg",
    specialties: ["Sound Mixing", "Equipment Setup", "Recording"],
    joinDate: "2022-03-20",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Graphics Designer",
    email: "emily@church.com",
    phone: "+1 (555) 345-6789",
    avatar: "/creative-woman-graphic-designer.jpg",
    specialties: ["Motion Graphics", "Slide Design", "Branding"],
    joinDate: "2022-06-10",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Camera Operator",
    email: "david@church.com",
    phone: "+1 (555) 456-7890",
    avatar: "/professional-man-camera-operator.jpg",
    specialties: ["Camera Operation", "Video Editing", "Photography"],
    joinDate: "2023-01-08",
  },
  {
    id: 5,
    name: "Jessica Thompson",
    role: "Lighting Technician",
    email: "jessica@church.com",
    phone: "+1 (555) 567-8901",
    avatar: "/professional-woman-lighting-technician.jpg",
    specialties: ["Stage Lighting", "LED Systems", "Atmosphere Design"],
    joinDate: "2023-02-14",
  },
  {
    id: 6,
    name: "Marcus Williams",
    role: "Live Stream Director",
    email: "marcus@church.com",
    phone: "+1 (555) 678-9012",
    avatar: "/professional-man-live-stream-director.jpg",
    specialties: ["Multi-Camera Direction", "Online Engagement", "Broadcast Quality"],
    joinDate: "2023-04-22",
  },
  {
    id: 7,
    name: "Priya Patel",
    role: "Social Media Manager",
    email: "priya@church.com",
    phone: "+1 (555) 789-0123",
    avatar: "/professional-woman-social-media-manager.jpg",
    specialties: ["Content Creation", "Community Management", "Digital Outreach"],
    joinDate: "2023-06-05",
  },
  {
    id: 8,
    name: "James Anderson",
    role: "Video Editor",
    email: "james@church.com",
    phone: "+1 (555) 890-1234",
    avatar: "/professional-man-video-editor.jpg",
    specialties: ["Post Production", "Color Grading", "Motion Graphics"],
    joinDate: "2023-08-12",
  },
  {
    id: 9,
    name: "Lisa Chang",
    role: "Projection Specialist",
    email: "lisa@church.com",
    phone: "+1 (555) 901-2345",
    avatar: "/professional-woman-projection-specialist.jpg",
    specialties: ["ProPresenter", "Slide Coordination", "Visual Worship"],
    joinDate: "2023-09-18",
  },
  {
    id: 10,
    name: "Robert Martinez",
    role: "Technical Support",
    email: "robert@church.com",
    phone: "+1 (555) 012-3456",
    avatar: "/placeholder.svg?height=80&width=80",
    specialties: ["Equipment Maintenance", "Troubleshooting", "Setup Coordination"],
    joinDate: "2023-11-03",
  },
  {
    id: 11,
    name: "Amanda Foster",
    role: "Volunteer Coordinator",
    email: "amanda@church.com",
    phone: "+1 (555) 123-0987",
    avatar: "/placeholder.svg?height=80&width=80",
    specialties: ["Team Training", "Scheduling", "New Member Integration"],
    joinDate: "2024-01-20",
  },
]

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Media Lead":
      return "bg-primary/20 text-primary border-primary/30"
    case "Audio Engineer":
      return "bg-blue-500/20 text-blue-300 border-blue-500/30"
    case "Graphics Designer":
      return "bg-purple-500/20 text-purple-300 border-purple-500/30"
    case "Camera Operator":
      return "bg-green-500/20 text-green-300 border-green-500/30"
    case "Lighting Technician":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
    case "Live Stream Director":
      return "bg-red-500/20 text-red-300 border-red-500/30"
    case "Social Media Manager":
      return "bg-pink-500/20 text-pink-300 border-pink-500/30"
    case "Video Editor":
      return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
    case "Projection Specialist":
      return "bg-teal-500/20 text-teal-300 border-teal-500/30"
    case "Technical Support":
      return "bg-orange-500/20 text-orange-300 border-orange-500/30"
    case "Volunteer Coordinator":
      return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
    default:
      return "bg-muted/20 text-muted-foreground border-border"
  }
}

export default function TeamPage() {
  return (
    <div className="min-h-screen space-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border border-white/20">
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FileImage className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Our Media Team</h1>
            </div>
          </div>
          <Link href="/apply">
            <Button className="neon-button text-white">
              <span className="hidden sm:inline">Join Our Team</span>
              <span className="sm:hidden">Join</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl float-animation" />
        <div className="container mx-auto max-w-4xl">
          <Badge variant="outline" className="mb-6 border-blue-500/30 bg-blue-500/10 text-blue-400 neon-border">
            Meet Our Team
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white px-2">
            <span className="gradient-text">11 Dedicated</span> Media Professionals
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-2 leading-relaxed">
            Our passionate team of media professionals work together to create meaningful worship experiences through
            technology and creativity.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <CardHeader className="text-center pb-4">
                  <Avatar className="w-16 h-16 mx-auto mb-3 ring-2 ring-blue-500/30">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback className="bg-blue-500/10 text-blue-400 text-sm">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-white text-lg">{member.name}</CardTitle>
                  <Badge variant="outline" className={`mx-auto text-xs ${getRoleBadgeColor(member.role)}`}>
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-start text-xs text-gray-300">
                      <Mail className="w-3 h-3 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-start text-xs text-gray-300">
                      <Phone className="w-3 h-3 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="truncate">{member.phone}</span>
                    </div>
                    <div className="flex items-start text-xs text-gray-300">
                      <Calendar className="w-3 h-3 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                      Joined{" "}
                      {new Date(member.joinDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-white mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-1">
                      {member.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/20 px-2 py-0"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-card rounded-2xl p-8 neon-border">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Interested in Joining Us?
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              We're always looking for passionate individuals to join our media team. Whether you're experienced or just
              starting out, we'd love to have you contribute to our ministry.
            </p>
            <Link href="/apply">
              <Button
                size="lg"
                className="neon-button text-white px-8 py-4"
              >
                Apply to Join Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <FileImage className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-white">Church Media System</span>
            </div>
            <div className="text-sm text-gray-400 text-center">© 2024 Church Media System. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
