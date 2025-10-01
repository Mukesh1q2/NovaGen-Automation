import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getUserByEmail } from '@/lib/dbService'
import { createSessionToken, getSessionCookieOptions, SESSION_COOKIE_NAME } from '@/lib/auth'
import { errorResponse } from '@/lib/http'
import { rateLimit, getClientKey } from '@/lib/rateLimit'

export async function POST(request: Request) {
  try {
    // Rate limit by client key (IP/User-Agent) to mitigate brute-force attempts
    const key = getClientKey(request)
    const limit = rateLimit(`login:${key}`, { windowMs: 60_000, max: 10 })
    if (!limit.allowed) {
      return errorResponse(429, 'Too many login attempts. Please try again later.', 'RATE_LIMITED')
    }

    let email, password
    
    try {
      const body = await request.json()
      email = body.email
      password = body.password
    } catch (parseError) {
      // Invalid JSON in request body
      return errorResponse(400, 'Invalid request body', 'INVALID_BODY')
    }

    if (!email || !password) {
      return errorResponse(400, 'Email and password are required', 'MISSING_FIELDS')
    }

    const user = await getUserByEmail(String(email).toLowerCase())
    console.log('[Login API] User lookup:', user ? 'Found' : 'Not found', 'for email:', email)
    if (!user || !user.passwordHash) {
      return errorResponse(401, 'Invalid credentials', 'INVALID_CREDENTIALS')
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    console.log('[Login API] Password match:', passwordMatch)
    if (!passwordMatch) {
      return errorResponse(401, 'Invalid credentials', 'INVALID_CREDENTIALS')
    }

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    const response = NextResponse.json({ success: true })
    const cookieOptions = getSessionCookieOptions()
    console.log('[Login API] Setting session cookie:', SESSION_COOKIE_NAME, 'with options:', cookieOptions)
    response.cookies.set(
      SESSION_COOKIE_NAME,
      token,
      cookieOptions,
    )
    console.log('[Login API] Login successful for user:', user.email)

    return response
  } catch (error) {
    // Log error to monitoring service in production
    console.error('[Login API] Error occurred:', error)
    return errorResponse(500, 'Unable to login', 'LOGIN_FAILED')
  }
}
