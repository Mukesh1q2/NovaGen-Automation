import { NextResponse } from 'next/server'
import { ZodError, z } from 'zod'
import bcrypt from 'bcryptjs'
import { listUsers, createUser } from '@/lib/dbService'
import { requireAdminSession } from '@/lib/apiAuth'
import { Prisma } from '@prisma/client'

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  password: z.string().min(8),
})

export async function GET() {
  const session = await requireAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const users = await listUsers()
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const session = await requireAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const data = createUserSchema.parse(body)

    const passwordHash = await bcrypt.hash(data.password, 12)

    const user = await createUser({
      email: data.email.toLowerCase(),
      name: data.name,
      role: data.role ?? 'editor',
      passwordHash,
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }, { status: 201 })
  } catch (error) {
    console.error('Failed to create user:', error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: 'A user with that email already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
