"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseClient } from "@/app/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function DeleteProjectForm({ projectId }: { projectId: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const handleDelete = async () => {
    setIsDeleting(true)
    setError("")

    try {
      const supabase = createSupabaseClient()

      // Get project details to find images to delete
      const { data: project, error: fetchError } = await supabase
        .from("projects")
        .select("featured_image, images")
        .eq("id", projectId)
        .single()

      if (fetchError) {
        throw new Error(`Error fetching project: ${fetchError.message}`)
      }

      // Delete the project from the database
      const { error: deleteError } = await supabase.from("projects").delete().eq("id", projectId)

      if (deleteError) {
        throw new Error(`Error deleting project: ${deleteError.message}`)
      }

      // Optional: Delete associated images from storage
      // This would require extracting file paths from URLs and using storage.remove()
      // For simplicity, we're skipping this step for now

      // Redirect back to portfolio list
      router.push("/admin/portfolio")
      router.refresh()
    } catch (error: any) {
      console.error("Error deleting project:", error)
      setError(error.message || "An error occurred while deleting the project")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-sm mb-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-sm flex items-center"
      >
        {isDeleting && <Loader2 size={18} className="mr-2 animate-spin" />}
        Delete Project
      </button>
    </>
  )
}
