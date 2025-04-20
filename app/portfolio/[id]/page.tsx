import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const project = await getProject(params.id)

  if (!project) {
    return {
      title: "Project Not Found | Maison Fontalba",
    }
  }

  return {
    title: `${project.title} | Maison Fontalba Portfolio`,
    description: project.short_description,
  }
}

// This function will be called at build time for static generation
export async function generateStaticParams() {
  const supabase = createSupabaseServerClient()

  const { data } = await supabase.from("projects").select("id").eq("published", true)

  return (data || []).map((project) => ({
    id: project.id,
  }))
}

// Revalidate the data every hour
export const revalidate = 3600

async function getProject(id: string) {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      description,
      short_description,
      featured_image,
      images,
      categories(id, name)
    `)
    .eq("id", id)
    .eq("published", true)
    .single()

  if (error || !data) {
    console.error("Error fetching project:", error)
    return null
  }

  return data
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/portfolio" className="text-primary-400 hover:underline mb-8 inline-block">
        ← Back to Portfolio
      </Link>

      <h1 className="text-3xl md:text-4xl font-serif mb-4">{project.title}</h1>

      {project.categories && <p className="text-neutral-600 mb-8">{project.categories.name}</p>}

      {/* Featured Image */}
      <div className="relative h-[500px] mb-8">
        <Image
          src={project.featured_image || "/placeholder.svg?height=500&width=1000&query=minimalist design project"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Project Description */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: project.description }} />
      </div>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-serif mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images.map((image, index) => (
              <div key={index} className="relative h-[250px]">
                <Image
                  src={image || "/placeholder.svg?height=250&width=350&query=minimalist design detail"}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-serif mb-4">Interested in a similar project?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-6 py-3 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors text-center"
          >
            Contact Us
          </Link>
          <Link
            href="/request-quote"
            className="px-6 py-3 border border-primary-300 text-neutral-800 hover:bg-primary-100 transition-colors text-center"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  )
}
