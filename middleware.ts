import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })
  
  // Get session
  const { data: { session } } = await supabase.auth.getSession()
  
  // Check if we're on a protected route
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard") ||
                          request.nextUrl.pathname.startsWith("/profile") 
  
  // Check if we're on an auth route (login, register)
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth/login") ||
                     request.nextUrl.pathname.startsWith("/auth/register")
  
  // Handle protected routes - redirect to login if not authenticated
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL("/auth/login", request.url)
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }
  
  // Handle auth routes - redirect to dashboard if already authenticated
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/profile/:path*',
    '/auth/login',
    '/auth/register',
  ],
}