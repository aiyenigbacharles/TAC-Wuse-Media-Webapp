"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, User, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Manage your account and application preferences.</p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Profile Settings */}
        <Card className="card-gradient border-border/50 mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription className="text-sm">Update your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 mobile-form">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                <AvatarImage src="/woman-profile.png" alt="Profile" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" className="mobile-btn">
                  Change Photo
                </Button>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Sarah" className="mobile-btn" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Johnson" className="mobile-btn" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="sarah@church.com" className="mobile-btn" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="mobile-btn" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="card-gradient border-border/50 mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              Notifications
            </CardTitle>
            <CardDescription className="text-sm">Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch id="emailNotifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="scheduleReminders">Schedule Reminders</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Get reminded about upcoming assignments</p>
              </div>
              <Switch id="scheduleReminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="teamUpdates">Team Updates</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Notifications about team changes</p>
              </div>
              <Switch id="teamUpdates" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="card-gradient border-border/50 mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              Security
            </CardTitle>
            <CardDescription className="text-sm">Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 mobile-form">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" className="mobile-btn" />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" className="mobile-btn" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" className="mobile-btn" />
            </div>
            <Button className="mobile-btn">Update Password</Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
        <Button variant="outline" className="mobile-btn">Cancel</Button>
        <Button className="mobile-btn">Save Changes</Button>
      </div>
    </div>
  )
}
