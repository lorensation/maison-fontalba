/**
 * Supabase Client Configuration
 * 
 * This file provides both client-side and server-side Supabase clients
 * for interacting with the database.
 */
import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client-side Supabase client (for use in browser/client components)
export function createBrowserSupabaseClient() {
  return createBrowserClient(
    supabaseUrl as string, 
    supabaseAnonKey as string
  );
}

// Server-side Supabase client (for use in Server Components and API routes)
export function createServerSupabaseClient() {
  // Using createClient directly with cookies in a server context
  return createClient(
    supabaseUrl as string,
    supabaseAnonKey as string,
    {
      auth: {
        // In Next.js App Router, cookies() must be directly called in your route handlers/server components
        // We handle auth manually with cookies for server components
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        headers: {
          // You can include cookies in your request headers for auth purposes
          // This can be enhanced with middleware if needed
        }
      }
    }
  );
}

// Legacy client for backward compatibility (consider migrating usage to the functions above)
export const supabaseClient = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);

// TypeScript interfaces for Supabase tables
export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  featured_image: string;
  images: string[];
  category_id: string;
  is_published: boolean;
  client_id: string | null;
  created_at: string;
  updated_at: string;
  quote_url?: string;
  categories?: { name: string };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  notes: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service_type: string | null;
  description: string;
  budget: string | null;
  timeline: string | null;
  is_read: boolean;
  created_at: string;
}

export interface Invoice {
  id: string;
  client_id: string;
  project_id: string | null;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  due_date: string | null;
  paid_date: string | null;
  notes: string | null;
  created_at: string;
}