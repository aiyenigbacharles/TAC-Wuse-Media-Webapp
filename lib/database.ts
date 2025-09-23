// Database connection and query utilities
// This would typically connect to your chosen database (Supabase, Neon, etc.)

export interface User {
  id: string
  email: string
  phone?: string
  name: string
  role: "Admin" | "Media Lead" | "Volunteer"
  avatar_url?: string
  created_at: string
  updated_at: string
  last_login?: string
}

export interface Service {
  id: string
  name: string
  description?: string
  service_date: string
  service_time: string
  location?: string
  service_type: string
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  created_by: string
  created_at: string
  updated_at: string
}

export interface ServiceAssignment {
  id: string
  service_id: string
  user_id: string
  role: string
  status: "pending" | "confirmed" | "declined"
  notes?: string
  created_at: string
  updated_at: string
}

export interface MediaFile {
  id: string
  name: string
  description?: string
  file_type: string
  file_size?: number
  file_url: string
  thumbnail_url?: string
  category?: string
  tags?: string[]
  uploaded_by: string
  created_at: string
  updated_at: string
}

export interface RunSheet {
  id: string
  service_id: string
  name: string
  description?: string
  status: "draft" | "review" | "approved" | "archived"
  created_by: string
  created_at: string
  updated_at: string
}

export interface RunSheetItem {
  id: string
  run_sheet_id: string
  title: string
  description?: string
  duration_minutes?: number
  item_order: number
  item_type: string
  assigned_to?: string
  media_file_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  priority: "low" | "normal" | "high" | "urgent"
  category?: string
  target_roles?: string[]
  is_published: boolean
  published_at?: string
  expires_at?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  is_read: boolean
  action_url?: string
  created_at: string
}

// Database query functions would be implemented here
// These would connect to your actual database (Supabase, Neon, etc.)

export class DatabaseService {
  // User management
  static async getUsers(): Promise<User[]> {
    // Implementation would query the actual database
    throw new Error("Database connection not configured")
  }

  static async getUserById(id: string): Promise<User | null> {
    // Implementation would query the actual database
    throw new Error("Database connection not configured")
  }

  static async createUser(user: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
    // Implementation would insert into actual database
    throw new Error("Database connection not configured")
  }

  // Service management
  static async getServices(): Promise<Service[]> {
    // Implementation would query the actual database
    throw new Error("Database connection not configured")
  }

  static async getServiceById(id: string): Promise<Service | null> {
    // Implementation would query the actual database
    throw new Error("Database connection not configured")
  }

  static async createService(service: Omit<Service, "id" | "created_at" | "updated_at">): Promise<Service> {
    // Implementation would insert into actual database
    throw new Error("Database connection not configured")
  }

  // Media management
  static async getMediaFiles(): Promise<MediaFile[]> {
    // Implementation would query the actual database
    throw new Error("Database connection not configured")
  }

  static async uploadMediaFile(file: Omit<MediaFile, "id" | "created_at" | "updated_at">): Promise<MediaFile> {
    // Implementation would insert into actual database
    throw new Error("Database connection not configured")
  }

  // Announcement management
  static async getAnnouncements(): Promise<Announcement[]> {
    // Implementation would query the actual database
    throw new Error("Database connection not configured")
  }

  static async createAnnouncement(
    announcement: Omit<Announcement, "id" | "created_at" | "updated_at">,
  ): Promise<Announcement> {
    // Implementation would insert into actual database
    throw new Error("Database connection not configured")
  }
}
