'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Upload, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Define the Slide interface
interface Slide {
  id: string
  title: string
  description: string
  image: string
  mobileImage: string
  link: string
  order: number
}

export default function SliderManagementPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    mobileImage: '',
    link: '',
    order: 0
  })

  // Load slides from localStorage
  useEffect(() => {
    loadSlides()
  }, [])

  const loadSlides = () => {
    try {
      const storedSlides = localStorage.getItem('homepage_slider')
      if (storedSlides) {
        setSlides(JSON.parse(storedSlides))
      } else {
        // Initialize with default slides if none exist
        const defaultSlides: Slide[] = [
          {
            id: '1',
            title: "A.C Drive",
            description: "NovaGen Automation dealing in AC drives, soft starter & many more products of danfoss industries.",
            image: "/images/hero/ac-drive-desktop.jpg",
            mobileImage: "/images/hero/ac-drive-mobile.jpg",
            link: "/products/danfoss",
            order: 1
          },
          {
            id: '2',
            title: "Filter Drier & Pressure Transmitter",
            description: "NovaGen Automation dealing in Valve, Filter Drier, Pressure Transmitter, refrigeration compressor & many more products of Danfoss Industries.",
            image: "/images/hero/filter-drier-desktop.jpg",
            mobileImage: "/images/hero/filter-drier-mobile.jpg",
            link: "/quote",
            order: 2
          },
          {
            id: '3',
            title: "Servo Motors & Drives",
            description: "NovaGen Automation dealing in Servo Motor, Servo Drive, PLC, HMI, Cable, CPU & other accessories of Siemens make.",
            image: "/images/hero/servo-desktop.jpg",
            mobileImage: "/images/hero/servo-mobile.jpg",
            link: "/products/siemens",
            order: 3
          }
        ]
        setSlides(defaultSlides)
        localStorage.setItem('homepage_slider', JSON.stringify(defaultSlides))
      }
    } catch (error) {
      console.error('Failed to load slides:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingSlide(null)
    setFormData({
      title: '',
      description: '',
      image: '',
      mobileImage: '',
      link: '',
      order: slides.length + 1
    })
    setShowForm(true)
  }

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide)
    setFormData({
      title: slide.title,
      description: slide.description,
      image: slide.image,
      mobileImage: slide.mobileImage,
      link: slide.link,
      order: slide.order
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this slide?')) {
      const updatedSlides = slides.filter(slide => slide.id !== id)
      setSlides(updatedSlides)
      localStorage.setItem('homepage_slider', JSON.stringify(updatedSlides))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let updatedSlides: Slide[]
      
      if (editingSlide) {
        // Update existing slide
        updatedSlides = slides.map(slide => 
          slide.id === editingSlide.id 
            ? { ...slide, ...formData, id: editingSlide.id } 
            : slide
        )
      } else {
        // Add new slide
        const newSlide: Slide = {
          id: Math.random().toString(36).substr(2, 9),
          ...formData
        }
        updatedSlides = [...slides, newSlide]
      }
      
      // Sort by order
      updatedSlides.sort((a, b) => a.order - b.order)
      
      setSlides(updatedSlides)
      localStorage.setItem('homepage_slider', JSON.stringify(updatedSlides))
      setShowForm(false)
    } catch (error) {
      console.error('Failed to save slide:', error)
      alert('Failed to save slide')
    }
  }

  const handleImageUpload = (field: 'image' | 'mobileImage') => {
    // In a real implementation, this would open a file dialog or image picker
    // For now, we'll just show an alert with instructions
    alert(`In a real implementation, this would open an image upload dialog. For now, please enter the image URL directly in the form field.`)
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

  if (showForm) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {editingSlide ? 'Edit Slide' : 'Add Slide'}
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
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desktop Image URL *
                </label>
                <div className="flex">
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/images/hero/slide-desktop.jpg"
                  />
                  <Button
                    type="button"
                    onClick={() => handleImageUpload('image')}
                    className="rounded-l-none"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Image URL *
                </label>
                <div className="flex">
                  <input
                    type="text"
                    required
                    value={formData.mobileImage}
                    onChange={(e) => setFormData({...formData, mobileImage: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/images/hero/slide-mobile.jpg"
                  />
                  <Button
                    type="button"
                    onClick={() => handleImageUpload('mobileImage')}
                    className="rounded-l-none"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link URL
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/products/category"
                />
                <Button type="button" className="rounded-l-none">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
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
        </div>
        <button 
          onClick={handleCreate}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Slide
        </button>
      </div>

      {/* Slides Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slide
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {slides
                .sort((a, b) => a.order - b.order)
                .map((slide) => (
                <tr key={slide.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{slide.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{slide.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{slide.link}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{slide.order}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(slide)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(slide.id)}
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
        
        {slides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No slides found</p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 mb-2">How to use:</h3>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>Click "Add Slide" to create a new slider image</li>
          <li>Enter the image URLs for both desktop and mobile versions</li>
          <li>Set the order to control the sequence of slides</li>
          <li>Add a link to direct users to a specific page</li>
        </ul>
      </div>
    </div>
  )
}