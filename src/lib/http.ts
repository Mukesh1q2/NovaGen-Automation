import { NextResponse } from 'next/server'

export function errorResponse(status: number, message: string, code?: string) {
  return NextResponse.json({ error: { code: code ?? String(status), message } }, { status })
}

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data as any, init)
}