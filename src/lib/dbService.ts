// dbService.ts - Server-side database operations using Prisma

import { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// ----- Schemas -------------------------------------------------------------

const ProductImageSchema = z.object({
  url: z.string().min(1),
  order: z.number().int().optional(),
});

const ProductTagSchema = z.object({
  name: z.string().min(1),
});

const ProductSpecificationSchema = z.object({
  id: z.string().optional(),
  key: z.string().min(1),
  value: z.string().min(1),
  order: z.number().int().optional(),
});

const ProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  categoryId: z.string().min(1),
  price: z.number().optional().nullable(),
  sku: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  order: z.number().int().optional(),
  images: z.array(ProductImageSchema).optional(),
  tags: z.array(ProductTagSchema).optional(),
  specifications: z.array(ProductSpecificationSchema).optional(),
});

const ProductUpdateSchema = ProductSchema.partial();

const CategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  order: z.number().int().optional(),
});

const CategoryUpdateSchema = CategorySchema.partial();

const PageSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  showInMenu: z.boolean().optional(),
  order: z.number().int().optional(),
});

const PageUpdateSchema = PageSchema.partial();

const SlideThumbnailSchema = z.object({
  url: z.string().min(1),
  order: z.number().int().optional(),
});

const HomepageSlideSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  desktopImage: z.string().min(1),
  mobileImage: z.string().min(1),
  link: z.string().optional().nullable(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
  thumbnails: z.array(SlideThumbnailSchema).optional(),
});

const HomepageSlideUpdateSchema = HomepageSlideSchema.partial();

// ----- Helpers -------------------------------------------------------------

const productInclude = {
  category: true,
  specifications: { orderBy: { order: 'asc' } },
  images: { orderBy: { order: 'asc' } },
  tags: true,
} satisfies Prisma.ProductInclude;

const slideInclude = {
  thumbnails: { orderBy: { order: 'asc' } },
} satisfies Prisma.HomepageSlideInclude;

// ----- Product operations --------------------------------------------------

export async function getProducts(options: {
  categoryId?: string;
  includeInactive?: boolean;
} = {}) {
  const { categoryId, includeInactive } = options;

  return prisma.product.findMany({
    where: {
      ...(categoryId ? { categoryId } : {}),
      ...(includeInactive ? {} : { isActive: true }),
    },
    include: productInclude,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: productInclude,
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });
}

export async function createProduct(data: unknown) {
  const validatedData = ProductSchema.parse(data);
  const { images, tags, specifications, ...productData } = validatedData;

  return prisma.product.create({
    data: {
      ...productData,
      images: images
        ? {
            create: images.map((image) => ({
              url: image.url,
              order: image.order ?? 0,
            })),
          }
        : undefined,
      tags: tags
        ? {
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag.name },
              create: { name: tag.name },
            })),
          }
        : undefined,
      specifications: specifications
        ? {
            create: specifications.map((spec) => ({
              key: spec.key,
              value: spec.value,
              order: spec.order ?? 0,
            })),
          }
        : undefined,
    },
    include: productInclude,
  });
}

export async function updateProduct(id: string, data: unknown) {
  const validatedData = ProductUpdateSchema.parse(data);
  const { images, tags, specifications, ...productData } = validatedData;

  return prisma.product.update({
    where: { id },
    data: {
      ...productData,
      images: images
        ? {
            deleteMany: {},
            create: images.map((image) => ({
              url: image.url,
              order: image.order ?? 0,
            })),
          }
        : undefined,
      tags: tags
        ? {
            set: [],
            connectOrCreate: tags.map((tag) => ({
              where: { name: tag.name },
              create: { name: tag.name },
            })),
          }
        : undefined,
      specifications: specifications
        ? {
            deleteMany: {},
            create: specifications.map((spec) => ({
              key: spec.key,
              value: spec.value,
              order: spec.order ?? 0,
            })),
          }
        : undefined,
    },
    include: productInclude,
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  });
}

// ----- Category operations -------------------------------------------------

export async function getCategories() {
  return prisma.productCategory.findMany({
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
  });
}

export async function getCategoryById(id: string) {
  return prisma.productCategory.findUnique({
    where: { id },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.productCategory.findUnique({
    where: { slug },
  });
}

export async function createCategory(data: unknown) {
  const validatedData = CategorySchema.parse(data);
  return prisma.productCategory.create({
    data: validatedData,
  });
}

export async function updateCategory(id: string, data: unknown) {
  const validatedData = CategoryUpdateSchema.parse(data);
  return prisma.productCategory.update({
    where: { id },
    data: validatedData,
  });
}

export async function deleteCategory(id: string) {
  return prisma.productCategory.delete({
    where: { id },
  });
}

// ----- Page operations -----------------------------------------------------

export async function getPages() {
  return prisma.page.findMany({
    orderBy: [{ order: 'asc' }, { title: 'asc' }],
  });
}

export async function getPageById(id: string) {
  return prisma.page.findUnique({
    where: { id },
  });
}

export async function getPageBySlug(slug: string) {
  return prisma.page.findUnique({
    where: { slug },
  });
}

export async function createPage(data: unknown) {
  const validatedData = PageSchema.parse(data);
  return prisma.page.create({
    data: validatedData,
  });
}

export async function updatePage(id: string, data: unknown) {
  const validatedData = PageUpdateSchema.parse(data);
  return prisma.page.update({
    where: { id },
    data: validatedData,
  });
}

export async function deletePage(id: string) {
  return prisma.page.delete({
    where: { id },
  });
}

// ----- Homepage slider operations -----------------------------------------

export async function getHomepageSlides(options: { includeInactive?: boolean } = {}) {
  const { includeInactive } = options;
  return prisma.homepageSlide.findMany({
    where: includeInactive ? {} : { isActive: true },
    include: slideInclude,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
}

export async function getHomepageSlideById(id: string) {
  return prisma.homepageSlide.findUnique({
    where: { id },
    include: slideInclude,
  });
}

export async function createHomepageSlide(data: unknown) {
  const validatedData = HomepageSlideSchema.parse(data);
  const { thumbnails, ...slideData } = validatedData;

  return prisma.homepageSlide.create({
    data: {
      ...slideData,
      thumbnails: thumbnails
        ? {
            create: thumbnails.map((thumb) => ({
              url: thumb.url,
              order: thumb.order ?? 0,
            })),
          }
        : undefined,
    },
    include: slideInclude,
  });
}

export async function updateHomepageSlide(id: string, data: unknown) {
  const validatedData = HomepageSlideUpdateSchema.parse(data);
  const { thumbnails, ...slideData } = validatedData;

  return prisma.homepageSlide.update({
    where: { id },
    data: {
      ...slideData,
      thumbnails: thumbnails
        ? {
            deleteMany: {},
            create: thumbnails.map((thumb) => ({
              url: thumb.url,
              order: thumb.order ?? 0,
            })),
          }
        : undefined,
    },
    include: slideInclude,
  });
}

export async function deleteHomepageSlide(id: string) {
  return prisma.homepageSlide.delete({
    where: { id },
  });
}

// ----- User operations -----------------------------------------------------

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(data: { email: string; name?: string; role?: string; passwordHash: string }) {
  return prisma.user.create({
    data,
  });
}

export async function updateUserPassword(id: string, passwordHash: string) {
  return prisma.user.update({
    where: { id },
    data: { passwordHash },
  });
}

export async function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateUserRecord(id: string, data: Prisma.UserUpdateInput) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}
