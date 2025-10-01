// route.ts - API route for categories

import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getCategories, createCategory } from '@/lib/dbService'
import { requireAdminSession } from '@/lib/apiAuth'

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await getCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 },
    )
  }
}

// POST /api/categories - Create category
export async function POST(request: Request) {
  try {
    const session = await requireAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const category = await createCategory(body)
    return NextResponse.json({ category }, { status: 201 })
  } catch (error) {
    console.error('Failed to create category:', error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 },
    )
  }
}