"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const handleEmailAuth = async (signUp: boolean) => {
    setIsLoading(true)
    setError("")

    if (!email || !password || (signUp && !fullName)) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    try {
      if (signUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
            data: {
              full_name: fullName,
            },
          },
        })
        if (error) throw error

        // Show success message for sign up
        setError("")
        alert("Check your email to confirm your account!")
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error

        router.push("/dashboard")
      }
    } catch (error: any) {
      setError(error.message || "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-600/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }} />
      <div className="w-full max-w-md">
        <div className="mb-4 sm:mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 border border-white/20 mb-4 mobile-btn">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
        </div>

        <Card className="glass-card border-white/10 neon-border mobile-card relative z-10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl text-white">{isSignUp ? "Create Account" : "Welcome Back"}</CardTitle>
            <CardDescription className="text-gray-300 text-sm leading-relaxed">
              {isSignUp ? "Create your account to get started" : "Sign in to access your church media dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm leading-relaxed">
                {error}
              </div>
            )}

            <div className="space-y-4 mobile-form">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500/50 mobile-btn"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@church.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500/50 mobile-btn"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/5 border-white/20 text-white focus:border-blue-500/50 mobile-btn"
                />
              </div>
              <div className="space-y-2">
                <Button
                  className="w-full neon-button text-white mobile-btn"
                  onClick={() => handleEmailAuth(isSignUp)}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSignUp ? "Create Account" : "Sign In"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-white hover:bg-white/10 mobile-btn text-sm"
                  onClick={() => setIsSignUp(!isSignUp)}
                  disabled={isLoading}
                >
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
