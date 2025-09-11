'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Search, Clock, Mail, User, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [navigation, setNavigation] = useState<any[]>([
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Product', href: '/products', subItems: [
      { name: 'Danfoss (AC Drives)', href: '/products/danfoss' },
      { name: 'Siemens', href: '/products/siemens' },
      { name: 'Vaccon', href: '/products/vaccon' },
      { name: 'Panel', href: '/products/panel' },
      { name: 'DBR', href: '/products/dbr' },
      { name: 'Any Other Enquiry', href: '/quote' },
    ]},
    { name: 'Vision & Mission', href: '/vision' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact' },
  ])

  // Skip to content function
  const skipToContent = () => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
    }
  }

  // Load custom pages from localStorage after component mounts
  useEffect(() => {
    setIsMounted(true)
    try {
      const storedPages = localStorage.getItem('cms_pages')
      if (storedPages) {
        const pages = JSON.parse(storedPages)
        // Filter pages that should be shown in menu
        const menuPages = pages
          .filter((page: any) => page.showInMenu && page.isActive)
          .sort((a: any, b: any) => a.order - b.order)
          .map((page: any) => ({
            name: page.title,
            href: page.slug
          }))
        
        // Add custom pages to navigation (before Contact Us)
        if (menuPages.length > 0) {
          const contactIndex = navigation.findIndex(item => item.name === 'Contact Us')
          const newNavigation = [...navigation]
          newNavigation.splice(contactIndex, 0, ...menuPages)
          setNavigation(newNavigation)
        }
      }
    } catch (error) {
      console.error('Failed to load custom pages:', error)
    }
  }, [])

  // Don't render search popup until component is mounted to avoid hydration issues
  if (!isMounted && isSearchOpen) {
    return null
  }

  return (
    <>
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md"
        onClick={skipToContent}
      >
        Skip to main content
      </a>
      
      {/* Top Bar */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-2 sm:mb-0">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <ThemeSwitcher />
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Mon - Sat: 9.30 - 18.30</span>
              </div>
              <a href="mailto:info@novagenautomation.com" className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@novagenautomation.com</span>
              </a>
              <Link href="/login" className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                <User className="h-4 w-4" />
                <span>Login / SignUp</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Search</h3>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.target as HTMLFormElement);
              const query = formData.get('search') as string;
              if (query?.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
              }
            }}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="search"
                  placeholder="Search products, pages, services..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <Button type="submit">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">
                NovaGen Automation
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6" aria-label="Main navigation">
              {navigation.map((item, index) => (
                <div key={`${item.name}-${index}`} className="relative group">
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                    {...(item.subItems ? { 'aria-haspopup': 'true', 'aria-expanded': 'false' } : {})}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                      role="menu"
                      aria-label={`${item.name} submenu`}
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={`${subItem.name}-${subIndex}`}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                          role="menuitem"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Get Quote Button */}
            <div className="hidden lg:block">
              <Link href="/quote">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get A Quote
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-6" aria-label="Mobile navigation">
                  {navigation.map((item, index) => (
                    <div key={`${item.name}-${index}`}>
                      {item.subItems ? (
                        <div>
                          <button
                            className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg flex justify-between items-center w-full"
                            onClick={(e) => {
                              e.preventDefault();
                              const submenu = e.currentTarget.nextElementSibling as HTMLElement;
                              submenu.classList.toggle('hidden');
                              const isExpanded = !submenu.classList.contains('hidden');
                              e.currentTarget.setAttribute('aria-expanded', isExpanded.toString());
                            }}
                            aria-expanded="false"
                            aria-controls={`submenu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <span>{item.name}</span>
                            <span className="ml-2 text-xs">▼</span>
                          </button>
                          <div 
                            id={`submenu-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="ml-4 mt-2 space-y-2 hidden"
                          >
                            {item.subItems.map((subItem, subIndex) => (
                              <Link
                                key={`${subItem.name}-${subIndex}`}
                                href={subItem.href}
                                className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg block"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Link href="/quote" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Get A Quote
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}