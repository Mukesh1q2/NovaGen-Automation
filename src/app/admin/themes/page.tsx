'use client'

import { useState, useEffect } from 'react'
import { Palette, Save, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ThemeConfig {
  name: string
  label: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  border: string
  input: string
  ring: string
}

interface ThemeSetting {
  id: string
  name: string
  label: string
  config: string // JSON string
  isActive: boolean
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

const defaultThemes: Record<string, ThemeConfig> = {
  light: {
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
  },
  dark: {
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
  },
  ocean: {
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
  },
  twilight: {
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
  },
  slate: {
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
  },
  blue: {
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
  },
  purple: {
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
  },
  corporate: {
    name: 'corporate',
    label: 'Corporate Blue',
    primary: 'oklch(0.45 0.15 240)',
    primaryForeground: 'oklch(0.98 0.01 240)',
    secondary: 'oklch(0.35 0.1 220)',
    secondaryForeground: 'oklch(0.95 0.01 220)',
    background: 'oklch(0.98 0.005 240)',
    foreground: 'oklch(0.2 0.01 240)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.2 0.01 240)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.2 0.01 240)',
    muted: 'oklch(0.94 0.01 240)',
    mutedForeground: 'oklch(0.45 0.01 240)',
    accent: 'oklch(0.55 0.12 240)',
    accentForeground: 'oklch(0.98 0.01 240)',
    border: 'oklch(0.88 0.01 240)',
    input: 'oklch(0.9 0.01 240)',
    ring: 'oklch(0.45 0.15 240)',
  },
  modern: {
    name: 'modern',
    label: 'Modern Teal',
    primary: 'oklch(0.5 0.15 180)',
    primaryForeground: 'oklch(0.98 0.01 180)',
    secondary: 'oklch(0.4 0.1 200)',
    secondaryForeground: 'oklch(0.95 0.01 200)',
    background: 'oklch(0.97 0.005 180)',
    foreground: 'oklch(0.2 0.01 180)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.2 0.01 180)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.2 0.01 180)',
    muted: 'oklch(0.93 0.01 180)',
    mutedForeground: 'oklch(0.45 0.01 180)',
    accent: 'oklch(0.6 0.12 180)',
    accentForeground: 'oklch(0.98 0.01 180)',
    border: 'oklch(0.87 0.01 180)',
    input: 'oklch(0.89 0.01 180)',
    ring: 'oklch(0.5 0.15 180)',
  },
  vibrant: {
    name: 'vibrant',
    label: 'Vibrant Orange',
    primary: 'oklch(0.6 0.2 40)',
    primaryForeground: 'oklch(0.98 0.01 40)',
    secondary: 'oklch(0.5 0.15 60)',
    secondaryForeground: 'oklch(0.95 0.01 60)',
    background: 'oklch(0.98 0.005 40)',
    foreground: 'oklch(0.2 0.01 40)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.2 0.01 40)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.2 0.01 40)',
    muted: 'oklch(0.94 0.01 40)',
    mutedForeground: 'oklch(0.45 0.01 40)',
    accent: 'oklch(0.7 0.18 40)',
    accentForeground: 'oklch(0.98 0.01 40)',
    border: 'oklch(0.88 0.01 40)',
    input: 'oklch(0.9 0.01 40)',
    ring: 'oklch(0.6 0.2 40)',
  },
  professional: {
    name: 'professional',
    label: 'Professional Navy',
    primary: 'oklch(0.35 0.12 250)',
    primaryForeground: 'oklch(0.98 0.01 250)',
    secondary: 'oklch(0.3 0.08 230)',
    secondaryForeground: 'oklch(0.95 0.01 230)',
    background: 'oklch(0.97 0.005 250)',
    foreground: 'oklch(0.25 0.01 250)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.25 0.01 250)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.25 0.01 250)',
    muted: 'oklch(0.93 0.01 250)',
    mutedForeground: 'oklch(0.5 0.01 250)',
    accent: 'oklch(0.45 0.1 250)',
    accentForeground: 'oklch(0.98 0.01 250)',
    border: 'oklch(0.87 0.01 250)',
    input: 'oklch(0.89 0.01 250)',
    ring: 'oklch(0.35 0.12 250)',
  },
}

export default function ThemesPage() {
  const [themes, setThemes] = useState<Record<string, ThemeSetting>>({})
  const [selectedTheme, setSelectedTheme] = useState<string>('blue')
  const [customTheme, setCustomTheme] = useState<ThemeConfig>(defaultThemes.blue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadThemes = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/themes')
        if (!response.ok) {
          throw new Error('Failed to load themes')
        }
        const data = await response.json()
        
        // Check if user is admin
        setIsAdmin(data.isAdmin)
        
        // If user is not admin, redirect to dashboard
        if (!data.isAdmin) {
          router.push('/admin')
          return
        }
        
        // Convert array to record for easier access
        const themesRecord: Record<string, ThemeSetting> = {}
        data.themes.forEach((theme: ThemeSetting) => {
          themesRecord[theme.name] = theme
          // If this is the active theme, set it as selected
          if (theme.isActive) {
            setSelectedTheme(theme.name)
            setCustomTheme(JSON.parse(theme.config))
          }
        })
        
        setThemes(themesRecord)
      } catch (err) {
        console.error('loadThemes error', err)
        setError(err instanceof Error ? err.message : 'Unable to load themes')
      } finally {
        setLoading(false)
      }
    }

    loadThemes()
  }, [router])

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName)
    // Check if we have this theme in our loaded themes
    if (themes[themeName]) {
      setCustomTheme(JSON.parse(themes[themeName].config))
    } else {
      // Fallback to default themes
      setCustomTheme(defaultThemes[themeName] || defaultThemes.blue)
    }
  }

  const handleColorChange = (property: keyof ThemeConfig, value: string) => {
    setCustomTheme({
      ...customTheme,
      [property]: value,
    })
  }

  const handleSaveTheme = async () => {
    try {
      const response = await fetch('/api/themes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedTheme,
          label: customTheme.label || selectedTheme,
          config: JSON.stringify(customTheme),
          isActive: true,
          isDefault: false,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save theme')
      }

      const data = await response.json()
      
      // Update our local themes state
      setThemes(prev => ({
        ...prev,
        [data.theme.name]: data.theme
      }))
      
      setSuccess('Theme saved successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save theme')
      console.error('saveTheme error', err)
    }
  }

  const handleResetTheme = () => {
    // Reset to default theme configuration
    setCustomTheme(defaultThemes[selectedTheme] || defaultThemes.blue)
  }

  const themeOptions = Object.values(defaultThemes).map(theme => ({
    value: theme.name,
    label: theme.label,
  }))

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  // If user is not admin, don't render anything (they should be redirected)
  if (!isAdmin) {
    return null
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Theme Management</h1>
        <p className="text-gray-600">Customize and manage site themes</p>
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        {success && <p className="text-sm text-green-600 mt-2">{success}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Selection */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Theme</h2>
          <div className="space-y-3">
            {themeOptions.map((theme) => (
              <div
                key={theme.value}
                className={`flex items-center p-3 rounded-lg cursor-pointer border ${
                  selectedTheme === theme.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleThemeChange(theme.value)}
              >
                <div
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: defaultThemes[theme.value]?.primary || '#000000' }}
                ></div>
                <span className="text-sm font-medium text-gray-900">{theme.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Customization */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Customize Theme</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleResetTheme}
                className="flex items-center px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </button>
              <button
                onClick={handleSaveTheme}
                className="flex items-center px-3 py-1.5 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={customTheme.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customTheme.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Foreground
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={customTheme.primaryForeground}
                  onChange={(e) => handleColorChange('primaryForeground', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customTheme.primaryForeground}
                  onChange={(e) => handleColorChange('primaryForeground', e.target.value)}
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Color
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={customTheme.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customTheme.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Foreground
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={customTheme.secondaryForeground}
                  onChange={(e) => handleColorChange('secondaryForeground', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customTheme.secondaryForeground}
                  onChange={(e) => handleColorChange('secondaryForeground', e.target.value)}
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={customTheme.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customTheme.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foreground
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={customTheme.foreground}
                  onChange={(e) => handleColorChange('foreground', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customTheme.foreground}
                  onChange={(e) => handleColorChange('foreground', e.target.value)}
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={customTheme.card}
                  onChange={(e) => handleColorChange('card', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customTheme.card}
                  onChange={(e) => handleColorChange('card', e.target.value)}
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Foreground
              </label>
              <div className="flex items-center">
                <input
                  type="color"
                  value={customTheme.cardForeground}
                  onChange={(e) => handleColorChange('cardForeground', e.target.value)}
                  className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customTheme.cardForeground}
                  onChange={(e) => handleColorChange('cardForeground', e.target.value)}
                  className="ml-2 flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Preview */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Theme Preview</h2>
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: customTheme.background,
            color: customTheme.foreground,
            borderColor: customTheme.border,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: customTheme.primary }}
            >
              Preview Card
            </h3>
            <button
              className="px-3 py-1 text-sm rounded"
              style={{
                backgroundColor: customTheme.primary,
                color: customTheme.primaryForeground,
              }}
            >
              Action Button
            </button>
          </div>
          <p className="mb-4">
            This is a preview of how your theme will look. You can see the primary color
            applied to the title and button, with the background and foreground colors
            applied to the card.
          </p>
          <div
            className="p-3 rounded"
            style={{
              backgroundColor: customTheme.card,
              color: customTheme.cardForeground,
              border: `1px solid ${customTheme.border}`,
            }}
          >
            <p className="text-sm">
              This is a sample card component using the card background and foreground colors.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}