// apiClient.ts - Utility functions for API calls

export async function fetchCategories() {
  try {
    const response = await fetch('/api/categories')
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
    const response = await fetch(`/api/categories/${slug}/products`)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return { products: [] }
  }
}