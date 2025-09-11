// dbService.ts - Server-side database operations using Prisma

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Product operations
export async function getProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
      specifications: true
    }
  })
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      specifications: true
    }
  })
}

export async function createProduct(data: any) {
  return prisma.product.create({
    data: {
      ...data,
      images: JSON.stringify(data.images || []),
      tags: JSON.stringify(data.tags || [])
    },
    include: {
      category: true,
      specifications: true
    }
  })
}

export async function updateProduct(id: string, data: any) {
  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      images: data.images ? JSON.stringify(data.images) : undefined,
      tags: data.tags ? JSON.stringify(data.tags) : undefined
    },
    include: {
      category: true,
      specifications: true
    }
  })
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id }
  })
}

// Category operations
export async function getCategories() {
  return prisma.productCategory.findMany()
}

export async function getCategoryById(id: string) {
  return prisma.productCategory.findUnique({
    where: { id }
  })
}

export async function createCategory(data: any) {
  return prisma.productCategory.create({
    data
  })
}

export async function updateCategory(id: string, data: any) {
  return prisma.productCategory.update({
    where: { id },
    data
  })
}

export async function deleteCategory(id: string) {
  return prisma.productCategory.delete({
    where: { id }
  })
}