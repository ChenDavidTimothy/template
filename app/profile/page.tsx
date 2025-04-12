"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { updateUser } from "@/lib/supabase"
import { Header } from "@/components/header"

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)
  const [name, setName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null)
  
  // Initialize form with user data when loaded
  useState(() => {
    if (user) {
      setName(user.name || "")
      setAvatarUrl(user.avatar_url || "")
    }
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) return
    
    setIsUpdating(true)
    setMessage(null)
    
    try {
      await updateUser(user.id, {
        name,
        avatar_url: avatarUrl
      })
      
      setMessage({
        text: "Profile updated successfully!",
        type: "success"
      })
    } catch (error) {
      console.error(error)
      setMessage({
        text: "Failed to update profile. Please try again.",
        type: "error"
      })
    } finally {
      setIsUpdating(false)
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          
          {isLoading ? (
            <div className="h-64 w-full max-w-md bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <div className="max-w-md space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user.email}
                    className="w-full p-2 border border-border rounded-md bg-muted"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Your email cannot be changed
                  </p>
                </div>
                
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
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="avatar" className="text-sm font-medium">
                    Avatar URL
                  </label>
                  <input
                    id="avatar"
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a URL to your profile picture
                  </p>
                </div>
                
                {message && (
                  <div className={`p-2 rounded-md ${
                    message.type === "success" 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {message.text}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium 
                           hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          ) : (
            <p>Please sign in to view your profile.</p>
          )}
        </div>
      </main>
    </div>
  )
}