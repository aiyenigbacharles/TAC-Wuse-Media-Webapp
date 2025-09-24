"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Calendar,
  FileImage,
  FileText,
  Home,
  Menu,
  MessageSquare,
  Settings,
  Users,
  LogOut,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface DashboardLayoutProps {
  children: React.ReactNode
}

// Mock user data - in real app this would come from authentication context
const currentUser = {
  name: "Sarah Johnson",
  email: "sarah@church.com",
  role: "Media Lead" as const,
  avatar: "/woman-profile.png",
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { name: "Media", href: "/dashboard/media", icon: FileImage },
  { name: "Run Sheets", href: "/dashboard/run-sheets", icon: FileText },
  { name: "Announcements", href: "/dashboard/announcements", icon: MessageSquare },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-red-500/20 text-red-300 border-red-500/30"
    case "Media Lead":
      return "bg-primary/20 text-primary border-primary/30"
    case "Volunteer":
      return "bg-green-500/20 text-green-300 border-green-500/30"
    default:
      return "bg-muted/20 text-muted-foreground border-border"
  }
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [currentPath, setCurrentPath] = useState("/dashboard")
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleNavigation = (href: string) => {
    setIsLoading(href)
    setCurrentPath(href)
    router.push(href)
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(null), 300)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn("flex h-full flex-col", className)}>
      <div className="flex h-14 sm:h-16 items-center justify-between glow-border border-b px-3 sm:px-6 bg-card/50">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Church Media</h2>
        <ThemeToggle />
      </div>

      <div className="flex-1 overflow-auto py-3 sm:py-4">
        <nav className="space-y-1 px-2 sm:px-3">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href
            const isItemLoading = isLoading === item.href
            return (
              <Button
                key={item.name}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200 text-sm hover:scale-[1.02] active:scale-[0.98] mobile-btn",
                  isActive &&
                    "bg-primary/10 text-primary hover:bg-primary/20 border-l-2 border-primary glow-border-strong",
                  "hover:bg-accent/80 hover:text-accent-foreground hover:shadow-md",
                  "active:bg-accent/90 active:shadow-sm",
                )}
                onClick={() => handleNavigation(item.href)}
                disabled={isItemLoading || isLoggingOut}
              >
                {isItemLoading ? <Loader2 className="mr-2 sm:mr-3 h-4 w-4 animate-spin" /> : <Icon className="mr-2 sm:mr-3 h-4 w-4" />}
                {item.name}
              </Button>
            )
          })}
        </nav>
      </div>

      <div className="glow-border border-t p-2 sm:p-4 bg-card/30">
        <div className="flex items-center space-x-2">
          <Avatar className="h-7 w-7 sm:h-8 sm:w-8 ring-2 ring-primary/20 glow-border">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm">
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate text-foreground">{currentUser.name}</p>
            <Badge variant="outline" className={cn("text-xs glow-border", getRoleBadgeColor(currentUser.role))}>
              {currentUser.role}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-destructive/10 hover:text-destructive p-1 glow-border-subtle"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" /> : <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />}
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background safe-area-inset">
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 glow-border border-r bg-sidebar card-gradient">
          <Sidebar />
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden fixed top-4 left-4 z-40 bg-card/80 backdrop-blur-sm glow-border mobile-btn"
            disabled={isLoggingOut}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 sm:w-64 bg-sidebar card-gradient glow-border">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto bg-background p-3 sm:p-6 pt-16 lg:pt-3">{children}</main>
      </div>
    </div>
  )
}
