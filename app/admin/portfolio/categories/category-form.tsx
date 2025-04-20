"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseClient } from "@/app/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function CategoryForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Category name is required")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const supabase = createSupabaseClient()

      const { error } = await supabase.from("categories").insert({
        name: name.trim(),
        created_at: new Date().toISOString(),
      })

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          throw new Error("A category with this name already exists")
        }
        throw new Error(`Error creating category: ${error.message}`)
      }

      // Reset form and refresh data
      setName("")
      router.refresh()
    } catch (error: any) {
      console.error("Error creating category:", error)
      setError(error.message || "An error occurred while creating the category")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-neutral-700 mb-1">
          Category Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-primary-200 bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400"
          disabled={isSubmitting}
          placeholder="e.g., Interior Design"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-sm">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors rounded-sm flex items-center"
      >
        {isSubmitting && <Loader2 size={18} className="mr-2 animate-spin" />}
        Add Category
      </button>
    </form>
  )
}
