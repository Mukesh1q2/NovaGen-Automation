// seed.ts - Seed the database with initial data

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Check if categories already exist
  const existingCategories = await prisma.productCategory.findMany()
  
  if (existingCategories.length === 0) {
    // Create categories
    const danfossCategory = await prisma.productCategory.create({
      data: {
        name: 'Danfoss',
        slug: 'danfoss',
        description: 'Danfoss industrial automation products',
        icon: 'settings',
        order: 1
      }
    })

    const siemensCategory = await prisma.productCategory.create({
      data: {
        name: 'Siemens',
        slug: 'siemens',
        description: 'Siemens automation and control systems',
        icon: 'zap',
        order: 2
      }
    })

    // Check if products already exist
    const existingProducts = await prisma.product.findMany()
    
    if (existingProducts.length === 0) {
      // Create sample products
      await prisma.product.create({
        data: {
          name: 'AC Drive VLT FC 302',
          slug: 'ac-drive-vlt-fc-302',
          description: 'Variable frequency drives for precise motor control and energy efficiency. Power range from 0.37 kW to 90 kW (0.5 HP to 125 HP). Features include advanced motor control algorithms, built-in EMC filter, multiple communication protocols, and energy optimization function.',
          shortDescription: 'Variable frequency drives for motor control',
          categoryId: danfossCategory.id,
          price: 1299.99,
          sku: 'VLT-FC-302',
          images: JSON.stringify(['/images/products/ac-drive-1.jpg']),
          tags: JSON.stringify(['drive', 'motor', 'control', 'energy']),
          isActive: true,
          order: 1
        }
      })

      await prisma.product.create({
        data: {
          name: 'Servo Motor SIMOTICS',
          slug: 'servo-motor-simotics',
          description: 'High-precision servo motors for demanding automation applications. Features include precise positioning, high torque density, and robust construction.',
          shortDescription: 'High-precision servo motors',
          categoryId: siemensCategory.id,
          price: 899.99,
          sku: 'SIMOTICS-S1',
          images: JSON.stringify(['/images/products/servo-1.jpg']),
          tags: JSON.stringify(['servo', 'motor', 'precision']),
          isActive: true,
          order: 1
        }
      })
      
      console.log('Database seeded successfully!')
    } else {
      console.log('Products already exist in the database.')
    }
  } else {
    console.log('Categories already exist in the database.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })