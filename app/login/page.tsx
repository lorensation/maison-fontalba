import type { Metadata } from "next"
import LoginForm from "./login-form"

export const metadata: Metadata = {
  title: "Login | Maison Fontalba",
  description: "Admin login for Maison Fontalba",
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-primary-100 p-8">
        <h1 className="text-3xl font-serif mb-8 text-center">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}
