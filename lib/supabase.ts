import { createClient } from '@supabase/supabase-js'
import { type Database } from '@/types'

// Create a single supabase client for the entire app
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClient<Database>(supabaseUrl, supabaseKey)
}

export const supabase = createSupabaseClient()

// Auth helpers
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

export async function signUp(email: string, password: string, name: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (authError) throw authError
  
  if (authData.user) {
    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert([{ 
        id: authData.user.id, 
        email, 
        name 
      }])
    
    if (profileError) throw profileError
  }
  
  return authData
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  return true
}

export async function getUser() {
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return null
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()
  
  if (error || !data) return null
  
  return data
}

export async function updateUser(id: string, updates: Partial<{ name: string, avatar_url: string }>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}