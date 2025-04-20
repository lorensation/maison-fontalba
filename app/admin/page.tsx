/**
 * Admin Dashboard
 * Description: Main dashboard with statistics and recent activity
 */
import React from 'react';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase';
import Button from '@/components/ui/button';
import { PlusCircleIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/solid';

// Dashboard stat card
interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const StatCard = ({ title, value, description, icon, href }: StatCardProps) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-neutral">{value}</p>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <div className="bg-accent p-3 rounded-full">{icon}</div>
    </div>
    <div className="mt-4">
      <Link href={href} className="text-sm font-medium text-neutral hover:underline">
        Ver detalles →
      </Link>
    </div>
  </div>
);

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient();
  
  // Fetch count of projects
  const { count: projectsCount } = await supabase
    .from('projects')
    .select('id', { count: 'exact', head: true });
  
  // Fetch count of clients
  const { count: clientsCount } = await supabase
    .from('clients')
    .select('id', { count: 'exact', head: true });
  
  // Fetch count of unread contact messages
  const { count: unreadMessagesCount } = await supabase
    .from('contact_messages')
    .select('id', { count: 'exact', head: true })
    .eq('is_read', false);
  
  // Fetch count of unread quote requests
  const { count: unreadQuotesCount } = await supabase
    .from('quote_requests')
    .select('id', { count: 'exact', head: true })
    .eq('is_read', false);
    
  // Fetch recent contact messages
  const { data: recentMessages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
    
  // Fetch recent quote requests
  const { data: recentQuotes } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-medium">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bienvenido al panel de administración de Maison Fontalba</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Proyectos" 
          value={projectsCount || 0} 
          description="Proyectos en el portafolio" 
          href="/admin/portfolio"
          icon={
            <svg className="w-6 h-6 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Clientes" 
          value={clientsCount || 0} 
          description="Total de clientes registrados" 
          href="/admin/clients"
          icon={
            <svg className="w-6 h-6 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Mensajes no leídos" 
          value={unreadMessagesCount || 0} 
          description="Mensajes de contacto pendientes" 
          href="/admin/contact-messages"
          icon={
            <svg className="w-6 h-6 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Presupuestos pendientes" 
          value={unreadQuotesCount || 0} 
          description="Solicitudes de presupuesto no leídas" 
          href="/admin/quote-requests"
          icon={
            <svg className="w-6 h-6 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          }
        />
      </div>
      
      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contact Messages */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Mensajes recientes</h2>
            <Link href="/admin/contact-messages" className="text-sm font-medium text-neutral hover:underline">
              Ver todos
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {recentMessages && recentMessages.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentMessages.map((message) => (
                  <li key={message.id} className="p-4 hover:bg-primary transition-colors">
                    <div className="flex justify-between">
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{message.email}</p>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{message.message}</p>
                    <div className="mt-2">
                      <Link 
                        href={`/admin/contact-messages/${message.id}`}
                        className="text-xs font-medium text-neutral hover:underline"
                      >
                        Ver mensaje completo
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No hay mensajes recientes
              </div>
            )}
          </div>
        </div>
        
        {/* Recent Quote Requests */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Solicitudes de presupuesto recientes</h2>
            <Link href="/admin/quote-requests" className="text-sm font-medium text-neutral hover:underline">
              Ver todas
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {recentQuotes && recentQuotes.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentQuotes.map((quote) => (
                  <li key={quote.id} className="p-4 hover:bg-primary transition-colors">
                    <div className="flex justify-between">
                      <p className="font-medium">{quote.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{quote.email}</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {quote.service_type && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent text-neutral">
                          {quote.service_type}
                        </span>
                      )}
                      {quote.budget && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary text-neutral">
                          {quote.budget}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{quote.description}</p>
                    <div className="mt-2">
                      <Link 
                        href={`/admin/quote-requests/${quote.id}`}
                        className="text-xs font-medium text-neutral hover:underline"
                      >
                        Ver solicitud completa
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No hay solicitudes de presupuesto recientes
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-medium mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Button<typeof Link>
            as={Link}
            href="/admin/projects/new"
            variant="primary"
            className="mb-4"
          >
            <PlusCircleIcon className="w-5 h-5 mr-2" />
            Nuevo proyecto
          </Button>
          
          <Button<typeof Link>
            as={Link} 
            href="/admin/projects/edit/1"
            variant="outline"
            className="text-xs"
          >
            <PencilIcon className="w-4 h-4 mr-1" />
            Editar
          </Button>
          
          <Button<typeof Link>
            as={Link}
            href="/admin/inquiries"
            variant="outline"
            className="text-xs"
          >
            <EyeIcon className="w-4 h-4 mr-1" />
            Ver
          </Button>
          
          <Button<typeof Link> 
            as={Link}
            href="/admin/clients/new"
            variant="outline"
            className="justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Nuevo cliente
          </Button>
          
          <Button<typeof Link>
            as={Link}
            href="/admin/invoices/new"
            variant="outline"
            className="justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Nueva factura
          </Button>
        </div>
      </div>
    </div>
  );
}