"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, Users, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    occupation: "",
    technicalSkills: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = "Occupation is required"
    }

    if (!formData.technicalSkills.trim()) {
      newErrors.technicalSkills = "Please describe your technical skills"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application")
      }

      console.log("[v0] Application submitted successfully:", result.applicationId)
      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting application:", error)
      setErrors({ submit: "Failed to submit application. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-card/50 border-white/10 shadow-xl shadow-black/20 backdrop-blur-sm glow-border">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-green-500/30 glow-border">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-foreground">Application Submitted!</CardTitle>
            <CardDescription className="text-muted-foreground">
              Thank you for your interest in joining our media team.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 glow-border-subtle">
              <p className="text-foreground font-medium mb-2">Next Steps:</p>
              <p className="text-sm text-muted-foreground">
                Please come to the <strong className="text-foreground">media booth</strong> on the next Sunday for a
                physical meeting or assessment. We'll discuss your application and how you can contribute to our media
                ministry.
              </p>
            </div>
            <Link href="/">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-border">
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/20 shadow-[0_1px_0_0_rgba(255,255,255,0.1)] bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-border">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Join Media Team</h1>
          </div>
        </div>
      </header>

      {/* Application Form */}
      <div className="py-8 sm:py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-white/10 glow-border">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Apply to Join Our Media Team</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              We're excited about your interest in serving through media ministry. Please fill out the form below to get
              started.
            </p>
          </div>

          <Card className="bg-card/50 border-white/10 shadow-xl shadow-black/20 backdrop-blur-sm glow-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Application Form</CardTitle>
              <CardDescription className="text-muted-foreground">
                Tell us about yourself and your technical background
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`bg-background/50 border-white/20 text-foreground placeholder:text-muted-foreground focus:border-primary/50 glow-border-subtle ${
                      errors.fullName ? "border-red-500/50" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.fullName && <p className="text-sm text-red-400">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-foreground font-medium">
                    Phone Number (WhatsApp preferred) *
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="e.g., +1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className={`bg-background/50 border-white/20 text-foreground placeholder:text-muted-foreground focus:border-primary/50 glow-border-subtle ${
                      errors.phoneNumber ? "border-red-500/50" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.phoneNumber && <p className="text-sm text-red-400">{errors.phoneNumber}</p>}
                  <p className="text-xs text-muted-foreground">We prefer WhatsApp numbers for easier communication</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-foreground font-medium">
                    Occupation *
                  </Label>
                  <Input
                    id="occupation"
                    type="text"
                    placeholder="e.g., Software Engineer, Student, Teacher"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    className={`bg-background/50 border-white/20 text-foreground placeholder:text-muted-foreground focus:border-primary/50 glow-border-subtle ${
                      errors.occupation ? "border-red-500/50" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.occupation && <p className="text-sm text-red-400">{errors.occupation}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technicalSkills" className="text-foreground font-medium">
                    Technical Skills & Experience *
                  </Label>
                  <Textarea
                    id="technicalSkills"
                    placeholder="Please describe your technical skills, experience with audio/video equipment, software knowledge, or any relevant experience you have..."
                    value={formData.technicalSkills}
                    onChange={(e) => handleInputChange("technicalSkills", e.target.value)}
                    className={`bg-background/50 border-white/20 text-foreground placeholder:text-muted-foreground focus:border-primary/50 glow-border-subtle min-h-[120px] resize-none ${
                      errors.technicalSkills ? "border-red-500/50" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.technicalSkills && <p className="text-sm text-red-400">{errors.technicalSkills}</p>}
                  <p className="text-xs text-muted-foreground">
                    Include any experience with cameras, audio equipment, live streaming, video editing, lighting, etc.
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 glow-border-subtle">
                  <p className="text-sm text-foreground font-medium mb-2">What happens next?</p>
                  <p className="text-xs text-muted-foreground">
                    After submitting your application, you'll be invited to visit our media booth on the next Sunday for
                    a brief meeting and assessment. This is a great opportunity to meet the team and see our setup!
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 glow-border"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </Button>

                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 glow-border-subtle">
                    <p className="text-sm text-red-400">{errors.submit}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
