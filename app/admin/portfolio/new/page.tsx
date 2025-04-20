import type { Metadata } from "next"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"
import ProjectForm from "../components/project-form"

export const metadata: Metadata = {
  title: "New Project | Maison Fontalba Admin",
  description: "Create a new portfolio project",
}

async function getCategories() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from("categories").select("id, name").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}

export default async function NewProjectPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Create New Project</h1>
      <div className="bg-white p-6 rounded-sm shadow-sm">
        <ProjectForm categories={categories} />
      </div>
    </div>
  )
}
