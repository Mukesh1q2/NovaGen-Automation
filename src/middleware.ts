// middleware.ts - Next.js middleware to protect admin routes

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip authentication for login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // For demo purposes, we'll check for a cookie
    // In production, you would implement proper authentication
    const adminToken = request.cookies.get('admin_token')
    
    if (!adminToken || adminToken.value !== 'demo_admin_token') {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/admin/:path*'],
}