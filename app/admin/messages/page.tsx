import type { Metadata } from "next"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"
import { Mail, Phone, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Messages | Maison Fontalba Admin",
  description: "View contact messages and quote requests",
}

// Revalidate data every 10 seconds
export const revalidate = 10

async function getContactMessages() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching contact messages:", error)
    return []
  }

  return data || []
}

async function getQuoteRequests() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from("quote_requests").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching quote requests:", error)
    return []
  }

  return data || []
}

export default async function MessagesPage() {
  const [contactMessages, quoteRequests] = await Promise.all([getContactMessages(), getQuoteRequests()])

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Messages</h1>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-primary-200">
          <nav className="-mb-px flex">
            <a
              href="#contact-messages"
              className="border-primary-400 text-primary-400 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
            >
              Contact Messages ({contactMessages.length})
            </a>
            <a
              href="#quote-requests"
              className="border-transparent text-neutral-500 hover:border-primary-300 hover:text-neutral-700 whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ml-8"
            >
              Quote Requests ({quoteRequests.length})
            </a>
          </nav>
        </div>
      </div>

      {/* Contact Messages */}
      <section id="contact-messages" className="mb-12">
        <h2 className="text-2xl font-serif mb-4">Contact Messages</h2>

        {contactMessages.length > 0 ? (
          <div className="space-y-6">
            {contactMessages.map((message) => (
              <div key={message.id} className="bg-white p-6 rounded-sm shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">{message.name}</h3>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Calendar size={14} className="mr-1" />
                    {new Date(message.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <a href={`mailto:${message.email}`} className="flex items-center text-primary-400 hover:underline">
                    <Mail size={14} className="mr-1" />
                    {message.email}
                  </a>

                  {message.phone && (
                    <a href={`tel:${message.phone}`} className="flex items-center text-primary-400 hover:underline">
                      <Phone size={14} className="mr-1" />
                      {message.phone}
                    </a>
                  )}
                </div>

                <div className="bg-primary-50 p-4 rounded-sm">
                  <p className="whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">No contact messages received yet.</p>
        )}
      </section>

      {/* Quote Requests */}
      <section id="quote-requests">
        <h2 className="text-2xl font-serif mb-4">Quote Requests</h2>

        {quoteRequests.length > 0 ? (
          <div className="space-y-6">
            {quoteRequests.map((request) => (
              <div key={request.id} className="bg-white p-6 rounded-sm shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">{request.name}</h3>
                  <div className="flex items-center text-sm text-neutral-500">
                    <Calendar size={14} className="mr-1" />
                    {new Date(request.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <a href={`mailto:${request.email}`} className="flex items-center text-primary-400 hover:underline">
                    <Mail size={14} className="mr-1" />
                    {request.email}
                  </a>

                  {request.phone && (
                    <a href={`tel:${request.phone}`} className="flex items-center text-primary-400 hover:underline">
                      <Phone size={14} className="mr-1" />
                      {request.phone}
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {request.service_type && (
                    <div>
                      <h4 className="text-sm font-medium text-neutral-700">Service Type</h4>
                      <p>{request.service_type}</p>
                    </div>
                  )}

                  {request.budget && (
                    <div>
                      <h4 className="text-sm font-medium text-neutral-700">Budget</h4>
                      <p>{request.budget}</p>
                    </div>
                  )}

                  {request.timeline && (
                    <div>
                      <h4 className="text-sm font-medium text-neutral-700">Timeline</h4>
                      <p>{request.timeline}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Project Description</h4>
                  <div className="bg-primary-50 p-4 rounded-sm">
                    <p className="whitespace-pre-wrap">{request.project_description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500">No quote requests received yet.</p>
        )}
      </section>
    </div>
  )
}
