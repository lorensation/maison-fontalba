import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Invoices | Maison Fontalba Admin",
  description: "Manage invoices for Maison Fontalba",
}

export default function InvoicesPage() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Invoices</h1>
      <div className="bg-white p-6 rounded-sm shadow-sm">
        <p className="text-neutral-600">
          The invoice management system will be implemented in the next phase. This will include creating, editing, and
          tracking invoices, with integration to the client database for auto-filling client information.
        </p>
      </div>
    </div>
  )
}
