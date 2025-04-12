"use client"

import { useAuth } from "@/lib/auth"
import { Header } from "@/components/header"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          {isLoading ? (
            <div className="h-24 w-full max-w-md bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Welcome back, {user.name || user.email}!
              </p>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 bg-background border border-border rounded-md shadow-sm">
                  <h3 className="font-medium mb-2">Quick Start</h3>
                  <p className="text-sm text-muted-foreground">
                    Get started with your project by exploring the dashboard.
                  </p>
                </div>
                
                <div className="p-6 bg-background border border-border rounded-md shadow-sm">
                  <h3 className="font-medium mb-2">Your Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your profile information and settings.
                  </p>
                </div>
                
                <div className="p-6 bg-background border border-border rounded-md shadow-sm">
                  <h3 className="font-medium mb-2">Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Check out the documentation to learn more.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>Please sign in to view your dashboard.</p>
          )}
        </div>
      </main>
    </div>
  )
}