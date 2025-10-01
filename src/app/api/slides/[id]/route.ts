import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { getHomepageSlideById, updateHomepageSlide, deleteHomepageSlide } from '@/lib/dbService'
import { requireAdminSession } from '@/lib/apiAuth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const slide = await getHomepageSlideById(params.id)
    if (!slide) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 })
    }
    return NextResponse.json({ slide })
  } catch (error) {
    console.error('Failed to fetch slide:', error)
    return NextResponse.json({ error: 'Failed to fetch slide' }, { status: 500 })
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
    const slide = await updateHomepageSlide(params.id, body)
    return NextResponse.json({ slide })
  } catch (error) {
    console.error('Failed to update slide:', error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update slide' }, { status: 500 })
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

    await deleteHomepageSlide(params.id)
    return NextResponse.json({ message: 'Slide deleted successfully' })
  } catch (error) {
    console.error('Failed to delete slide:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 })
  }
}
