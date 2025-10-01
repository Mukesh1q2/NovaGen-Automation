import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Mark this route as dynamic to prevent static optimization issues
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Get the active theme (default to first default theme if none is active)
    const activeTheme = await prisma.themeSetting.findFirst({
      where: { 
        isActive: true
      },
      orderBy: { 
        updatedAt: 'desc'   // Most recently updated active theme
      },
    })

    // If no active theme found, get the default theme
    if (!activeTheme) {
      const defaultTheme = await prisma.themeSetting.findFirst({
        where: { 
          isDefault: true
        },
        orderBy: { 
          createdAt: 'asc'   // Oldest default theme
        },
      })
      
      if (defaultTheme) {
        return NextResponse.json({ theme: defaultTheme })
      }
    }

    // If no theme is found, return null
    if (!activeTheme) {
      return NextResponse.json({ theme: null })
    }

    return NextResponse.json({ theme: activeTheme })
  } catch (error) {
    // Log error to monitoring service in production
    return NextResponse.json({ error: 'Failed to fetch active theme' }, { status: 500 })
  }
}
