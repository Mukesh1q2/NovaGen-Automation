import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkThemes() {
  try {
    const themes = await prisma.themeSetting.findMany()
    console.log('Themes in database:', themes)
    
    // Check for active themes
    const activeThemes = await prisma.themeSetting.findMany({
      where: { 
        isActive: true
      }
    })
    
    console.log('Active themes:', activeThemes)
    
    // Check for default themes
    const defaultThemes = await prisma.themeSetting.findMany({
      where: { 
        isDefault: true
      }
    })
    
    console.log('Default themes:', defaultThemes)
  } catch (error) {
    console.error('Error checking themes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkThemes()