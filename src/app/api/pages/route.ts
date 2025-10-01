import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getPages, createPage } from '@/lib/dbService'
import { requireAdminSession } from '@/lib/apiAuth'

// GET /api/pages - list pages
export async function GET() {
  try {
    const pages = await getPages()
    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Failed to fetch pages:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

// POST /api/pages - create page
export async function POST(request: Request) {
  try {
    const session = await requireAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const page = await createPage(body)
    return NextResponse.json({ page }, { status: 201 })
  } catch (error) {
    console.error('Failed to create page:', error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 })
  }
}
