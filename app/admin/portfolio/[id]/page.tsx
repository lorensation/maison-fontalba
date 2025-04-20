import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"
import ProjectForm from "../components/project-form"

export const metadata: Metadata = {
  title: "Edit Project | Maison Fontalba Admin",
  description: "Edit a portfolio project",
}

// Revalidate data every 10 seconds
export const revalidate = 10

async function getProject(id: string) {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching project:", error)
    return null
  }

  return data
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

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, categories] = await Promise.all([getProject(params.id), getCategories()])

  if (!project) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Edit Project: {project.title}</h1>
      <div className="bg-white p-6 rounded-sm shadow-sm">
        <ProjectForm project={project} categories={categories} />
      </div>
    </div>
  )
}
