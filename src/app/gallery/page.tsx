'use client'

import { useState } from 'react'
import { Filter, Grid, List, Search, Eye } from 'lucide-react'

interface GalleryItem {
  id: number
  title: string
  category: string
  description: string
  image: string
}

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    'all',
    'Delta',
    'Mitsubishi',
    'Siemens',
    'Yaskawa',
    'projects',
    'team',
    'office',
    'events'
  ]

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Delta HMI",
      category: "Delta",
      description: "Delta HMI panel",
      image: "/images/products/Delta/Delta - HMI.png"
    },
    {
      id: 2,
      title: "Delta PLC",
      category: "Delta",
      description: "Delta PLC controller",
      image: "/images/products/Delta/Delta - PLC.jpg"
    },
    {
      id: 3,
      title: "Mitsubishi HMI",
      category: "Mitsubishi",
      description: "Mitsubishi HMI panel",
      image: "/images/products/Mitsubishi/MIt - HMI.jpg"
    },
    {
      id: 4,
      title: "Mitsubishi PLC",
      category: "Mitsubishi",
      description: "Mitsubishi PLC controller",
      image: "/images/products/Mitsubishi/Mit - PLC.jpg"
    },
    {
      id: 5,
      title: "Siemens HMI",
      category: "Siemens",
      description: "Siemens HMI panel",
      image: "/images/products/Siemens/Siemens - HMI.jpg"
    },
    {
      id: 6,
      title: "Siemens PLC",
      category: "Siemens",
      description: "Siemens PLC controller",
      image: "/images/products/Siemens/Siemens - PLC.jpg"
    },
    {
      id: 7,
      title: "Yaskawa Servo",
      category: "Yaskawa",
      description: "Yaskawa servo motor",
      image: "/images/products/Yaskawa/servo.jpg"
    },
    {
      id: 8,
      title: "Yaskawa VFD",
      category: "Yaskawa",
      description: "Yaskawa VFD drive",
      image: "/images/products/Yaskawa/Yaskawa-VFD-Drive.png"
    },
    {
      id: 9,
      title: "Danfoss AC Drive Installation",
      category: "projects",
      description: "Successful installation of Danfoss VLT drives at manufacturing facility",
      image: "/api/placeholder/400/300"
    },
    {
      id: 10,
      title: "Technical Team",
      category: "team",
      description: "Our expert technical team during training session",
      image: "/api/placeholder/400/300"
    },
    {
      id: 11,
      title: "Office Interior",
      category: "office",
      description: "Modern office space at NovaGen Automation",
      image: "/api/placeholder/400/300"
    },
    {
      id: 12,
      title: "Product Training Event",
      category: "events",
      description: "Technical training session for clients",
      image: "/api/placeholder/400/300"
    }
  ]

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our projects, products, team, and facilities through our comprehensive gallery
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and View Mode */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
            </div>
          ) : (
            <div data-testid="gallery-grid" className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6 max-w-4xl mx-auto"
            }>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  data-testid="gallery-item"
                  className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${viewMode === 'list' ? 'md:w-1/3' : ''}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-4 ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Have a Project in Mind?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you bring your automation ideas to life with our expertise and experience
            </p>
            <div className="inline-flex items-center space-x-4">
              <a href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
              </a>
              <a href="/quote" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
