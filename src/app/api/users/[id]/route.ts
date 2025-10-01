import { NextResponse } from 'next/server'
import { ZodError, z } from 'zod'
import bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'
import { requireAdminSession } from '@/lib/apiAuth'
import { listUsers, updateUserRecord, deleteUser } from '@/lib/dbService'

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  password: z.string().min(8).optional(),
})

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const data = updateUserSchema.parse(body)

    const updateData: Prisma.UserUpdateInput = {}
    if (data.name !== undefined) {
      updateData.name = data.name
    }
    if (data.role !== undefined) {
      updateData.role = data.role
    }
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 12)
    }

    const user = await updateUserRecord(params.id, updateData)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  } catch (error) {
    console.error('Failed to update user:', error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await requireAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Prevent deleting the last admin user
    const users = await listUsers()
    const adminCount = users.filter((user) => user.role === 'admin').length

    const target = users.find((user) => user.id === params.id)
    if (!target) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (target.role === 'admin' && adminCount <= 1) {
      return NextResponse.json({ error: 'At least one admin user must remain' }, { status: 400 })
    }

    await deleteUser(params.id)
    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Failed to delete user:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
