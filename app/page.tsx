import Link from "next/link"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to Next.js App
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  A minimal starter template with Next.js, Tailwind CSS, and Supabase.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/auth/register"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Authentication Ready</h3>
                <p className="text-muted-foreground">
                  Complete authentication flow with Supabase.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Styled with Tailwind</h3>
                <p className="text-muted-foreground">
                  Modern styling with Tailwind CSS v4.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Dark Mode</h3>
                <p className="text-muted-foreground">
                  Built-in dark mode support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Next.js App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}