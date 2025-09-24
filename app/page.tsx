"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  FileImage,
  FileText,
  MessageSquare,
  Users,
  ArrowRight,
  CheckCircle,
  Shield,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const churchImages = [
    {
      src: "/church-worship-service-with-congregation-singing.jpg",
      alt: "Sunday Worship Service",
      title: "Sunday Worship",
    },
    {
      src: "/church-media-team-operating-cameras-and-sound-equi.jpg",
      alt: "Media Team in Action",
      title: "Media Team at Work",
    },
    {
      src: "/church-live-streaming-setup-with-multiple-cameras.jpg",
      alt: "Live Streaming Setup",
      title: "Live Streaming Ministry",
    },
    {
      src: "/placeholder-3vgyr.png",
      alt: "Youth Service",
      title: "Youth Ministry",
    },
    {
      src: "/placeholder-pc66f.png",
      alt: "Baptism Service",
      title: "Special Events",
    },
    {
      src: "/church-christmas-service-with-beautiful-stage-ligh.jpg",
      alt: "Christmas Service",
      title: "Holiday Services",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % churchImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [churchImages.length])

  const handleNavigation = (path: string) => {
    setIsLoading(path)
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(null), 500)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % churchImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + churchImages.length) % churchImages.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/20 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] bg-card/30 backdrop-blur-sm sticky top-0 z-50 safe-area-inset-top">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-border">
              <FileImage className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground">Church Media System</h1>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link href="/team" onClick={() => handleNavigation("/team")}>
              <Button
                variant="ghost"
                className="text-foreground hover:bg-white/10 glow-border-subtle text-xs sm:text-base px-2 sm:px-4 mobile-btn"
                disabled={isLoading === "/team"}
              >
                {isLoading === "/team" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="hidden sm:inline">View Team</span>
                <span className="sm:hidden">Team</span>
              </Button>
            </Link>
            <Link href="/auth" onClick={() => handleNavigation("/auth")}>
              <Button
                variant="ghost"
                className="text-foreground hover:bg-white/10 text-xs sm:text-base px-2 sm:px-4 mobile-btn"
                disabled={isLoading === "/auth"}
              >
                {isLoading === "/auth" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="hidden sm:inline">Sign In</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </Link>
            <Link href="/auth" onClick={() => handleNavigation("/auth")}>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 glow-border text-xs sm:text-base px-2 sm:px-4 mobile-btn"
                disabled={isLoading === "/auth"}
              >
                {isLoading === "/auth" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-20 px-4 text-center hero-gradient safe-area-inset-x">
        <div className="container mx-auto max-w-4xl">
          <Badge variant="outline" className="mb-4 sm:mb-6 border-primary/30 bg-primary/10 text-primary glow-border">
            Church Media Management
          </Badge>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-balance mb-4 sm:mb-6 text-foreground leading-tight">
            Streamline Your Church Media Operations
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground text-balance mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            A comprehensive solution for managing your church's media team, scheduling, resources, and service planning
            all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/team" onClick={() => handleNavigation("/team")}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 glow-border w-full sm:w-auto mobile-btn"
                disabled={isLoading === "/team"}
              >
                {isLoading === "/team" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                View Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-foreground bg-transparent glow-border w-full sm:w-auto mobile-btn"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 px-4 bg-card/20 safe-area-inset-x">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-4">Our Church in Action</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Experience the vibrant worship and media ministry that brings our community together every week.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl shadow-black/30 glow-border mx-2 sm:mx-0">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {churchImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-48 sm:h-80 md:h-96 object-cover mobile-img"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6">
                      <h3 className="text-white text-sm sm:text-xl font-bold mb-1">{image.title}</h3>
                      <p className="text-white/80 text-xs sm:text-sm">{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 backdrop-blur-sm glow-border"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 backdrop-blur-sm glow-border"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
              {churchImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-primary w-6 sm:w-8" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-8 sm:py-20 px-4 safe-area-inset-x">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 px-2">
              Everything Your Media Team Needs
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Powerful tools designed specifically for church media departments to enhance collaboration and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
            {[
              {
                icon: Calendar,
                title: "Team Scheduling",
                description:
                  "Coordinate your media team with intelligent scheduling, availability tracking, and automated notifications.",
                features: ["Calendar & List Views", "Role-based Assignment", "Confirmation Tracking"],
              },
              {
                icon: FileImage,
                title: "Media Management",
                description:
                  "Organize and access all your media files with advanced search, categorization, and preview capabilities.",
                features: ["File Upload & Storage", "Smart Categorization", "Preview & Download"],
              },
              {
                icon: FileText,
                title: "Service Planning",
                description:
                  "Create detailed run sheets with drag-and-drop editing, team assignments, and real-time collaboration.",
                features: ["Drag-and-Drop Editor", "Team Collaboration", "Export & Share"],
              },
              {
                icon: Users,
                title: "Team Management",
                description: "Manage your media team with role-based access control and comprehensive member profiles.",
                features: ["Role-based Access", "Member Profiles", "Task Assignment"],
              },
              {
                icon: MessageSquare,
                title: "Communication",
                description: "Keep your team informed with announcements, notifications, and integrated messaging.",
                features: ["Team Announcements", "Push Notifications", "Priority Messaging"],
              },
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Built with security in mind, featuring user authentication and data protection.",
                features: ["User Authentication", "Data Security", "Backup & Recovery"],
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 border-white/10 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 hover:border-white/20 backdrop-blur-sm glow-border hover:glow-border-strong mobile-card"
              >
                <CardHeader className="pb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 ring-1 ring-white/10 glow-border">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground text-base sm:text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-20 px-4 bg-card/30 safe-area-inset-x">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-12 px-2">
            Trusted by Media Teams Everywhere
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 px-2 sm:px-0">
            {[
              { number: "500+", label: "Churches Using", icon: Users },
              { number: "10k+", label: "Services Planned", icon: Calendar },
              { number: "50k+", label: "Media Files Managed", icon: FileImage },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 ring-1 ring-white/10 glow-border">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div className="text-xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-20 px-4 text-center safe-area-inset-x">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2">
            Ready to Transform Your Media Ministry?
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-2">
            Join hundreds of churches already using our platform to streamline their media operations.
          </p>
          <Link href="/auth" onClick={() => handleNavigation("/auth")}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 mb-6 sm:mb-8 glow-border w-full sm:w-auto mobile-btn mx-2 sm:mx-0"
              disabled={isLoading === "/auth"}
            >
              {isLoading === "/auth" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Join Media Team CTA */}
      <section className="py-8 sm:py-16 px-4 bg-gradient-to-r from-primary/20 to-cyan-500/20 border-t border-white/10 safe-area-inset-x">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/10 shadow-xl shadow-black/20 glow-border mx-2 sm:mx-0">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 ring-1 ring-white/10 glow-border">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
              Want to Join the Media Team?
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Are you passionate about using technology to enhance worship? Join our media team and help create
              meaningful experiences for our congregation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" onClick={() => handleNavigation("/apply")}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 glow-border w-full sm:w-auto mobile-btn"
                  disabled={isLoading === "/apply"}
                >
                  {isLoading === "/apply" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <span className="hidden sm:inline">Apply to Join Media Team</span>
                  <span className="sm:hidden">Apply Now</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/apply" onClick={() => handleNavigation("/apply")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 text-foreground bg-transparent glow-border w-full sm:w-auto mobile-btn"
                  disabled={isLoading === "/apply"}
                >
                  {isLoading === "/apply" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Join Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-card/30 py-4 sm:py-8 px-4 safe-area-inset-bottom">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded flex items-center justify-center glow-border">
                <FileImage className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground text-sm sm:text-base">Church Media System</span>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground text-center">© 2024 Church Media System. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
