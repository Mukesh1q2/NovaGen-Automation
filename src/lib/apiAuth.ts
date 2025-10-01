import { cookies } from 'next/headers'
import { SESSION_COOKIE_NAME, verifySessionToken } from './auth'

export async function requireAdminSession() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value
  if (!token) return null

  const session = await verifySessionToken(token)
  if (!session || session.role !== 'admin') {
    return null
  }

  return session
}
