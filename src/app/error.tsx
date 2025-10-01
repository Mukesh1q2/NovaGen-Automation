'use client'

import Link from 'next/link'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">An unexpected error occurred. Please try again, or go back to the homepage.</p>
            {error?.digest && (
              <p className="text-xs text-gray-400 mb-4">Error ID: {error.digest}</p>
            )}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => reset()}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Try again
              </button>
              <Link href="/" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}