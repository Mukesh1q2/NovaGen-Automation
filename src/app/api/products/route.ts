// route.ts - API route for products

import { NextResponse } from 'next/server'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '@/lib/db'

// GET /api/products - Get all products
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    
    let products = getProducts()
    
    if (categoryId) {
      products = products.filter(product => product.categoryId === categoryId)
    }
    
    return NextResponse.json({ products })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const product = createProduct(body)
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}