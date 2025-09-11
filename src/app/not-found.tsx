import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link href="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/products">
            <Button variant="outline" className="w-full">
              <Search className="mr-2 h-5 w-5" />
              Browse Products
            </Button>
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{' '}
            <Link href="/contact" className="font-medium text-blue-600 hover:text-blue-500">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}