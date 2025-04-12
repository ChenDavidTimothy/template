"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn, signUp } from "@/lib/supabase"

interface AuthFormProps {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form values
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      if (type === "login") {
        await signIn(email, password)
        router.push("/dashboard")
      } else {
        await signUp(email, password, name)
        router.push("/auth/login?registered=true")
      }
    } catch (err) {
      console.error(err)
      setError(type === "login" 
        ? "Invalid login credentials. Please try again." 
        : "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">
          {type === "login" ? "Sign In" : "Create Account"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {type === "login" 
            ? "Enter your credentials to access your account" 
            : "Enter your information to create an account"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "register" && (
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background"
              required
            />
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-border rounded-md bg-background"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-border rounded-md bg-background"
            required
          />
        </div>
        
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-2 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-primary text-primary-foreground rounded-md font-medium 
                    hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading
            ? "Processing..."
            : type === "login"
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        {type === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-accent hover:underline">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent hover:underline">
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  )
}