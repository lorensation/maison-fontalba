"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

const SERVICE_TYPES = ["Interior Design", "Brand Identity", "Digital Design", "Custom Project"]

export default function QuoteRequestForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    project_description: "",
    service_type: "",
    budget: "",
    timeline: "",
    honeypot: "", // Honeypot field for spam protection
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.project_description.trim()) {
      newErrors.project_description = "Project description is required"
    }

    if (!formData.consent) {
      newErrors.consent = "You must consent to our privacy policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // If honeypot field is filled, silently reject (bot submission)
    if (formData.honeypot) {
      setSubmitSuccess(true) // Fake success to fool bots
      return
    }

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/request-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          project_description: formData.project_description,
          service_type: formData.service_type,
          budget: formData.budget,
          timeline: formData.timeline,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit the form")
      }

      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        project_description: "",
        service_type: "",
        budget: "",
        timeline: "",
        honeypot: "",
        consent: false,
      })

      // Refresh the page data
      router.refresh()
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("There was an error submitting your quote request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 p-6 rounded-sm">
        <h3 className="text-xl font-serif text-green-800 mb-2">Quote Request Sent!</h3>
        <p className="text-green-700">
          Thank you for your interest in Maison Fontalba. We've received your project details and will prepare a
          personalized quote. We'll contact you within 48 hours to discuss your project further.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from real users, but bots will fill it */}
      <div className="hidden">
        <label htmlFor="honeypot">Leave this field empty</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-neutral-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-primary-200"} bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400`}
          required
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-neutral-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-primary-200"} bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400`}
          required
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-neutral-700 mb-1">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-primary-200 bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400"
        />
      </div>

      <div>
        <label htmlFor="service_type" className="block text-neutral-700 mb-1">
          Service Type
        </label>
        <select
          id="service_type"
          name="service_type"
          value={formData.service_type}
          onChange={handleChange}
          className="w-full p-2 border border-primary-200 bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400"
        >
          <option value="">Select a service type</option>
          {SERVICE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="project_description" className="block text-neutral-700 mb-1">
          Project Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="project_description"
          name="project_description"
          value={formData.project_description}
          onChange={handleChange}
          rows={5}
          className={`w-full p-2 border ${errors.project_description ? "border-red-500" : "border-primary-200"} bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400`}
          required
          placeholder="Please describe your project, including your goals, requirements, and any specific ideas you have."
        />
        {errors.project_description && <p className="text-red-500 text-sm mt-1">{errors.project_description}</p>}
      </div>

      <div>
        <label htmlFor="budget" className="block text-neutral-700 mb-1">
          Budget Range (optional)
        </label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full p-2 border border-primary-200 bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400"
          placeholder="e.g., $1,000-$5,000"
        />
      </div>

      <div>
        <label htmlFor="timeline" className="block text-neutral-700 mb-1">
          Timeline (optional)
        </label>
        <input
          type="text"
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full p-2 border border-primary-200 bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400"
          placeholder="e.g., Need by September 2025"
        />
      </div>

      <div>
        <label className="flex items-start">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleCheckboxChange}
            className="mt-1 mr-2"
            required
          />
          <span className="text-sm text-neutral-700">
            I consent to Maison Fontalba collecting and storing my data from this form for the purpose of preparing a
            quote. See our{" "}
            <a href="/privacy-policy" className="text-primary-400 hover:underline">
              Privacy Policy
            </a>{" "}
            for more information.
          </span>
        </label>
        {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-sm">
          <p className="text-red-700 text-sm">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
      >
        {isSubmitting ? "Sending..." : "Request Quote"}
      </button>
    </form>
  )
}
