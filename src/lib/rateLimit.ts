// Simple in-memory rate limiter (sliding window) for development/staging
// For production, replace with a distributed store (Redis) implementation

const windows = new Map<string, { count: number; resetAt: number }>()

export interface RateLimitOptions {
  windowMs: number // e.g., 60_000 for 1 minute
  max: number // max requests per window
}

export function rateLimit(key: string, opts: RateLimitOptions) {
  const now = Date.now()
  const rec = windows.get(key)
  if (!rec || rec.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + opts.windowMs })
    return { allowed: true, remaining: opts.max - 1, resetAt: now + opts.windowMs }
  }
  if (rec.count < opts.max) {
    rec.count += 1
    return { allowed: true, remaining: opts.max - rec.count, resetAt: rec.resetAt }
  }
  return { allowed: false, remaining: 0, resetAt: rec.resetAt }
}

export function getClientKey(request: Request) {
  // Attempt to derive a key from headers; fallback to user-agent
  // In production behind a proxy, use x-forwarded-for or trusted proxy headers
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0]?.trim()
  const ua = request.headers.get('user-agent') || 'unknown'
  return ip ? `ip:${ip}` : `ua:${ua}`
}