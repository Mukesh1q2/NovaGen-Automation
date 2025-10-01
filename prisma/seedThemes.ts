import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedThemes() {
  console.log('Seeding default themes...')

  const defaultThemes = [
    {
      name: 'light',
      label: 'Light',
      config: JSON.stringify({
        name: 'light',
        label: 'Light',
        primary: 'oklch(0.205 0 0)',
        primaryForeground: 'oklch(0.985 0 0)',
        secondary: 'oklch(0.97 0 0)',
        secondaryForeground: 'oklch(0.205 0 0)',
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.145 0 0)',
        card: 'oklch(1 0 0)',
        cardForeground: 'oklch(0.145 0 0)',
        popover: 'oklch(1 0 0)',
        popoverForeground: 'oklch(0.145 0 0)',
        muted: 'oklch(0.97 0 0)',
        mutedForeground: 'oklch(0.556 0 0)',
        accent: 'oklch(0.97 0 0)',
        accentForeground: 'oklch(0.205 0 0)',
        border: 'oklch(0.922 0 0)',
        input: 'oklch(0.922 0 0)',
        ring: 'oklch(0.708 0 0)',
      }),
      isActive: false,
      isDefault: true,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'dark',
      label: 'Dark',
      config: JSON.stringify({
        name: 'dark',
        label: 'Dark',
        primary: 'oklch(0.922 0 0)',
        primaryForeground: 'oklch(0.205 0 0)',
        secondary: 'oklch(0.269 0 0)',
        secondaryForeground: 'oklch(0.985 0 0)',
        background: 'oklch(0.145 0 0)',
        foreground: 'oklch(0.985 0 0)',
        card: 'oklch(0.205 0 0)',
        cardForeground: 'oklch(0.985 0 0)',
        popover: 'oklch(0.205 0 0)',
        popoverForeground: 'oklch(0.985 0 0)',
        muted: 'oklch(0.269 0 0)',
        mutedForeground: 'oklch(0.708 0 0)',
        accent: 'oklch(0.269 0 0)',
        accentForeground: 'oklch(0.985 0 0)',
        border: 'oklch(1 0 0 / 10%)',
        input: 'oklch(1 0 0 / 15%)',
        ring: 'oklch(0.556 0 0)',
      }),
      isActive: false,
      isDefault: false,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'ocean',
      label: 'Ocean',
      config: JSON.stringify({
        name: 'ocean',
        label: 'Ocean',
        primary: 'oklch(0.4 0.1 200)',
        primaryForeground: 'oklch(0.95 0.03 200)',
        secondary: 'oklch(0.8 0.03 200)',
        secondaryForeground: 'oklch(0.1 0.03 200)',
        background: 'oklch(0.9 0.03 200)',
        foreground: 'oklch(0.1 0.03 200)',
        card: 'oklch(0.95 0.03 200)',
        cardForeground: 'oklch(0.1 0.03 200)',
        popover: 'oklch(0.95 0.03 200)',
        popoverForeground: 'oklch(0.1 0.03 200)',
        muted: 'oklch(0.9 0.03 200)',
        mutedForeground: 'oklch(0.4 0.03 200)',
        accent: 'oklch(0.85 0.03 200)',
        accentForeground: 'oklch(0.1 0.03 200)',
        border: 'oklch(0.8 0.03 200)',
        input: 'oklch(0.85 0.03 200)',
        ring: 'oklch(0.4 0.1 200)',
      }),
      isActive: false,
      isDefault: false,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'twilight',
      label: 'Twilight',
      config: JSON.stringify({
        name: 'twilight',
        label: 'Twilight',
        primary: 'oklch(0.6 0.15 270)',
        primaryForeground: 'oklch(0.1 0.05 270)',
        secondary: 'oklch(0.3 0.05 270)',
        secondaryForeground: 'oklch(0.9 0.05 270)',
        background: 'oklch(0.2 0.05 270)',
        foreground: 'oklch(0.9 0.05 270)',
        card: 'oklch(0.25 0.05 270)',
        cardForeground: 'oklch(0.9 0.05 270)',
        popover: 'oklch(0.25 0.05 270)',
        popoverForeground: 'oklch(0.9 0.05 270)',
        muted: 'oklch(0.25 0.05 270)',
        mutedForeground: 'oklch(0.7 0.05 270)',
        accent: 'oklch(0.3 0.05 270)',
        accentForeground: 'oklch(0.9 0.05 270)',
        border: 'oklch(0.3 0.05 270)',
        input: 'oklch(0.3 0.05 270)',
        ring: 'oklch(0.6 0.15 270)',
      }),
      isActive: false,
      isDefault: false,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'slate',
      label: 'Slate',
      config: JSON.stringify({
        name: 'slate',
        label: 'Slate',
        primary: 'oklch(0.5 0.05 240)',
        primaryForeground: 'oklch(0.9 0.02 240)',
        secondary: 'oklch(0.7 0.02 240)',
        secondaryForeground: 'oklch(0.2 0.02 240)',
        background: 'oklch(0.8 0.02 240)',
        foreground: 'oklch(0.2 0.02 240)',
        card: 'oklch(0.85 0.02 240)',
        cardForeground: 'oklch(0.2 0.02 240)',
        popover: 'oklch(0.85 0.02 240)',
        popoverForeground: 'oklch(0.2 0.02 240)',
        muted: 'oklch(0.8 0.02 240)',
        mutedForeground: 'oklch(0.5 0.02 240)',
        accent: 'oklch(0.75 0.02 240)',
        accentForeground: 'oklch(0.2 0.02 240)',
        border: 'oklch(0.7 0.02 240)',
        input: 'oklch(0.75 0.02 240)',
        ring: 'oklch(0.5 0.05 240)',
      }),
      isActive: false,
      isDefault: false,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'blue',
      label: 'Blue',
      config: JSON.stringify({
        name: 'blue',
        label: 'Blue',
        primary: 'oklch(0.4 0.2 240)',
        primaryForeground: 'oklch(0.95 0.01 240)',
        secondary: 'oklch(0.85 0.01 240)',
        secondaryForeground: 'oklch(0.15 0.01 240)',
        background: 'oklch(0.95 0.02 240)',
        foreground: 'oklch(0.15 0.02 240)',
        card: 'oklch(0.9 0.01 240)',
        cardForeground: 'oklch(0.15 0.01 240)',
        popover: 'oklch(0.9 0.01 240)',
        popoverForeground: 'oklch(0.15 0.01 240)',
        muted: 'oklch(0.9 0.01 240)',
        mutedForeground: 'oklch(0.5 0.01 240)',
        accent: 'oklch(0.8 0.05 240)',
        accentForeground: 'oklch(0.15 0.01 240)',
        border: 'oklch(0.85 0.01 240)',
        input: 'oklch(0.8 0.01 240)',
        ring: 'oklch(0.4 0.2 240)',
      }),
      isActive: false,
      isDefault: false,
      createdBy: 'system',
      updatedBy: 'system',
    },
    {
      name: 'purple',
      label: 'Purple',
      config: JSON.stringify({
        name: 'purple',
        label: 'Purple',
        primary: 'oklch(0.5 0.2 300)',
        primaryForeground: 'oklch(0.95 0.01 300)',
        secondary: 'oklch(0.85 0.01 300)',
        secondaryForeground: 'oklch(0.15 0.01 300)',
        background: 'oklch(0.95 0.01 300)',
        foreground: 'oklch(0.15 0.01 300)',
        card: 'oklch(0.9 0.01 300)',
        cardForeground: 'oklch(0.15 0.01 300)',
        popover: 'oklch(0.9 0.01 300)',
        popoverForeground: 'oklch(0.15 0.01 300)',
        muted: 'oklch(0.9 0.01 300)',
        mutedForeground: 'oklch(0.5 0.01 300)',
        accent: 'oklch(0.8 0.05 300)',
        accentForeground: 'oklch(0.15 0.01 300)',
        border: 'oklch(0.85 0.01 300)',
        input: 'oklch(0.8 0.01 300)',
        ring: 'oklch(0.5 0.2 300)',
      }),
      isActive: false,
      isDefault: false,
      createdBy: 'system',
      updatedBy: 'system',
    },
  ]

  try {
    // Check if themes already exist
    const existingThemes = await prisma.themeSetting.findMany()
    
    if (existingThemes.length === 0) {
      // Create all default themes
      for (const theme of defaultThemes) {
        await prisma.themeSetting.create({
          data: theme,
        })
        console.log(`Created theme: ${theme.name}`)
      }
      console.log('All default themes created successfully!')
    } else {
      console.log('Themes already exist in database, skipping seed.')
    }
  } catch (error) {
    console.error('Error seeding themes:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedThemes()