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
  Play,
  Star,
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
    setTimeout(() => setIsLoading(null), 500)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % churchImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + churchImages.length) % churchImages.length)
  }

  return (
    <div className="min-h-screen space-background">
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileImage className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Church Media</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/team" className="text-gray-300 hover:text-white transition-colors">
              Our Team
            </Link>
            <Link href="/auth" className="text-gray-300 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/apply" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <span className="text-gray-300">(555) 123-4567</span>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth" onClick={() => handleNavigation("/auth")}>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 border border-white/20"
                disabled={isLoading === "/auth"}
              >
                {isLoading === "/auth" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </Link>
            <Link href="/auth" onClick={() => handleNavigation("/auth")}>
              <Button
                className="neon-button text-white"
                disabled={isLoading === "/auth"}
              >
                {isLoading === "/auth" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                GET STARTED
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="gradient-text">
              You can't afford to choose the wrong
            </span>
            <br />
            <span className="text-white">media system</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Because if you do? It means tens of thousands of dollars down the drain. Months of 
            lost opportunity. And starting over from scratch.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/auth" onClick={() => handleNavigation("/auth")}>
              <Button
                size="lg"
                className="neon-button text-white px-8 py-4 text-lg"
                disabled={isLoading === "/auth"}
              >
                {isLoading === "/auth" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white bg-transparent px-8 py-4 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="text-center mb-12">
            <p className="text-gray-400 mb-6">Trusted by churches nationwide for 5+ years</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-gray-500 font-semibold">500+ Churches</div>
              <div className="text-gray-500 font-semibold">10k+ Services</div>
              <div className="text-gray-500 font-semibold">50k+ Media Files</div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }} />
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              If you haven't had a bad experience with a 
              <span className="gradient-text"> media system</span>, consider yourself lucky...
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              If you have, this might sound familiar:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              "We've been working together for months, and my system still has issues.",
              "My setup looks good, but I'm not seeing any results.",
              "I have questions, but they charge me for every email I send.",
              "The budget keeps growing. I feel like I'm being taken advantage of.",
              "They do exactly what I ask... without thinking about whether it will actually work.",
              "I can't understand all the tech jargon. It feels like we're speaking different languages."
            ].map((quote, index) => (
              <div key={index} className="glass-card p-6 rounded-xl text-center">
                <p className="text-gray-200 italic">"{quote}"</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 italic">
              Nearly 65% of churches surveyed had a negative experience before finding the right system.
              <br />
              It took a lot of work to rebuild that trust.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-gray-400 mb-6">We work with:</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Users,
                title: "Small Churches",
                description: "Tailored solutions for growing congregations",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Calendar,
                title: "Multi-Campus",
                description: "Coordinated systems across multiple locations",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: FileText,
                title: "Traditional",
                description: "Classic worship with modern technology",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: MessageSquare,
                title: "Contemporary",
                description: "Dynamic worship experiences",
                gradient: "from-green-500 to-blue-500"
              },
              {
                icon: Shield,
                title: "Megachurches",
                description: "Enterprise-level media solutions",
                gradient: "from-red-500 to-purple-500"
              },
              {
                icon: CheckCircle,
                title: "Non-Profits",
                description: "Budget-conscious quality solutions",
                gradient: "from-cyan-500 to-blue-500"
              }
            ].map((service, index) => (
              <Card key={index} className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${service.gradient} p-0.5`}>
                    <div className="w-full h-full bg-black/50 rounded-full flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              From simple setups to 
              <span className="gradient-text"> complicated systems</span>,
              <br />
              you're in good hands
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Other churches come to us when their projects are too complex to handle in-house. 
              We've been crafting perfect-fit solutions for our clients since 2019.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white bg-transparent px-8 py-4 text-lg"
            >
              CHECK OUT OUR WORK
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything Your <span className="gradient-text">Media Team</span> Needs
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful tools designed specifically for church media departments to enhance collaboration and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Team Scheduling",
                description: "Coordinate your media team with intelligent scheduling, availability tracking, and automated notifications.",
                features: ["Calendar & List Views", "Role-based Assignment", "Confirmation Tracking"],
              },
              {
                icon: FileImage,
                title: "Media Management",
                description: "Organize and access all your media files with advanced search, categorization, and preview capabilities.",
                features: ["File Upload & Storage", "Smart Categorization", "Preview & Download"],
              },
              {
                icon: FileText,
                title: "Service Planning",
                description: "Create detailed run sheets with drag-and-drop editing, team assignments, and real-time collaboration.",
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
                className="glass-card border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
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

      {/* Church Gallery Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Church in Action</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experience the vibrant worship and media ministry that brings our community together every week.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl neon-border">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {churchImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <h3 className="text-white text-xl font-bold mb-1">{image.title}</h3>
                      <p className="text-white/80 text-sm">{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {churchImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-blue-500 w-8" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "500+", label: "Churches Using", icon: Users },
              { number: "10k+", label: "Services Planned", icon: Calendar },
              { number: "50k+", label: "Media Files Managed", icon: FileImage },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your <span className="gradient-text">Media Ministry</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of churches already using our platform to streamline their media operations.
          </p>
          <Link href="/auth" onClick={() => handleNavigation("/auth")}>
            <Button
              size="lg"
              className="neon-button text-white px-8 py-4 text-lg mb-8"
              disabled={isLoading === "/auth"}
            >
              {isLoading === "/auth" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Join Media Team CTA */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-card rounded-2xl p-8 neon-border">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to Join the Media Team?
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Are you passionate about using technology to enhance worship? Join our media team and help create
              meaningful experiences for our congregation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" onClick={() => handleNavigation("/apply")}>
                <Button
                  size="lg"
                  className="neon-button text-white px-8 py-4"
                  disabled={isLoading === "/apply"}
                >
                  {isLoading === "/apply" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Apply to Join Media Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/team" onClick={() => handleNavigation("/team")}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 text-white bg-transparent px-8 py-4"
                  disabled={isLoading === "/team"}
                >
                  {isLoading === "/team" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Meet Our Team
                </Button>
              </Link>
            </div>
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