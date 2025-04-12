"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase, getUser } from "./supabase"
import { type User } from "@/types"

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Set up auth state listener
    const { data } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        const currentUser = await getUser()
        setUser(currentUser)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
      setIsLoading(false)
    })

    // Initial user check
    const checkUser = async () => {
      const currentUser = await getUser()
      setUser(currentUser)
      setIsLoading(false)
    }

    checkUser()

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return {
    user,
    isLoading,
    signOut,
  }
}