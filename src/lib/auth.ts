import { SignJWT, jwtVerify, JWTPayload } from 'jose'

export const SESSION_COOKIE_NAME = 'admin_session'
const DEFAULT_SESSION_DURATION = 60 * 60 * 24 // 24 hours in seconds

function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error('AUTH_SECRET environment variable is not set')
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(payload: { userId: string; email: string; role: string }) {
  const secret = getAuthSecret()
  return new SignJWT({ uid: payload.userId, email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(`${DEFAULT_SESSION_DURATION}s`)
    .sign(secret)
}

export interface SessionPayload extends JWTPayload {
  uid: string
  email: string
  role: string
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const secret = getAuthSecret()
    const { payload } = await jwtVerify(token, secret)
    if (!payload || typeof payload.uid !== 'string') {
      return null
    }
    return payload as SessionPayload
  } catch (error) {
    console.error('Failed to verify session token', error)
    return null
  }
}

export function getSessionCookieOptions(): {
  httpOnly: boolean
  sameSite: 'lax'
  secure: boolean
  path: string
  maxAge: number
} {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: DEFAULT_SESSION_DURATION,
  }
}
