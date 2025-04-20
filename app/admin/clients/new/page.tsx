import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Client | Maison Fontalba Admin",
  description: "Add a new client",
}

export default function NewClientPage() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Add New Client</h1>
      <div className="bg-white p-6 rounded-sm shadow-sm">
        <p className="text-neutral-600">
          Client management form will be implemented in the next phase. This will include fields for client details,
          contact information, and billing information.
        </p>
      </div>
    </div>
  )
}
