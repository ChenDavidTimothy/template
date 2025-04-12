import { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Link
        href="/"
        className="mb-8 text-lg font-bold"
      >
        Next.js App
      </Link>
      <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-sm">
        <AuthForm type="login" />
      </div>
    </div>
  )
}