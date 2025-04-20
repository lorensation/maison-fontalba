"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseClient } from "@/app/lib/supabase/client"
import { Trash2, Loader2 } from "lucide-react"

interface Category {
  id: string
  name: string
  created_at: string
}

export default function CategoryList({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState("")

  const handleDelete = async (id: string) => {
    if (
      !confirm("Are you sure you want to delete this category? Projects using this category will be uncategorized.")
    ) {
      return
    }

    setDeletingId(id)
    setError("")

    try {
      const supabase = createSupabaseClient()

      // First, update any projects using this category to have null category_id
      await supabase
        .from("projects")
        .update({ category_id: null, updated_at: new Date().toISOString() })
        .eq("category_id", id)

      // Then delete the category
      const { error } = await supabase.from("categories").delete().eq("id", id)

      if (error) {
        throw new Error(`Error deleting category: ${error.message}`)
      }

      router.refresh()
    } catch (error: any) {
      console.error("Error deleting category:", error)
      setError(error.message || "An error occurred while deleting the category")
    } finally {
      setDeletingId(null)
    }
  }

  if (categories.length === 0) {
    return <p className="text-neutral-500">No categories found. Create your first category!</p>
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-sm mb-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <ul className="divide-y divide-primary-100">
        {categories.map((category) => (
          <li key={category.id} className="py-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{category.name}</p>
              <p className="text-xs text-neutral-500">Created: {new Date(category.created_at).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => handleDelete(category.id)}
              disabled={deletingId === category.id}
              className="text-red-500 hover:text-red-600 p-1"
              aria-label={`Delete ${category.name} category`}
            >
              {deletingId === category.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
