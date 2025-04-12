"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const { user, signOut, isLoading } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold">
            Next.js App
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground",
                pathname === "/" && "text-foreground"
              )}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-foreground",
                    pathname === "/dashboard" && "text-foreground"
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-foreground",
                    pathname === "/profile" && "text-foreground"
                  )}
                >
                  Profile
                </Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isLoading ? (
            <div className="h-9 w-20 bg-muted animate-pulse rounded" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:inline-block">
                {user.name || user.email}
              </span>
              <button 
                onClick={() => signOut()}
                className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                href="/auth/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/register"
                className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 flex items-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}