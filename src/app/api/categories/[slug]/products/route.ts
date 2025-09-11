// route.ts - API route for products by category

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/dbService'

// GET /api/categories/[slug]/products - Get products by category slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // First get the category by slug
    const category = await prisma.productCategory.findUnique({
      where: { slug: params.slug }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Then get products in that category
    const products = await prisma.product.findMany({
      where: { 
        categoryId: category.id,
        isActive: true
      },
      include: {
        category: true
      },
      orderBy: { order: 'asc' }
    })

    // Parse JSON strings back to arrays
    const productsWithArrays = products.map(product => ({
      ...product,
      images: JSON.parse(product.images),
      tags: JSON.parse(product.tags)
    }))

    return NextResponse.json({ products: productsWithArrays })
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}