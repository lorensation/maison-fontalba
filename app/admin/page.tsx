import type { Metadata } from "next"
import { createSupabaseServerClient } from "@/app/lib/supabase/server"

export const metadata: Metadata = {
  title: "Admin Dashboard | Maison Fontalba",
  description: "Admin dashboard for Maison Fontalba",
}

async function getDashboardData() {
  const supabase = createSupabaseServerClient()

  // Get counts for various entities
  const [projectsCount, clientsCount, invoicesCount, messagesCount, quoteRequestsCount] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("invoices").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    supabase.from("quote_requests").select("id", { count: "exact", head: true }),
  ])

  // Get recent messages
  const { data: recentMessages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  // Get recent quote requests
  const { data: recentQuoteRequests } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return {
    counts: {
      projects: projectsCount.count || 0,
      clients: clientsCount.count || 0,
      invoices: invoicesCount.count || 0,
      messages: messagesCount.count || 0,
      quoteRequests: quoteRequestsCount.count || 0,
    },
    recentMessages: recentMessages || [],
    recentQuoteRequests: recentQuoteRequests || [],
  }
}

export default async function AdminDashboardPage() {
  const { counts, recentMessages, recentQuoteRequests } = await getDashboardData()

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-sm text-neutral-500 mb-1">Portfolio Projects</h2>
          <p className="text-3xl font-serif">{counts.projects}</p>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-sm text-neutral-500 mb-1">Clients</h2>
          <p className="text-3xl font-serif">{counts.clients}</p>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-sm text-neutral-500 mb-1">Invoices</h2>
          <p className="text-3xl font-serif">{counts.invoices}</p>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-sm text-neutral-500 mb-1">Messages</h2>
          <p className="text-3xl font-serif">{counts.messages}</p>
        </div>

        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-sm text-neutral-500 mb-1">Quote Requests</h2>
          <p className="text-3xl font-serif">{counts.quoteRequests}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-xl font-serif mb-4">Recent Messages</h2>

          {recentMessages.length > 0 ? (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="border-b border-primary-100 pb-4 last:border-0">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">{message.name}</h3>
                    <span className="text-sm text-neutral-500">
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-1">{message.email}</p>
                  <p className="text-sm line-clamp-2">{message.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No recent messages</p>
          )}
        </div>

        {/* Recent Quote Requests */}
        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-xl font-serif mb-4">Recent Quote Requests</h2>

          {recentQuoteRequests.length > 0 ? (
            <div className="space-y-4">
              {recentQuoteRequests.map((request) => (
                <div key={request.id} className="border-b border-primary-100 pb-4 last:border-0">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-medium">{request.name}</h3>
                    <span className="text-sm text-neutral-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mb-1">
                    {request.email} • {request.service_type || "No service specified"}
                  </p>
                  <p className="text-sm line-clamp-2">{request.project_description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-500">No recent quote requests</p>
          )}
        </div>
      </div>
    </div>
  )
}
