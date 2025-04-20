import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"
import DeleteProjectForm from "./delete-project-form"

export const metadata: Metadata = {
  title: "Delete Project | Maison Fontalba Admin",
  description: "Delete a portfolio project",
}

async function getProject(id: string) {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      short_description,
      featured_image,
      categories(id, name)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching project:", error)
    return null
  }

  return data
}

export default async function DeleteProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Delete Project</h1>
      <div className="bg-white p-6 rounded-sm shadow-sm">
        <div className="mb-8">
          <h2 className="text-xl font-medium text-red-600 mb-4">Are you sure you want to delete this project?</h2>
          <p className="text-neutral-600 mb-6">
            This action cannot be undone. This will permanently delete the project and all associated images.
          </p>

          <div className="flex items-start space-x-4 p-4 bg-primary-50 rounded-sm">
            <div className="relative w-24 h-16 flex-shrink-0">
              <Image
                src={project.featured_image || "/placeholder.svg?height=64&width=96&query=minimalist design project"}
                alt={project.title}
                fill
                className="object-cover rounded-sm"
              />
            </div>
            <div>
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-neutral-600 mb-1">{project.categories?.name || "Uncategorized"}</p>
              <p className="text-sm">{project.short_description}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/portfolio"
            className="px-6 py-2 border border-primary-300 text-neutral-800 hover:bg-primary-100 transition-colors rounded-sm"
          >
            Cancel
          </Link>
          <DeleteProjectForm projectId={project.id} />
        </div>
      </div>
    </div>
  )
}
