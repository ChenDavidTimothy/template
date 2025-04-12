// User type
export type User = {
    id: string
    email: string
    name: string
    avatar_url?: string
    created_at: string
    updated_at?: string
  }
  
  // Database type for Supabase
  export interface Database {
    public: {
      Tables: {
        users: {
          Row: {
            id: string
            email: string
            name: string
            avatar_url: string | null
            created_at: string
            updated_at: string | null
          }
          Insert: {
            id: string
            email: string
            name: string
            avatar_url?: string | null
            created_at?: string
            updated_at?: string | null
          }
          Update: {
            id?: string
            email?: string
            name?: string
            avatar_url?: string | null
            created_at?: string
            updated_at?: string | null
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