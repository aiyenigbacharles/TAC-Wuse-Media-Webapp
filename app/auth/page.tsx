"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { AuthForm } from "@/components/auth-form"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="hero-gradient safe-area-inset">
      <div className="text-center pt-6 sm:pt-8 pb-4 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-balance mb-2 text-foreground">Church Media System</h1>
        <p className="text-muted-foreground text-balance text-sm sm:text-base">Sign in to access your media dashboard</p>
      </div>
      <AuthForm />
    </div>
  )
}
