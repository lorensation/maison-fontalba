/**
 * Admin Layout
 * Description: Layout for all admin pages with authentication protection
 */
import React from 'react';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/features/admin/admin-sidebar';
import { createServerSupabaseClient } from '@/lib/supabase';

export const metadata = {
  title: 'Panel de Administración | Maison Fontalba',
  description: 'Panel de administración para gestionar el contenido de Maison Fontalba',
};

// Check authentication server-side
async function getUser() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  return session?.user || null;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  
  // Redirect to login if not authenticated
  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-primary">
      {/* Admin sidebar navigation */}
      <AdminSidebar />
      
      {/* Main content area */}
      <div className="flex-1 p-8">
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}