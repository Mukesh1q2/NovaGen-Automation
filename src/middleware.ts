import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/lib/auth'

export const config = {
  matcher: ['/admin/:path*'],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('[Middleware] Checking path:', pathname)

  if (pathname === '/admin/login') {
    console.log('[Middleware] Login page - allowing access')
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  console.log('[Middleware] Session token present:', !!token)
  if (!token) {
    console.log('[Middleware] No token - redirecting to login')
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const session = await verifySessionToken(token)
  console.log('[Middleware] Session verified:', !!session, session ? `for user: ${session.email}` : '')
  if (!session) {
    console.log('[Middleware] Invalid session - redirecting to login and clearing cookie')
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.set(SESSION_COOKIE_NAME, '', {
      path: '/',
      maxAge: 0,
    })
    return response
  }

  console.log('[Middleware] Access granted to:', pathname)
  return NextResponse.next()
}
