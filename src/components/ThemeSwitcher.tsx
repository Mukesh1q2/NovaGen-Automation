"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    )
  }

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block z-50 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setTheme("light")}
          className={`w-full text-left px-4 py-2 text-sm flex items-center ${
            theme === "light" 
              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" 
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Sun className="h-4 w-4 mr-2" />
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`w-full text-left px-4 py-2 text-sm flex items-center ${
            theme === "dark" 
              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" 
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`w-full text-left px-4 py-2 text-sm flex items-center ${
            theme === "system" 
              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" 
              : "hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <Monitor className="h-4 w-4 mr-2" />
          System
        </button>
      </div>
    </div>
  )
}