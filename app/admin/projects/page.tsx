import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CRM Projects | Maison Fontalba Admin",
  description: "Manage CRM projects for Maison Fontalba",
}

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">CRM Projects</h1>
      <div className="bg-white p-6 rounded-sm shadow-sm">
        <p className="text-neutral-600">
          The CRM project management system will be implemented in the next phase. This will include project tracking,
          milestone management, and integration with the portfolio and invoicing systems.
        </p>
      </div>
    </div>
  )
}
