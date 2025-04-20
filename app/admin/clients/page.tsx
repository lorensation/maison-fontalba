import type { Metadata } from "next"
import Link from "next/link"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"
import { PlusCircle, Edit, Trash2, Mail, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Clients | Maison Fontalba Admin",
  description: "Manage clients for Maison Fontalba",
}

// Revalidate data every 10 seconds
export const revalidate = 10

async function getClients() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from("clients").select("*").order("name")

  if (error) {
    console.error("Error fetching clients:", error)
    return []
  }

  return data || []
}

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Clients</h1>
        <Link
          href="/admin/clients/new"
          className="flex items-center px-4 py-2 bg-primary-300 text-neutral-800 hover:bg-primary-400 transition-colors rounded-sm"
        >
          <PlusCircle size={18} className="mr-2" />
          New Client
        </Link>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-sm shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-700">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-neutral-700">Phone</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.id} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-800">{client.name}</div>
                    {client.tax_id && <div className="text-xs text-neutral-500">Tax ID: {client.tax_id}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-600">{client.contact_person || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.email ? (
                      <a
                        href={`mailto:${client.email}`}
                        className="text-sm text-primary-400 hover:underline flex items-center"
                      >
                        <Mail size={14} className="mr-1" />
                        {client.email}
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.phone ? (
                      <a
                        href={`tel:${client.phone}`}
                        className="text-sm text-primary-400 hover:underline flex items-center"
                      >
                        <Phone size={14} className="mr-1" />
                        {client.phone}
                      </a>
                    ) : (
                      <span className="text-sm text-neutral-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <Link href={`/admin/clients/${client.id}`} className="text-primary-400 hover:text-primary-500">
                        <Edit size={18} />
                        <span className="sr-only">Edit</span>
                      </Link>
                      <Link href={`/admin/clients/${client.id}/delete`} className="text-red-500 hover:text-red-600">
                        <Trash2 size={18} />
                        <span className="sr-only">Delete</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-neutral-500">
                  No clients found. Create your first client!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
