'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Eye, EyeOff } from 'lucide-react'

export default function PagesPage() {
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingPage, setEditingPage] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    isActive: true,
    showInMenu: true,
    order: 0
  })

  // Load pages from localStorage
  useEffect(() => {
    try {
      const storedPages = localStorage.getItem('cms_pages')
      if (storedPages) {
        setPages(JSON.parse(storedPages))
      } else {
        // Initialize with default pages
        const defaultPages = [
          { id: '1', title: 'Home', slug: '/', isActive: true, showInMenu: true, order: 1, createdAt: '2023-01-15' },
          { id: '2', title: 'About Us', slug: '/about', isActive: true, showInMenu: true, order: 2, createdAt: '2023-01-20' },
          { id: '3', title: 'Products', slug: '/products', isActive: true, showInMenu: true, order: 3, createdAt: '2023-02-01' },
          { id: '4', title: 'Contact', slug: '/contact', isActive: true, showInMenu: true, order: 4, createdAt: '2023-02-10' },
          { id: '5', title: 'Privacy Policy', slug: '/privacy', isActive: false, showInMenu: false, order: 5, createdAt: '2023-03-01' },
        ]
        setPages(defaultPages)
        localStorage.setItem('cms_pages', JSON.stringify(defaultPages))
      }
    } catch (error) {
      console.error('Failed to load pages:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleCreate = () => {
    setEditingPage(null)
    setFormData({
      title: '',
      slug: '',
      isActive: true,
      showInMenu: true,
      order: 0
    })
    setShowForm(true)
  }

  const handleEdit = (page: any) => {
    setEditingPage(page)
    setFormData({
      title: page.title,
      slug: page.slug,
      isActive: page.isActive,
      showInMenu: page.showInMenu,
      order: page.order
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      const updatedPages = pages.filter(page => page.id !== id)
      setPages(updatedPages)
      localStorage.setItem('cms_pages', JSON.stringify(updatedPages))
    }
  }

  const handleToggleStatus = (id: string) => {
    const updatedPages = pages.map(page => 
      page.id === id ? { ...page, isActive: !page.isActive } : page
    )
    setPages(updatedPages)
    localStorage.setItem('cms_pages', JSON.stringify(updatedPages))
  }

  const handleToggleMenuVisibility = (id: string) => {
    const updatedPages = pages.map(page => 
      page.id === id ? { ...page, showInMenu: !page.showInMenu } : page
    )
    setPages(updatedPages)
    localStorage.setItem('cms_pages', JSON.stringify(updatedPages))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let updatedPages: any[]
      
      if (editingPage) {
        updatedPages = pages.map(page => 
          page.id === editingPage.id ? { ...page, ...formData, updatedAt: new Date().toISOString() } : page
        )
      } else {
        const newPage = {
          id: Math.random().toString(36).substr(2, 9),
          ...formData,
          createdAt: new Date().toISOString()
        }
        updatedPages = [...pages, newPage]
      }
      
      setPages(updatedPages)
      localStorage.setItem('cms_pages', JSON.stringify(updatedPages))
      setShowForm(false)
    } catch (error) {
      console.error('Failed to save page:', error)
      alert('Failed to save page')
    }
  }

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {editingPage ? 'Edit Page' : 'Add Page'}
          </h1>
          <button 
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
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
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/custom-page"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="showInMenu"
                checked={formData.showInMenu}
                onChange={(e) => setFormData({...formData, showInMenu: e.target.checked})}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="showInMenu" className="ml-2 block text-sm text-gray-900">
                Show in Menu
              </label>
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
                {editingPage ? 'Update' : 'Create'}
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
          <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-600">Manage your website pages</p>
        </div>
        <button 
          onClick={handleCreate}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Page
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search pages..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Menu Visibility
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {page.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.showInMenu ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {page.showInMenu ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{page.order}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(page.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleToggleStatus(page.id)}
                        className={`${page.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                      >
                        {page.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => handleToggleMenuVisibility(page.id)}
                        className={`${page.showInMenu ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {page.showInMenu ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button 
                        onClick={() => handleEdit(page)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(page.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No pages found</p>
          </div>
        )}
      </div>
    </div>
  )
}