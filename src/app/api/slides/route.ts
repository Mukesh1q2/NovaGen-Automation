import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { getHomepageSlides, createHomepageSlide } from '@/lib/dbService'
import { requireAdminSession } from '@/lib/apiAuth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'
    const slides = await getHomepageSlides({ includeInactive })
    return NextResponse.json(slides)
  } catch (error) {
    console.error('Failed to fetch slides:', error)
    return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const slide = await createHomepageSlide(body)
    return NextResponse.json({ slide }, { status: 201 })
  } catch (error) {
    console.error('Failed to create slide:', error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 })
  }
}
