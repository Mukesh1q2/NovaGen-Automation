import { Calendar, User, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: number
  title: string
  content: string
  date: string
  author: string
  category: string
  tags: string[]
  image: string
  readTime: string
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the blog post data based on the ID
  const blogPost: BlogPost = {
    id: parseInt(params.id),
    title: "Trial of Danfoss VFD at Pagro Food",
    content: `
      <h3>Project Overview</h3>
      <p>NovaGen Automation recently completed a successful trial installation of Danfoss VFD (Variable Frequency Drive) at Pagro Food processing facility. This project aimed to improve energy efficiency and enhance process control in their production line.</p>
      
      <h3>Challenge</h3>
      <p>Pagro Food was facing challenges with their existing motor control systems, including high energy consumption, inconsistent product quality due to varying motor speeds, and frequent maintenance requirements. The company needed a solution that could address these issues while providing a good return on investment.</p>
      
      <h3>Solution</h3>
      <p>After a thorough analysis of their requirements, NovaGen Automation recommended and installed Danfoss VLT drives for their critical applications. The solution included:</p>
      <ul>
        <li>VLT AutomationDrive FC 360 for main processing motors</li>
        <li>VLT MicroDrive FC 51 for auxiliary equipment</li>
        <li>Custom programming for specific process requirements</li>
        <li>Integration with existing control systems</li>
        <li>Comprehensive training for maintenance staff</li>
      </ul>
      
      <h3>Implementation</h3>
      <p>The implementation was carried out in phases to minimize production downtime:</p>
      <ol>
        <li><strong>Site Survey and Analysis:</strong> Detailed assessment of existing systems and requirements</li>
        <li><strong>System Design:</strong> Custom solution design tailored to specific needs</li>
        <li><strong>Installation:</strong> Professional installation during planned maintenance periods</li>
        <li><strong>Commissioning:</strong> Thorough testing and optimization</li>
        <li><strong>Training:</strong> Comprehensive training for operators and maintenance staff</li>
      </ol>
      
      <h3>Results</h3>
      <p>The trial period showed impressive results:</p>
      <ul>
        <li><strong>Energy Savings:</strong> 35% reduction in energy consumption compared to previous systems</li>
        <li><strong>Process Control:</strong> Improved product consistency with precise speed control</li>
        <li><strong>Maintenance:</strong> 60% reduction in maintenance requirements</li>
        <li><strong>ROI:</strong> Project payback period of less than 18 months</li>
        <li><strong>Operator Satisfaction:</strong> Enhanced ease of use and monitoring capabilities</li>
      </ul>
      
      <h3>Client Testimonial</h3>
      <blockquote>
        "The Danfoss VFD solution provided by NovaGen Automation has transformed our operations. We've seen significant energy savings and improved product quality. The team's expertise and support throughout the project were exceptional." - Plant Manager, Pagro Food
      </blockquote>
      
      <h3>Conclusion</h3>
      <p>The successful trial at Pagro Food demonstrates the effectiveness of Danfoss VFD solutions in food processing applications. The project showcases NovaGen Automation's ability to deliver customized solutions that meet specific industry requirements while providing substantial benefits to clients.</p>
    `,
    date: "22 December 2020",
    author: "Admin",
    category: "case-studies",
    tags: ["Danfoss", "VFD", "Energy Savings", "Food Processing", "Case Study"],
    image: "/api/placeholder/800/400",
    readTime: "5 min read"
  }

  const relatedPosts = [
    {
      id: 2,
      title: "VFD Service at Molson Coors India Pvt LTD",
      excerpt: "Comprehensive VFD maintenance and service provided to Molson Coors India facility..."
    },
    {
      id: 3,
      title: "VFD installation at Bansal Spinning, Ludhiana",
      excerpt: "Complete VFD installation project completed at Bansal Spinning mill in Ludhiana..."
    },
    {
      id: 4,
      title: "Understanding the Benefits of AC Drives in Modern Industry",
      excerpt: "Explore how AC drives are revolutionizing industrial processes..."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center space-x-2 text-white hover:text-blue-200 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{blogPost.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{blogPost.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Related Posts */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 hover:text-blue-600 transition-colors">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </h4>
                      <p className="text-gray-600 text-sm">{post.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}