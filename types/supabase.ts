export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          short_description: string
          category_id: string | null
          featured_image: string
          images: string[]
          created_at: string
          updated_at: string | null
          published: boolean
        }
        Insert: {
          id?: string
          title: string
          description: string
          short_description: string
          category_id?: string | null
          featured_image: string
          images: string[]
          created_at?: string
          updated_at?: string | null
          published?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string
          short_description?: string
          category_id?: string | null
          featured_image?: string
          images?: string[]
          created_at?: string
          updated_at?: string | null
          published?: boolean
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          contact_person: string | null
          email: string | null
          phone: string | null
          address: string | null
          tax_id: string | null
          notes: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          tax_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          contact_person?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          tax_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      crm_projects: {
        Row: {
          id: string
          name: string
          client_id: string
          description: string | null
          start_date: string | null
          estimated_end_date: string | null
          status: "proposal" | "in_progress" | "completed" | "cancelled"
          created_at: string
          updated_at: string | null
          archived: boolean
        }
        Insert: {
          id?: string
          name: string
          client_id: string
          description?: string | null
          start_date?: string | null
          estimated_end_date?: string | null
          status?: "proposal" | "in_progress" | "completed" | "cancelled"
          created_at?: string
          updated_at?: string | null
          archived?: boolean
        }
        Update: {
          id?: string
          name?: string
          client_id?: string
          description?: string | null
          start_date?: string | null
          estimated_end_date?: string | null
          status?: "proposal" | "in_progress" | "completed" | "cancelled"
          created_at?: string
          updated_at?: string | null
          archived?: boolean
        }
      }
      milestones: {
        Row: {
          id: string
          project_id: string
          description: string
          date: string | null
          completed: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          project_id: string
          description: string
          date?: string | null
          completed?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          description?: string
          date?: string | null
          completed?: boolean
          created_at?: string
          updated_at?: string | null
        }
      }
      invoices: {
        Row: {
          id: string
          invoice_number: string
          client_id: string
          date: string
          description: string
          amount: number
          tax_rate: number | null
          total_amount: number
          status: "pending" | "paid"
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          invoice_number: string
          client_id: string
          date: string
          description: string
          amount: number
          tax_rate?: number | null
          total_amount: number
          status?: "pending" | "paid"
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          invoice_number?: string
          client_id?: string
          date?: string
          description?: string
          amount?: number
          tax_rate?: number | null
          total_amount?: number
          status?: "pending" | "paid"
          created_at?: string
          updated_at?: string | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          created_at: string
          read: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          created_at?: string
          read?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          created_at?: string
          read?: boolean
        }
      }
      quote_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          project_description: string
          service_type: string | null
          budget: string | null
          timeline: string | null
          created_at: string
          read: boolean
          converted_to_project: boolean
          project_id: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          project_description: string
          service_type?: string | null
          budget?: string | null
          timeline?: string | null
          created_at?: string
          read?: boolean
          converted_to_project?: boolean
          project_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          project_description?: string
          service_type?: string | null
          budget?: string | null
          timeline?: string | null
          created_at?: string
          read?: boolean
          converted_to_project?: boolean
          project_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
