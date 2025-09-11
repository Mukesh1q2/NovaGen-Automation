'use client'

import { useState } from 'react'
import { Calendar, User, Search, Filter, Clock, ArrowRight, Tag } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  tags: string[]
  image: string
  readTime: string
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    'all',
    'case-studies',
    'product-updates',
    'technical',
    'company-news',
    'industry-insights'
  ]

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Trial of Danfoss VFD at Pagro Food",
      excerpt: "Successful installation and testing of Danfoss VFD system at Pagro Food processing facility, resulting in significant energy savings and improved process control.",
      content: "Detailed case study about the successful implementation of Danfoss VFD at Pagro Food processing facility...",
      date: "22 December 2020",
      author: "Admin",
      category: "case-studies",
      tags: ["Danfoss", "VFD", "Energy Savings", "Food Processing"],
      image: "/api/placeholder/400/300",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "VFD Service at Molson Coors India Pvt LTD",
      excerpt: "Comprehensive VFD maintenance and service provided to Molson Coors India facility, ensuring optimal performance and preventing downtime.",
      content: "Complete overview of the VFD maintenance service provided to Molson Coors India...",
      date: "21 December 2020",
      author: "Admin",
      category: "case-studies",
      tags: ["VFD Service", "Maintenance", "Molson Coors", "Preventive Maintenance"],
      image: "/api/placeholder/400/300",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "VFD installation at Bansal Spinning, Ludhiana",
      excerpt: "Complete VFD installation project completed at Bansal Spinning mill in Ludhiana, enhancing energy efficiency and motor control.",
      content: "Detailed report on the VFD installation project at Bansal Spinning mill...",
      date: "20 January 2020",
      author: "Admin",
      category: "case-studies",
      tags: ["VFD Installation", "Spinning Mill", "Energy Efficiency", "Ludhiana"],
      image: "/api/placeholder/400/300",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Understanding the Benefits of AC Drives in Modern Industry",
      excerpt: "Explore how AC drives are revolutionizing industrial processes with improved efficiency, control, and energy savings.",
      content: "Comprehensive guide to AC drives and their benefits in modern industrial applications...",
      date: "15 November 2020",
      author: "Technical Team",
      category: "technical",
      tags: ["AC Drives", "Industrial Automation", "Energy Efficiency", "Technology"],
      image: "/api/placeholder/400/300",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "New Partnership with Siemens: Expanding Our Automation Portfolio",
      excerpt: "NovaGen Automation announces new partnership with Siemens, expanding our range of industrial automation solutions.",
      content: "Details about our new partnership with Siemens and what it means for our customers...",
      date: "10 October 2020",
      author: "Admin",
      category: "company-news",
      tags: ["Siemens", "Partnership", "Automation", "New Products"],
      image: "/api/placeholder/400/300",
      readTime: "3 min read"
    },
    {
      id: 6,
      title: "The Future of Industrial Automation: Trends to Watch in 2024",
      excerpt: "Industry experts share insights on the latest trends shaping the future of industrial automation and smart manufacturing.",
      content: "Expert analysis of upcoming trends in industrial automation for 2024 and beyond...",
      date: "5 September 2020",
      author: "Industry Expert",
      category: "industry-insights",
      tags: ["Future Trends", "Industry 4.0", "Smart Manufacturing", "IoT"],
      image: "/api/placeholder/400/300",
      readTime: "7 min read"
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Stay updated with the latest news, case studies, and insights from the world of industrial automation
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
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
                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                      <a href={`/blog/${post.id}`}>{post.title}</a>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="inline-flex items-center space-x-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          <Tag className="h-3 w-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>

                    {/* Read More Link */}
                    <a 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get the latest updates on industrial automation, product launches, and industry insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Tags</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Danfoss', 'Siemens', 'VFD', 'AC Drives', 'Energy Efficiency', 'Industrial Automation', 'Case Studies', 'Technical', 'Product Updates', 'Industry Insights'].map((tag, index) => (
              <a
                key={index}
                href="#"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}