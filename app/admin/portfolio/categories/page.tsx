import type { Metadata } from "next"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"
import CategoryForm from "./category-form"
import CategoryList from "./category-list"

export const metadata: Metadata = {
  title: "Manage Categories | Maison Fontalba Admin",
  description: "Manage portfolio categories",
}

// Revalidate data every 10 seconds
export const revalidate = 10

async function getCategories() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from("categories").select("id, name, created_at").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Manage Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add/Edit Category Form */}
        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-xl font-serif mb-4">Add New Category</h2>
          <CategoryForm />
        </div>

        {/* Categories List */}
        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-xl font-serif mb-4">Existing Categories</h2>
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  )
}
