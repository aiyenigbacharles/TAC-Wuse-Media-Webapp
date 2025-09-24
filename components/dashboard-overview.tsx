"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Calendar,
  Video,
  Bell,
  FileText,
  Upload,
  UserPlus,
} from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Team Members */}
      <Card className="card-gradient border-primary/20">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold">Team Members</h3>
          <p className="text-muted-foreground text-sm">
            Manage and view your media team
          </p>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card className="card-gradient border-primary/20">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Calendar className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold">Schedule</h3>
          <p className="text-muted-foreground text-sm">
            Stay on top of upcoming events
          </p>
        </CardContent>
      </Card>

      {/* Media Library */}
      <Card className="card-gradient border-primary/20">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Video className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold">Media Library</h3>
          <p className="text-muted-foreground text-sm">
            Upload and manage media assets
          </p>
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card className="card-gradient border-primary/20">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Bell className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold">Announcements</h3>
          <p className="text-muted-foreground text-sm">
            Create and share announcements
          </p>
        </CardContent>
      </Card>

      {/* Run Sheets */}
      <Card className="card-gradient border-primary/20">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <FileText className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold">Run Sheets</h3>
          <p className="text-muted-foreground text-sm">
            Organize and prepare service flow
          </p>
        </CardContent>
      </Card>

      {/* Upload Media */}
      <Card className="card-gradient border-primary/20">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Upload className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold">Upload Media</h3>
          <p className="text-muted-foreground text-sm">
            Quickly upload new content
          </p>
        </CardContent>
      </Card>

      {/* Invite Members */}
      <Card className="card-gradient border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="p-8 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Want to invite more team members?
            </h3>
            <p className="text-muted-foreground">
              Grow your media team by inviting new volunteers and assigning
              roles.
            </p>
            <Button className="mt-4">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Members
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
