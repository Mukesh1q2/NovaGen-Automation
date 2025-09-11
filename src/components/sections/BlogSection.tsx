import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  author: string
  image: string
}

export default function BlogSection() {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Trial of Danfoss VFD at Pagro Food",
      excerpt: "Successful installation and testing of Danfoss VFD system at Pagro Food processing facility.",
      date: "22 December 2020",
      author: "Admin",
      image: "/api/placeholder/400/300"
    },
    {
      id: 2,
      title: "VFD Service at Molson Coors India Pvt LTD",
      excerpt: "Comprehensive VFD maintenance and service provided to Molson Coors India facility.",
      date: "21 December 2020",
      author: "Admin",
      image: "/api/placeholder/400/300"
    },
    {
      id: 3,
      title: "VFD installation at Bansal Spinning, Ludhiana",
      excerpt: "Complete VFD installation project completed at Bansal Spinning mill in Ludhiana.",
      date: "20 January 2020",
      author: "Admin",
      image: "/api/placeholder/400/300"
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-blue-600 text-lg font-semibold">Latest Articles</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-2">Our Blog</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Author and Date */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <span>View More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}