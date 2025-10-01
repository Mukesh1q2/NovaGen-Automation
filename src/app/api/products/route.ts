// route.ts - API route for products

import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getProducts, createProduct } from '@/lib/dbService'
import { requireAdminSession } from '@/lib/apiAuth'

// GET /api/products - Get all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId') ?? undefined
    const includeInactive = searchParams.get('includeInactive') === 'true'

    const products = await getProducts({
      categoryId,
      includeInactive,
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const session = await requireAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const product = await createProduct(body)
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Failed to create product:', error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
