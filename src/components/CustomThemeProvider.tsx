'use client'

import { ThemeProvider, type ThemeProviderProps } from 'next-themes'
import { useEffect, useState } from 'react'

// List of all available theme classes
const ALL_THEME_CLASSES = [
  'theme-light',
  'theme-dark',
  'theme-ocean',
  'theme-twilight',
  'theme-slate',
  'theme-blue',
  'theme-purple',
  'theme-corporate',
  'theme-modern',
  'theme-vibrant',
  'theme-professional',
]

export function CustomThemeProvider({ children }: ThemeProviderProps) {
  const [activeTheme, setActiveTheme] = useState<string | undefined>(undefined)

  useEffect(() => {
    // Fetch the active theme from the API
    const fetchActiveTheme = async () => {
      try {
        const response = await fetch('/api/themes/active', {
          cache: 'no-store'
        })
        if (!response.ok) {
          console.error('Failed to fetch active theme')
          return
        }
        
        const data = await response.json()
        if (data.theme) {
          // Extract theme name and config from the database record
          const themeName = data.theme.name
          setActiveTheme(themeName)
          
          // Remove all theme classes
          document.body.classList.remove(...ALL_THEME_CLASSES)
          
          // Add the active theme class
          document.body.classList.add(`theme-${themeName}`)
          
          // Apply dynamic CSS variables if custom theme config exists
          try {
            const themeConfig = JSON.parse(data.theme.config)
            applyDynamicTheme(themeConfig)
          } catch (e) {
            console.warn('Could not parse theme config, using static CSS:', e)
          }
          
          console.log('[Theme] Applied theme:', themeName)
        } else {
          // Fallback to system theme if no active theme is set
          setActiveTheme(undefined)
          document.body.classList.remove(...ALL_THEME_CLASSES)
          removeDynamicTheme()
          console.log('[Theme] No active theme, using system default')
        }
      } catch (error) {
        console.error('Error fetching active theme:', error)
        // Fallback to system theme on error
        setActiveTheme(undefined)
        document.body.classList.remove(...ALL_THEME_CLASSES)
        removeDynamicTheme()
      }
    }

    fetchActiveTheme()
  }, [])

  // Always render immediately to prevent hydration mismatch
  // Theme will be applied after mount via useEffect
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      suppressHydrationWarning
    >
      {children}
    </ThemeProvider>
  )
}

// Helper function to apply dynamic theme CSS variables
function applyDynamicTheme(config: any) {
  if (!config || typeof config !== 'object') return
  
  const root = document.documentElement
  
  // Map theme config properties to CSS variables
  const cssVariables: Record<string, string> = {
    primary: '--primary',
    primaryForeground: '--primary-foreground',
    secondary: '--secondary',
    secondaryForeground: '--secondary-foreground',
    background: '--background',
    foreground: '--foreground',
    card: '--card',
    cardForeground: '--card-foreground',
    popover: '--popover',
    popoverForeground: '--popover-foreground',
    muted: '--muted',
    mutedForeground: '--muted-foreground',
    accent: '--accent',
    accentForeground: '--accent-foreground',
    border: '--border',
    input: '--input',
    ring: '--ring',
  }
  
  // Apply each CSS variable
  Object.entries(cssVariables).forEach(([configKey, cssVar]) => {
    if (config[configKey]) {
      root.style.setProperty(cssVar, config[configKey])
    }
  })
}

// Helper function to remove dynamic theme CSS variables
function removeDynamicTheme() {
  const root = document.documentElement
  const cssVariables = [
    '--primary',
    '--primary-foreground',
    '--secondary',
    '--secondary-foreground',
    '--background',
    '--foreground',
    '--card',
    '--card-foreground',
    '--popover',
    '--popover-foreground',
    '--muted',
    '--muted-foreground',
    '--accent',
    '--accent-foreground',
    '--border',
    '--input',
    '--ring',
  ]
  
  cssVariables.forEach(cssVar => {
    root.style.removeProperty(cssVar)
  })
}
