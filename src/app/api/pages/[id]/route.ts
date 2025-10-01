import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { getPageById, updatePage, deletePage } from '@/lib/dbService'
import { requireAdminSession } from '@/lib/apiAuth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const page = await getPageById(params.id)
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }
    return NextResponse.json({ page })
  } catch (error) {
    console.error('Failed to fetch page:', error)
    return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const page = await updatePage(params.id, body)
    return NextResponse.json({ page })
  } catch (error) {
    console.error('Failed to update page:', error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await deletePage(params.id)
    return NextResponse.json({ message: 'Page deleted successfully' })
  } catch (error) {
    console.error('Failed to delete page:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 })
  }
}
