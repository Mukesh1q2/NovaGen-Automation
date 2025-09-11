// route.ts - API route for categories

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/dbService'

// GET /api/categories - Get all categories
export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}