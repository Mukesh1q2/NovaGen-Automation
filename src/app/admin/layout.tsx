'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { LogOut, Menu, X, Package, Grid, FileText, User, Image, Palette } from 'lucide-react'
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const navigationItems = [
  { name: 'Dashboard', href: '/admin', icon: Grid },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Grid },
  { name: 'Pages', href: '/admin/pages', icon: FileText },
  { name: 'Users', href: '/admin/users', icon: User },
  { name: 'Slider', href: '/admin/slider', icon: Image },
  { name: 'Themes', href: '/admin/themes', icon: Palette },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (error) {
      console.error('Failed to logout', error)
    } finally {
      router.push('/admin/login')
      router.refresh()
    }
  }

  const renderNavLink = (item: typeof navigationItems[number]) => {
    const Icon = item.icon
    const isActive = pathname === item.href

    return (
      <Link
        key={item.name}
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className="h-5 w-5 mr-3" />
        {item.name}
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen((open) => !open)}
            className="text-gray-500 hover:text-gray-700"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <ThemeSwitcher />
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-20 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 lg:hidden">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>

        <nav className="mt-6 px-4">
          <div className="space-y-1">
            {navigationItems.map(renderNavLink)}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md w-full"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
            <div className="mt-4">
              <ThemeSwitcher />
            </div>
          </div>
        </nav>
      </div>

      <div className="lg:ml-64">
        <div className="lg:pt-0 pt-16">{children}</div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
