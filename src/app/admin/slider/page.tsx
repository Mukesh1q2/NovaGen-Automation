'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface SlideForm {
  title: string
  description: string
  desktopImage: string
  mobileImage: string
  link: string
  order: number
  isActive: boolean
  thumbnails: string
}

interface SlideRow {
  id: string
  title: string
  description: string | null
  desktopImage: string
  mobileImage: string
  link: string | null
  order: number
  isActive: boolean
  thumbnails: string[]
  createdAt: string
  updatedAt: string
}

const emptyForm: SlideForm = {
  title: '',
  description: '',
  desktopImage: '',
  mobileImage: '',
  link: '',
  order: 0,
  isActive: true,
  thumbnails: '',
}

export default function SliderManagementPage() {
  const [slides, setSlides] = useState<SlideRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSlide, setEditingSlide] = useState<SlideRow | null>(null)
  const [formData, setFormData] = useState<SlideForm>(emptyForm)
  const [error, setError] = useState<string | null>(null)

  const loadSlides = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/slides?includeInactive=true', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('Failed to load slides')
      }
      const data = await response.json()
      setSlides(data.slides ?? [])
    } catch (err) {
      console.error('loadSlides error', err)
      setError(err instanceof Error ? err.message : 'Unable to load slides')
      setSlides([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSlides()
  }, [loadSlides])

  const handleCreate = () => {
    setEditingSlide(null)
    setFormData(emptyForm)
    setShowForm(true)
    setError(null)
  }

  const handleEdit = (slide: SlideRow) => {
    setEditingSlide(slide)
    setFormData({
      title: slide.title,
      description: slide.description ?? '',
      desktopImage: slide.desktopImage ?? '',
      mobileImage: slide.mobileImage ?? '',
      link: slide.link ?? '',
      order: slide.order ?? 0,
      isActive: slide.isActive,
      thumbnails: (slide.thumbnails ?? []).join('\n'),
    })
    setShowForm(true)
    setError(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) {
      return
    }
    try {
      const response = await fetch(`/api/slides/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete slide')
      }
      await loadSlides()
    } catch (err) {
      console.error('deleteSlide error', err)
      alert(err instanceof Error ? err.message : 'Failed to delete slide')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const thumbnailUrls = formData.thumbnails
        .split(/\r?\n/)
        .map((url) => url.trim())
        .filter(Boolean)
        .map((url, index) => ({ url, order: index }))

      const payload = {
        title: formData.title,
        description: formData.description || null,
        desktopImage: formData.desktopImage,
        mobileImage: formData.mobileImage || formData.desktopImage,
        link: formData.link || null,
        order: formData.order ?? 0,
        isActive: formData.isActive,
        thumbnails: thumbnailUrls,
      }

      const endpoint = editingSlide ? `/api/slides/${editingSlide.id}` : '/api/slides'
      const method = editingSlide ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const message = await response.json().catch(() => ({ error: 'Failed to save slide' }))
        throw new Error(message.error ?? 'Failed to save slide')
      }

      setShowForm(false)
      setFormData(emptyForm)
      await loadSlides()
    } catch (err) {
      console.error('saveSlide error', err)
      setError(err instanceof Error ? err.message : 'Failed to save slide')
    }
  }

  const sortedSlides = useMemo(() => {
    return [...slides].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }, [slides])

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingSlide ? 'Edit Slide' : 'Add Slide'}
            </h1>
            <p className="text-gray-600">Manage homepage hero slides</p>
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </div>
          <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
            Cancel
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desktop Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.desktopImage}
                  onChange={(event) => setFormData({ ...formData, desktopImage: event.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/desktop.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Image URL</label>
                <input
                  type="url"
                  value={formData.mobileImage}
                  onChange={(event) => setFormData({ ...formData, mobileImage: event.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Defaults to desktop image if left blank"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(event) => setFormData({ ...formData, link: event.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/products"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(event) => setFormData({ ...formData, order: Number(event.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(event) => setFormData({ ...formData, isActive: event.target.checked })}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-900">Active</span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URLs (one per line)</label>
              <textarea
                value={formData.thumbnails}
                onChange={(event) => setFormData({ ...formData, thumbnails: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Optional supporting images"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {editingSlide ? 'Update Slide' : 'Create Slide'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homepage Slider</h1>
          <p className="text-gray-600">Manage your homepage slider images</p>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>
        <button
          onClick={handleCreate}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Slide
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slide</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedSlides.map((slide) => (
                <tr key={slide.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded-xl overflow-hidden">
                        <img src={slide.desktopImage} alt={slide.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{slide.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{slide.description ?? ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {slide.link ?? ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slide.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      slide.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {slide.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(slide.updatedAt ?? slide.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit(slide)} className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(slide.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sortedSlides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No slides found</p>
          </div>
        )}
      </div>
    </div>
  )
}
