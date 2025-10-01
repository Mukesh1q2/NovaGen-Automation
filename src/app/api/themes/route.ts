import { NextResponse } from 'next/server'
import { requireAdminSession } from '@/lib/apiAuth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Anyone can fetch themes (for display purposes)
    const session = await requireAdminSession()
    const isAdmin = !!session

    // Get all theme settings
    const themes = await prisma.themeSetting.findMany({
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({ themes, isAdmin })
  } catch (error) {
    console.error('Failed to fetch themes:', error)
    return NextResponse.json({ error: 'Failed to fetch themes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Check if user is admin (super-admin)
    const session = await requireAdminSession()
    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, label, config, isActive, isDefault } = body

    // Validate required fields
    if (!name || !label || !config) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // If this theme is set as default, unset the current default
    if (isDefault) {
      await prisma.themeSetting.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      })
    }

    // If this theme is set as active, unset the current active (unless it's default)
    if (isActive) {
      await prisma.themeSetting.updateMany({
        where: { isActive: true, isDefault: false },
        data: { isActive: false },
      })
    }

    // Create or update the theme
    const theme = await prisma.themeSetting.upsert({
      where: { name },
      update: {
        label,
        config,
        isActive,
        isDefault,
        updatedBy: session.uid,
      },
      create: {
        name,
        label,
        config,
        isActive,
        isDefault,
        createdBy: session.uid,
        updatedBy: session.uid,
      },
    })

    return NextResponse.json({ theme })
  } catch (error) {
    console.error('Failed to save theme:', error)
    return NextResponse.json({ error: 'Failed to save theme' }, { status: 500 })
  }
}