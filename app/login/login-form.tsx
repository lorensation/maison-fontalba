"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseClient } from "@/app/lib/supabase/client"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const supabase = createSupabaseClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Redirect to admin dashboard
      router.push("/admin")
      router.refresh()
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Failed to login. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-neutral-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-primary-200 bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-neutral-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-primary-200 bg-primary-50 focus:outline-none focus:ring-1 focus:ring-primary-400"
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-sm">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-3 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}
