"use client"

import type React from "react"
import type { Database } from "@/types/supabase"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createSupabaseClient } from "@/app/lib/supabase/client"
import { Loader2, X, Upload, Plus } from "lucide-react"

type Category = Database["public"]["Tables"]["categories"]["Row"]
type Project = Database["public"]["Tables"]["projects"]["Row"]

interface ProjectFormProps {
  project?: Project | null
  categories: Category[]
}

export default function ProjectForm({ project, categories }: ProjectFormProps) {
  const router = useRouter()
  const supabase = createSupabaseClient()
  const isEditing = !!project

  const [formData, setFormData] = useState({
    title: project?.title || "",
    short_description: project?.short_description || "",
    description: project?.description || "",
    category_id: project?.category_id || "",
    featured_image: project?.featured_image || "",
    images: project?.images || [],
    published: project?.published || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // File upload states
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null)
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>(project?.featured_image || "")
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([])
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>(project?.images || [])
  const [isUploading, setIsUploading] = useState(false)

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle featured image selection
  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFeaturedImageFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFeaturedImagePreview(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle additional images selection
  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      setAdditionalImageFiles((prev) => [...prev, ...files])

      // Create previews
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setAdditionalImagePreviews((prev) => [...prev, event.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  // Remove an additional image
  const removeAdditionalImage = (index: number) => {
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index))

    // If it's a new file, remove it from the files array
    if (index < additionalImageFiles.length) {
      setAdditionalImageFiles((prev) => prev.filter((_, i) => i !== index))
    } else {
      // If it's an existing image, update the formData
      const updatedImages = [...formData.images]
      updatedImages.splice(index - additionalImageFiles.length, 1)
      setFormData((prev) => ({ ...prev, images: updatedImages }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.short_description.trim()) {
      newErrors.short_description = "Short description is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!featuredImagePreview && !featuredImageFile) {
      newErrors.featured_image = "Featured image is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Upload images to Supabase Storage
  const uploadImages = async () => {
    setIsUploading(true)
    const timestamp = Date.now()
    let featuredImageUrl = formData.featured_image
    let additionalImageUrls = [...formData.images]

    try {
      // Upload featured image if changed
      if (featuredImageFile) {
        const filePath = `portfolio/${timestamp}-${featuredImageFile.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, featuredImageFile)

        if (uploadError) {
          throw new Error(`Error uploading featured image: ${uploadError.message}`)
        }

        // Get public URL
        const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath)
        featuredImageUrl = urlData.publicUrl
      }

      // Upload additional images
      if (additionalImageFiles.length > 0) {
        const newImageUrls = await Promise.all(
          additionalImageFiles.map(async (file, index) => {
            const filePath = `portfolio/${timestamp}-${index}-${file.name}`
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from("images")
              .upload(filePath, file)

            if (uploadError) {
              throw new Error(`Error uploading image ${index + 1}: ${uploadError.message}`)
            }

            // Get public URL
            const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath)
            return urlData.publicUrl
          }),
        )

        additionalImageUrls = [...additionalImageUrls, ...newImageUrls]
      }

      return {
        featured_image: featuredImageUrl,
        images: additionalImageUrls,
      }
    } catch (error) {
      console.error("Error uploading images:", error)
      throw error
    } finally {
      setIsUploading(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Upload images first
      const { featured_image, images } = await uploadImages()

      // Prepare data for database
      const projectData = {
        title: formData.title,
        short_description: formData.short_description,
        description: formData.description,
        category_id: formData.category_id || null,
        featured_image,
        images,
        published: formData.published,
        updated_at: new Date().toISOString(),
      }

      // Update or create project
      if (isEditing && project) {
        const { error } = await supabase.from("projects").update(projectData).eq("id", project.id)

        if (error) {
          throw new Error(`Error updating project: ${error.message}`)
        }
      } else {
        const { error } = await supabase.from("projects").insert({
          ...projectData,
          created_at: new Date().toISOString(),
        })

        if (error) {
          throw new Error(`Error creating project: ${error.message}`)
        }
      }

      // Redirect back to portfolio list
      router.push("/admin/portfolio")
      router.refresh()
    } catch (error: any) {
      console.error("Error saving project:", error)
      setSubmitError(error.message || "An error occurred while saving the project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-neutral-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border ${errors.title ? "border-red-500" : "border-primary-200"} bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400`}
              disabled={isSubmitting}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="short_description" className="block text-neutral-700 mb-1">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              rows={2}
              className={`w-full p-2 border ${errors.short_description ? "border-red-500" : "border-primary-200"} bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400`}
              disabled={isSubmitting}
            />
            {errors.short_description && <p className="text-red-500 text-sm mt-1">{errors.short_description}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-neutral-700 mb-1">
              Full Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={8}
              className={`w-full p-2 border ${errors.description ? "border-red-500" : "border-primary-200"} bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400`}
              disabled={isSubmitting}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="category_id" className="block text-neutral-700 mb-1">
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full p-2 border border-primary-200 bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400"
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleCheckboxChange}
              className="mr-2"
              disabled={isSubmitting}
            />
            <label htmlFor="published" className="text-neutral-700">
              Publish this project (visible on the website)
            </label>
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="space-y-6">
          <div>
            <label className="block text-neutral-700 mb-1">
              Featured Image <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-2 border-dashed ${errors.featured_image ? "border-red-500" : "border-primary-200"} rounded-sm p-4 text-center`}
            >
              {featuredImagePreview ? (
                <div className="relative">
                  <div className="relative h-48 w-full mb-2">
                    <Image
                      src={featuredImagePreview || "/placeholder.svg"}
                      alt="Featured image preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFeaturedImagePreview("")
                      setFeaturedImageFile(null)
                      setFormData((prev) => ({ ...prev, featured_image: "" }))
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    disabled={isSubmitting}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <Upload className="mx-auto h-12 w-12 text-neutral-400" />
                  <p className="mt-2 text-sm text-neutral-600">Click or drag to upload featured image</p>
                </div>
              )}
              <input
                type="file"
                id="featured_image"
                accept="image/*"
                onChange={handleFeaturedImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isSubmitting}
              />
            </div>
            {errors.featured_image && <p className="text-red-500 text-sm mt-1">{errors.featured_image}</p>}
          </div>

          <div>
            <label className="block text-neutral-700 mb-1">Additional Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {additionalImagePreviews.map((preview, index) => (
                <div key={index} className="relative h-24 border border-primary-200 rounded-sm overflow-hidden">
                  <Image src={preview || "/placeholder.svg"} alt={`Image ${index + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                    disabled={isSubmitting}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <label className="relative h-24 border-2 border-dashed border-primary-200 rounded-sm flex items-center justify-center cursor-pointer">
                <div className="text-center">
                  <Plus className="mx-auto h-6 w-6 text-neutral-400" />
                  <span className="mt-1 text-xs text-neutral-500">Add Image</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAdditionalImagesChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isSubmitting}
                />
              </label>
            </div>
            <p className="text-sm text-neutral-500">
              Upload multiple images to showcase different aspects of your project.
            </p>
          </div>
        </div>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-sm">
          <p className="text-red-700">{submitError}</p>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push("/admin/portfolio")}
          className="px-6 py-2 border border-primary-300 text-neutral-800 hover:bg-primary-100 transition-colors rounded-sm"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="px-6 py-2 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors rounded-sm flex items-center"
        >
          {(isSubmitting || isUploading) && <Loader2 size={18} className="mr-2 animate-spin" />}
          {isEditing ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  )
}
