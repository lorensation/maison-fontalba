import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const supabase = createSupabaseServerClient()

    // Store the message in the database
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone || null,
      message,
      read: false,
    })

    if (error) {
      console.error("Error saving contact message:", error)
      return NextResponse.json({ error: "Failed to save your message" }, { status: 500 })
    }

    // Here you would typically send an email notification to the admin
    // This would require setting up an email service like SendGrid, Mailgun, etc.
    // For now, we'll just log it
    console.log("New contact message received:", { name, email, phone, message })

    return NextResponse.json({ success: true, message: "Your message has been sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form submission:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
