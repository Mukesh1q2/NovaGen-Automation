'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Search, Clock, Mail, User, X, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [navigation, setNavigation] = useState<any[]>([
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products', subItems: [
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

  // Load custom pages from API after component mounts
  useEffect(() => {
    let active = true
    setIsMounted(true)

    const fetchPages = async () => {
      try {
        const response = await fetch('/api/pages', { cache: 'no-store' })
        if (!response.ok) {
          throw new Error('Failed to load pages')
        }
        const data = await response.json()
        if (!active) return

        const menuPages = (data.pages ?? [])
          .filter((page: any) => page.showInMenu && page.isActive)
          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
          .map((page: any) => ({
            name: page.title,
            href: page.slug.startsWith('/') ? page.slug : `/${page.slug}`,
          }))

        if (menuPages.length > 0) {
          setNavigation((current) => {
            const contactIndex = current.findIndex((item) => item.name === 'Contact Us')
            const insertionIndex = contactIndex >= 0 ? contactIndex : current.length
            const filtered = current.filter((item) => !menuPages.some((page) => page.name === item.name))
            return [
              ...filtered.slice(0, insertionIndex),
              ...menuPages,
              ...filtered.slice(insertionIndex),
            ]
          })
        }
      } catch (error) {
        console.error('Failed to load custom pages:', error)
      }
    }

    void fetchPages()

    return () => {
      active = false
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
        onClick={skipToContent}
      >
        Skip to main content
      </a>
      
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-2 border-b border-gray-200">
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
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              const formData = new FormData(e.target as HTMLFormElement);
              const query = formData.get('search') as string;
              if (query?.trim()) {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
              }
            }}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="search"
                  placeholder="Search products, pages, services..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
      <header className="bg-white shadow-lg sticky top-0 z-40 backdrop-blur-sm bg-white/95 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary/90 group-hover:to-primary">
                NovaGen Automation
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 relative overflow-hidden group"
                    aria-label={`${item.name} main`}
                    {...(item.subItems ? { 'aria-haspopup': 'true', 'aria-expanded': 'false' } : {})}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                  </Link>
                  {item.subItems && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-64 bg-white shadow-2xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 border border-gray-100"
                      role="menu"
                      aria-label={`${item.name} submenu`}
                    >
                      {item.subItems.map((subItem, index) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-200 relative group/item border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                          role="menuitem"
                          aria-label={`${subItem.name} from dropdown`}
                        >
                          <span className="flex items-center">
                            <span className="w-1 h-1 rounded-full bg-blue-600 opacity-0 group-hover/item:opacity-100 transition-opacity mr-2"></span>
                            {subItem.name}
                          </span>
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
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
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
                    <div key={item.name}>
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
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block text-gray-600 hover:text-blue-600 transition-colors py-1"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label={`${subItem.name} mobile submenu`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg block"
                          onClick={() => setIsMenuOpen(false)}
                          aria-label={`${item.name} mobile`}
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