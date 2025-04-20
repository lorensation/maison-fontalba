import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"

export const metadata: Metadata = {
  title: "Portfolio | Maison Fontalba",
  description: "Explore our portfolio of elegant, minimalist design projects",
}

// This function will be called at build time and periodically at runtime
export const revalidate = 3600 // Revalidate every hour

async function getProjects(categoryId?: string) {
  const supabase = createSupabaseServerClient()

  let query = supabase
    .from("projects")
    .select(`
      id,
      title,
      short_description,
      featured_image,
      categories(id, name)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (categoryId) {
    query = query.eq("category_id", categoryId)
  }

  const { data, error } = await query

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

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const categoryId = searchParams.category
  const [projects, categories] = await Promise.all([getProjects(categoryId), getCategories()])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Our Portfolio</h1>

      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-4">
        <Link
          href="/portfolio"
          className={`px-4 py-2 rounded-sm transition-colors ${!categoryId ? "bg-primary-300 text-neutral-800" : "bg-primary-100 hover:bg-primary-200 text-neutral-700"}`}
        >
          All Projects
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/portfolio?category=${category.id}`}
            className={`px-4 py-2 rounded-sm transition-colors ${categoryId === category.id ? "bg-primary-300 text-neutral-800" : "bg-primary-100 hover:bg-primary-200 text-neutral-700"}`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <Link href={`/portfolio/${project.id}`}>
                <div className="relative h-[300px] mb-4 overflow-hidden">
                  <Image
                    src={
                      project.featured_image || "/placeholder.svg?height=300&width=400&query=minimalist design project"
                    }
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="text-xl font-serif mb-2">{project.title}</h2>
                <p className="text-neutral-600 mb-3">{project.categories?.name}</p>
                <p className="text-neutral-700 mb-4">{project.short_description}</p>
                <span className="text-primary-400 group-hover:underline">View Project →</span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-neutral-600">No projects found in this category.</p>
          <Link href="/portfolio" className="text-primary-400 hover:underline mt-4 inline-block">
            View all projects
          </Link>
        </div>
      )}
    </div>
  )
}
