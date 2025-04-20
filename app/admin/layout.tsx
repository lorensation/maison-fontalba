import type React from "react"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"
import AdminSidebar from "./components/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  const supabase = createSupabaseServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-primary-50">
      <AdminSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}
