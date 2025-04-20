import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, project_description, service_type, budget, timeline } = body

    // Basic validation
    if (!name || !email || !project_description) {
      return NextResponse.json({ error: "Name, email, and project description are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const supabase = createSupabaseServerClient()

    // Store the quote request in the database
    const { error } = await supabase.from("quote_requests").insert({
      name,
      email,
      phone: phone || null,
      project_description,
      service_type: service_type || null,
      budget: budget || null,
      timeline: timeline || null,
      read: false,
      converted_to_project: false,
    })

    if (error) {
      console.error("Error saving quote request:", error)
      return NextResponse.json({ error: "Failed to save your quote request" }, { status: 500 })
    }

    // Here you would typically send an email notification to the admin
    // This would require setting up an email service like SendGrid, Mailgun, etc.
    // For now, we'll just log it
    console.log("New quote request received:", {
      name,
      email,
      phone,
      project_description,
      service_type,
      budget,
      timeline,
    })

    return NextResponse.json(
      { success: true, message: "Your quote request has been sent successfully" },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing quote request submission:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
