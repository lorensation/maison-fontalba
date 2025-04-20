"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutGrid, Users, ClipboardList, FileText, MessageSquare, LogOut, Settings } from "lucide-react"
import { createSupabaseClient } from "@/app/lib/supabase/client"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createSupabaseClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutGrid size={20} />,
    },
    {
      name: "Portfolio",
      href: "/admin/portfolio",
      icon: <LayoutGrid size={20} />,
    },
    {
      name: "Clients",
      href: "/admin/clients",
      icon: <Users size={20} />,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Invoices",
      href: "/admin/invoices",
      icon: <FileText size={20} />,
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ]

  return (
    <aside className="w-64 bg-primary-100 p-6 flex flex-col h-screen">
      <div className="mb-8">
        <Link href="/admin" className="text-2xl font-serif text-primary-400">
          Maison Fontalba
        </Link>
        <p className="text-sm text-neutral-600 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-3 rounded-sm transition-colors ${
              isActive(item.href) ? "bg-primary-300 text-neutral-800" : "text-neutral-700 hover:bg-primary-200"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-3 mt-6 text-neutral-700 hover:bg-primary-200 rounded-sm transition-colors"
      >
        <LogOut size={20} className="mr-3" />
        Logout
      </button>
    </aside>
  )
}
