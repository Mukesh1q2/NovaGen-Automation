
// seed.ts - Seed the database with initial data

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seedUsers() {
  const adminEmail = 'admin@novagenautomation.com'
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin@123', 12)
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'NovaGen Administrator',
        role: 'admin',
        passwordHash,
      },
    })
    console.log('Created default admin user: admin@novagenautomation.com / Admin@123')
  }
}

async function seedCategoriesAndProducts() {
  const categories = [
    {
      name: 'Danfoss',
      slug: 'danfoss',
      description: 'Danfoss industrial automation products',
      icon: 'settings',
      order: 1,
      products: [
        {
          name: 'AC Drive VLT FC 302',
          slug: 'ac-drive-vlt-fc-302',
          description:
            'Variable frequency drives for precise motor control and energy efficiency. Power range from 0.37 kW to 90 kW (0.5 HP to 125 HP). Features include advanced motor control algorithms, built-in EMC filter, multiple communication protocols, and energy optimization function.',
          shortDescription: 'Variable frequency drives for motor control',
          price: 1299.99,
          sku: 'VLT-FC-302',
          order: 1,
          images: ['/images/products/ac-drive-1.jpg'],
          tags: ['drive', 'motor', 'control', 'energy'],
        },
      ],
    },
    {
      name: 'Siemens',
      slug: 'siemens',
      description: 'Siemens automation and control systems',
      icon: 'zap',
      order: 2,
      products: [
        {
          name: 'Servo Motor SIMOTICS',
          slug: 'servo-motor-simotics',
          description:
            'High-precision servo motors for demanding automation applications. Features include precise positioning, high torque density, and robust construction.',
          shortDescription: 'High-precision servo motors',
          price: 899.99,
          sku: 'SIMOTICS-S1',
          order: 1,
          images: ['/images/products/servo-1.jpg'],
          tags: ['servo', 'motor', 'precision'],
        },
      ],
    },
  ]

  for (const category of categories) {
    const createdCategory = await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        icon: category.icon,
        order: category.order,
      },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        order: category.order,
      },
    })

    for (const product of category.products) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {
          name: product.name,
          description: product.description,
          shortDescription: product.shortDescription,
          price: product.price,
          sku: product.sku,
          order: product.order,
          isActive: true,
          categoryId: createdCategory.id,
          images: {
            deleteMany: {},
            create: product.images.map((url, index) => ({ url, order: index })),
          },
          tags: {
            set: [],
            connectOrCreate: product.tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
        create: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          shortDescription: product.shortDescription,
          price: product.price,
          sku: product.sku,
          order: product.order,
          isActive: true,
          category: { connect: { id: createdCategory.id } },
          images: {
            create: product.images.map((url, index) => ({ url, order: index })),
          },
          tags: {
            connectOrCreate: product.tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      })
    }
  }
}

async function seedPages() {
  const pages = [
    {
      title: 'Privacy Policy',
      slug: 'privacy',
      content: null,
      isActive: true,
      showInMenu: false,
      order: 99,
    },
    {
      title: 'Vision & Mission',
      slug: 'vision',
      content: null,
      isActive: true,
      showInMenu: true,
      order: 4,
    },
  ]

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    })
  }
}

async function seedSlides() {
  const slides = [
    {
      title: 'A.C Drive',
      description: 'NovaGen Automation dealing in AC drives, soft starter & many more products of Danfoss Industries.',
      desktopImage: '/images/hero/ac-drive-desktop.jpg',
      mobileImage: '/images/hero/ac-drive-mobile.jpg',
      link: '/products/danfoss',
      order: 1,
      thumbnails: ['/images/products/ac-drive-1.jpg', '/images/products/ac-drive-2.jpg', '/images/products/ac-drive-3.jpg'],
    },
    {
      title: 'Filter Drier & Pressure Transmitter',
      description: 'NovaGen Automation dealing in Valve, Filter Drier, Pressure Transmitter, refrigeration compressor & many more products of Danfoss Industries.',
      desktopImage: '/images/hero/filter-drier-desktop.jpg',
      mobileImage: '/images/hero/filter-drier-mobile.jpg',
      link: '/quote',
      order: 2,
      thumbnails: ['/images/products/filter-drier-1.jpg', '/images/products/filter-drier-2.jpg'],
    },
    {
      title: 'Servo Motors & Drives',
      description: 'NovaGen Automation dealing in Servo Motor, Servo Drive, PLC, HMI, Cable, CPU & other accessories of Siemens make.',
      desktopImage: '/images/hero/servo-desktop.jpg',
      mobileImage: '/images/hero/servo-mobile.jpg',
      link: '/products/siemens',
      order: 3,
      thumbnails: ['/images/products/servo-1.jpg', '/images/products/servo-2.jpg', '/images/products/servo-3.jpg'],
    },
  ]

  await prisma.homepageSlide.deleteMany()

  for (const slide of slides) {
    await prisma.homepageSlide.create({
      data: {
        title: slide.title,
        description: slide.description,
        desktopImage: slide.desktopImage,
        mobileImage: slide.mobileImage,
        link: slide.link,
        order: slide.order,
        isActive: true,
        thumbnails: {
          create: slide.thumbnails.map((url, index) => ({ url, order: index })),
        },
      },
    })
  }
}

async function main() {
  await seedUsers()
  await seedCategoriesAndProducts()
  await seedPages()
  await seedSlides()
  console.log('Seeding complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
