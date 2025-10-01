'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { X, Search, Package, FileText, Wrench, ArrowRight } from 'lucide-react'
import { searchItems, groupSearchResults, SearchableItem } from '@/lib/searchUtils'

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)
  const [results, setResults] = useState<SearchableItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      const timeout = setTimeout(() => {
        setResults(searchItems(query))
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
    setResults([])
  }, [query])

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setResults([])
    router.push('/search')
  }

  const groupedResults = groupSearchResults(results)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return <FileText className="h-5 w-5 text-blue-600" />
      case 'product':
        return <Package className="h-5 w-5 text-green-600" />
      case 'service':
        return <Wrench className="h-5 w-5 text-purple-600" />
      default:
        return <FileText className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'page':
        return 'Pages'
      case 'product':
        return 'Products'
      case 'service':
        return 'Services'
      default:
        return 'Results'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products, pages, and services..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-24 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Search className="h-5 w-5" />
                <span className="ml-2">Search</span>
              </button>
            </div>
          </form>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" />
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : query ? (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Search Results for "{query}"</h1>
              <p className="text-gray-600 mt-1">
                Found {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
            </div>

            {results.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any matches for "{query}". Try different keywords or browse our products.
                </p>
                <Link href="/products" className="inline-flex items-center text-blue-600 hover:underline font-medium">
                  Browse Products <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedResults).map(([type, items]) => (
                  <div key={type} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b">
                      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        {getTypeIcon(type)}
                        <span className="ml-2">{getTypeLabel(type)}</span>
                        <span className="ml-2 text-sm text-gray-500">({items.length})</span>
                      </h2>
                    </div>
                    <div className="divide-y">
                      {items.map((item) => (
                        <Link key={item.id} href={item.url} className="block p-6 hover:bg-gray-50 transition-colors">
                          <h3 className="text-lg font-medium text-blue-600 hover:underline mb-1">{item.title}</h3>
                          {item.category && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                              {item.category}
                            </span>
                          )}
                          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                          <span className="text-xs text-gray-500">{item.url}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
            <div className="mx-auto bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Search NovaGen Automation</h3>
            <p className="text-gray-600 mb-6">
              Find products, pages, and services quickly. Try searching for products like "AC Drives" or pages like "About Us".
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Package className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-medium text-gray-800">Products</div>
                <div className="text-gray-600 mt-1">AC Drives, PLCs, HMIs</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-medium text-gray-800">Pages</div>
                <div className="text-gray-600 mt-1">About, Contact, Services</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Wrench className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <div className="font-medium text-gray-800">Services</div>
                <div className="text-gray-600 mt-1">Support, Training, Maintenance</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" />
            <p className="mt-4 text-gray-600">Loading search...</p>
          </div>
        </div>
      )}
    >
      <SearchPageContent />
    </Suspense>
  )
}
