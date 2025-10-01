// apiClient.ts - Utility functions for API calls

export async function fetchCategories() {
  try {
    // Use absolute URL for server-side rendering
    const baseUrl = typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_BASE_URL
        || process.env.NEXT_PUBLIC_SITE_URL
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
      : '';
    const response = await fetch(`${baseUrl}/api/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { categories: [] }
  }
}

export async function fetchProductsByCategory(slug: string) {
  try {
    // Use absolute URL for server-side rendering
    const baseUrl = typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_BASE_URL
        || process.env.NEXT_PUBLIC_SITE_URL
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
      : '';
    const response = await fetch(`${baseUrl}/api/categories/${slug}/products`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return { products: [] }
  }
}