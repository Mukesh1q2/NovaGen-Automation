// db.ts - Database utility functions for CMS

// In a real application, this would interact with Prisma
// For demo purposes, we'll use localStorage to simulate database operations
// In production, you would replace these with actual Prisma calls

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  categoryId: string
  price: number | null
  sku: string
  images: string[]
  tags: string[]
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  order: number
  createdAt: string
  updatedAt: string
}

// Helper functions for JSON serialization/deserialization
const parseJsonArray = (jsonString: string): any[] => {
  try {
    const parsed = JSON.parse(jsonString)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const stringifyJsonArray = (array: any[]): string => {
  return JSON.stringify(array)
}

// Product functions
export const getProducts = (): Product[] => {
  if (typeof window !== 'undefined') {
    const products = localStorage.getItem('cms_products')
    if (products) {
      try {
        const parsedProducts = JSON.parse(products)
        // Convert string arrays back to arrays
        return parsedProducts.map((product: any) => ({
          ...product,
          images: parseJsonArray(product.images),
          tags: parseJsonArray(product.tags)
        }))
      } catch {
        return []
      }
    }
  }
  return []
}

export const getProductById = (id: string): Product | null => {
  const products = getProducts()
  const product = products.find(product => product.id === id) || null
  return product
}

export const createProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product => {
  const newProduct: Product = {
    ...product,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  const products = getProducts()
  products.push(newProduct)
  
  // Convert arrays to strings for storage
  const productsToStore = products.map(p => ({
    ...p,
    images: stringifyJsonArray(p.images),
    tags: stringifyJsonArray(p.tags)
  }))
  
  localStorage.setItem('cms_products', JSON.stringify(productsToStore))
  
  return newProduct
}

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts()
  const index = products.findIndex(product => product.id === id)
  
  if (index === -1) return null
  
  const updatedProduct = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  products[index] = updatedProduct
  
  // Convert arrays to strings for storage
  const productsToStore = products.map(p => ({
    ...p,
    images: stringifyJsonArray(p.images),
    tags: stringifyJsonArray(p.tags)
  }))
  
  localStorage.setItem('cms_products', JSON.stringify(productsToStore))
  
  return updatedProduct
}

export const deleteProduct = (id: string): boolean => {
  const products = getProducts()
  const filteredProducts = products.filter(product => product.id !== id)
  
  if (products.length === filteredProducts.length) return false
  
  // Convert arrays to strings for storage
  const productsToStore = filteredProducts.map(p => ({
    ...p,
    images: stringifyJsonArray(p.images),
    tags: stringifyJsonArray(p.tags)
  }))
  
  localStorage.setItem('cms_products', JSON.stringify(productsToStore))
  return true
}

// Category functions
export const getCategories = (): ProductCategory[] => {
  if (typeof window !== 'undefined') {
    const categories = localStorage.getItem('cms_categories')
    return categories ? JSON.parse(categories) : []
  }
  return []
}

export const getCategoryById = (id: string): ProductCategory | null => {
  const categories = getCategories()
  return categories.find(category => category.id === id) || null
}

export const createCategory = (category: Omit<ProductCategory, 'id' | 'createdAt' | 'updatedAt'>): ProductCategory => {
  const newCategory: ProductCategory = {
    ...category,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  const categories = getCategories()
  categories.push(newCategory)
  localStorage.setItem('cms_categories', JSON.stringify(categories))
  
  return newCategory
}

export const updateCategory = (id: string, updates: Partial<ProductCategory>): ProductCategory | null => {
  const categories = getCategories()
  const index = categories.findIndex(category => category.id === id)
  
  if (index === -1) return null
  
  const updatedCategory = {
    ...categories[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  categories[index] = updatedCategory
  localStorage.setItem('cms_categories', JSON.stringify(categories))
  
  return updatedCategory
}

export const deleteCategory = (id: string): boolean => {
  const categories = getCategories()
  const filteredCategories = categories.filter(category => category.id !== id)
  
  if (categories.length === filteredCategories.length) return false
  
  localStorage.setItem('cms_categories', JSON.stringify(filteredCategories))
  return true
}

// Initialize with sample data if empty
if (typeof window !== 'undefined') {
  if (!localStorage.getItem('cms_categories') || getCategories().length === 0) {
    const sampleCategories: ProductCategory[] = [
      {
        id: '1',
        name: 'Danfoss',
        slug: 'danfoss',
        description: 'Danfoss industrial automation products',
        icon: 'settings',
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Siemens',
        slug: 'siemens',
        description: 'Siemens automation and control systems',
        icon: 'zap',
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
    localStorage.setItem('cms_categories', JSON.stringify(sampleCategories))
  }
  
  if (!localStorage.getItem('cms_products') || getProducts().length === 0) {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'AC Drive VLT FC 302',
        slug: 'ac-drive-vlt-fc-302',
        description: 'Variable frequency drives for precise motor control and energy efficiency. Power range from 0.37 kW to 90 kW (0.5 HP to 125 HP). Features include advanced motor control algorithms, built-in EMC filter, multiple communication protocols, and energy optimization function.',
        shortDescription: 'Variable frequency drives for motor control',
        categoryId: '1',
        price: 1299.99,
        sku: 'VLT-FC-302',
        images: ['/images/products/ac-drive-1.jpg'],
        tags: ['drive', 'motor', 'control', 'energy'],
        isActive: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Servo Motor SIMOTICS',
        slug: 'servo-motor-simotics',
        description: 'High-precision servo motors for demanding automation applications. Features include precise positioning, high torque density, and robust construction.',
        shortDescription: 'High-precision servo motors',
        categoryId: '2',
        price: 899.99,
        sku: 'SIMOTICS-S1',
        images: ['/images/products/servo-1.jpg'],
        tags: ['servo', 'motor', 'precision'],
        isActive: true,
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
    
    // Convert arrays to strings for storage
    const productsToStore = sampleProducts.map(p => ({
      ...p,
      images: stringifyJsonArray(p.images),
      tags: stringifyJsonArray(p.tags)
    }))
    
    localStorage.setItem('cms_products', JSON.stringify(productsToStore))
  }
}