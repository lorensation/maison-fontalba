import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"
import { PlusCircle, Edit, Trash2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Portfolio Management | Maison Fontalba Admin",
  description: "Manage portfolio projects for Maison Fontalba",
}

// Revalidate data every 10 seconds
export const revalidate = 10

async function getProjects() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      short_description,
      featured_image,
      published,
      created_at,
      categories(id, name)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
    return []
  }

  return data || []
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

export default async function AdminPortfolioPage() {
  const [projects, categories] = await Promise.all([getProjects(), getCategories()])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Portfolio Projects</h1>
        <Link
          href="/admin/portfolio/new"
          className="flex items-center px-4 py-2 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors rounded-sm"
        >
          <PlusCircle size={18} className="mr-2" />
          New Project
        </Link>
      </div>

      {/* Category Management Link */}
      <div className="mb-6">
        <Link href="/admin/portfolio/categories" className="text-primary-400 hover:underline">
          Manage Categories
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-sm shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-700">Date</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-16 h-12">
                      <Image
                        src={
                          project.featured_image ||
                          "/placeholder.svg?height=48&width=64&query=minimalist design project" ||
                          "/placeholder.svg"
                        }
                        alt={project.title}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-800">{project.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-600">{project.categories?.name || "Uncategorized"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {project.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-600">{new Date(project.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link href={`/admin/portfolio/${project.id}`} className="text-primary-400 hover:text-primary-500">
                        <Edit size={18} />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <Link href={`/admin/portfolio/${project.id}/delete`} className="text-red-500 hover:text-red-600">
                        <Trash2 size={18} />
                        <span className="sr-only">Delete</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-neutral-500">
                  No projects found. Create your first project!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
