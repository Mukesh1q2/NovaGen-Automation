'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface CategoryOption {
  id: string
  name: string
}

interface ApiProductResponse {
  product: any
}

interface ApiCategoryResponse {
  categories: CategoryOption[]
}

const emptyForm = {
  name: '',
  slug: '',
  description: '',
  shortDescription: '',
  categoryId: '',
  price: '',
  sku: '',
  tags: '',
  isActive: true,
  order: 0,
}

function EditProductForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [formData, setFormData] = useState(emptyForm)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')

  useEffect(() => {
    if (!productId) {
      router.push('/admin/products')
      return
    }

    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [productRes, categoriesRes] = await Promise.all([
          fetch(`/api/products/${productId}`, { cache: 'no-store' }),
          fetch('/api/categories', { cache: 'no-store' }),
        ])

        if (!productRes.ok) {
          if (productRes.status === 404) {
            router.push('/admin/products')
            return
          }
          throw new Error('Failed to load product')
        }

        if (!categoriesRes.ok) {
          throw new Error('Failed to load categories')
        }

        const productData: ApiProductResponse = await productRes.json()
        const categoriesData: ApiCategoryResponse = await categoriesRes.json()

        const product = productData.product
        setCategories(categoriesData.categories ?? [])
        setFormData({
          name: product.name ?? '',
          slug: product.slug ?? '',
          description: product.description ?? '',
          shortDescription: product.shortDescription ?? '',
          categoryId: product.categoryId ?? '',
          price: typeof product.price === 'number' ? String(product.price) : '',
          sku: product.sku ?? '',
          tags: (product.tags ?? []).map((tag: any) => tag.name).join(', '),
          isActive: Boolean(product.isActive),
          order: product.order ?? 0,
        })
        setImageUrls((product.images ?? []).map((image: any) => image.url))
      } catch (err) {
        console.error('load product error', err)
        setError(err instanceof Error ? err.message : 'Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [productId, router])

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return
    const trimmed = newImageUrl.trim()
    if (!imageUrls.includes(trimmed)) {
      setImageUrls((prev) => [...prev, trimmed])
    }
    setNewImageUrl('')
  }

  const handleRemoveImageUrl = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const previewUrl = URL.createObjectURL(file)
      setImageUrls((prev) => [...prev, previewUrl])
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!productId) return

    setSaving(true)
    setError(null)

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        shortDescription: formData.shortDescription || null,
        categoryId: formData.categoryId,
        price: formData.price ? Number(formData.price) : null,
        sku: formData.sku || null,
        images: imageUrls.map((url, index) => ({ url, order: index })),
        tags: formData.tags
          ? formData.tags.split(',').map((tag) => ({ name: tag.trim() })).filter((tag) => tag.name.length > 0)
          : [],
        isActive: formData.isActive,
        order: formData.order ?? 0,
      }

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const message = await response.json().catch(() => ({ error: 'Failed to update product' }))
        throw new Error(message.error ?? 'Failed to update product')
      }

      router.push('/admin/products')
      router.refresh()
    } catch (err) {
      console.error('update product error', err)
      setError(err instanceof Error ? err.message : 'Failed to update product. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!productId) {
    return null
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600">Update product details</p>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
        <button
          onClick={() => router.push('/admin/products')}
          className="text-gray-500 hover:text-gray-700"
          disabled={saving}
        >
          Cancel
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(event) => setFormData({ ...formData, slug: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(event) => setFormData({ ...formData, categoryId: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(event) => setFormData({ ...formData, sku: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(event) => setFormData({ ...formData, order: Number(event.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              value={formData.shortDescription}
              onChange={(event) => setFormData({ ...formData, shortDescription: event.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Images
                </button>
                <span className="text-sm text-gray-500">Upload files or add direct URLs.</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
              </div>

              <div className="flex">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(event) => setNewImageUrl(event.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/product.jpg"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>

              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-24 flex items-center justify-center overflow-hidden">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImageUrl(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(event) => setFormData({ ...formData, tags: event.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(event) => setFormData({ ...formData, isActive: event.target.checked })}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
              Active
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function EditProductPage() {
  return (
    <Suspense
      fallback={(
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        </div>
      )}
    >
      <EditProductForm />
    </Suspense>
  )
}
