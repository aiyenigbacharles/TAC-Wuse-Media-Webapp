import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface ApplicationData {
  full_name: string
  phone_number: string
  occupation: string
  technical_skills: string
  status: "pending" | "under_review" | "approved" | "rejected"
  user_id?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, phoneNumber, occupation, technicalSkills } = body

    // Validate required fields
    if (!fullName || !phoneNumber || !occupation || !technicalSkills) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Get current user (optional - applications can be submitted anonymously)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Prepare application data
    const applicationData: ApplicationData = {
      full_name: fullName.trim(),
      phone_number: phoneNumber.trim(),
      occupation: occupation.trim(),
      technical_skills: technicalSkills.trim(),
      status: "pending",
      user_id: user?.id || null, // Optional user association
    }

    // Insert application into Supabase
    const { data, error } = await supabase.from("applications").insert([applicationData]).select().single()

    if (error) {
      console.error("[v0] Supabase Error:", error)
      throw new Error("Failed to save application to database")
    }

    console.log("[v0] Application saved successfully:", data.id)

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: data.id,
    })
  } catch (error) {
    console.error("[v0] Error saving application:", error)
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "pending"

    const supabase = await createClient()

    // Build query based on status filter
    let query = supabase.from("applications").select("*").order("created_at", { ascending: false })

    if (status !== "all") {
      query = query.eq("status", status)
    }

    const { data: applications, error } = await query

    if (error) {
      console.error("[v0] Supabase Error:", error)
      throw new Error("Failed to fetch applications")
    }

    return NextResponse.json({
      success: true,
      applications: applications || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
