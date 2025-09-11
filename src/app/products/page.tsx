import Link from 'next/link'
import { Settings, Zap, Cpu, Plug, Wrench, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import { fetchCategories } from '@/lib/apiClient'

export const metadata: Metadata = {
  title: 'Products | NovaGen Automation',
  description: 'Explore our comprehensive range of industrial automation products from Danfoss, Siemens, Vaccon, and custom panel solutions.',
  keywords: ['Industrial Automation Products', 'Danfoss Products', 'Siemens Products', 'AC Drives', 'PLC Modules', 'Control Panels'],
  openGraph: {
    title: 'Products | NovaGen Automation',
    description: 'Discover our wide range of industrial automation products including AC drives, PLC modules, servo motors, and custom control panels.',
    url: 'https://novagenautomation.com/products',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products | NovaGen Automation',
    description: 'Explore our comprehensive range of industrial automation products from leading manufacturers.',
  },
}

interface ProductCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  slug: string
}

async function getCategories() {
  const { categories } = await fetchCategories()
  return categories
}

export default async function ProductsPage() {
  // Get categories from API
  const categories = await getCategories()
  
  // Map to the format we need
  const productCategories: ProductCategory[] = categories.map((category: any) => {
    let iconComponent: React.ReactNode
    
    switch (category.name.toLowerCase()) {
      case 'danfoss':
        iconComponent = <Settings className="h-16 w-16 text-blue-600" />
        break
      case 'siemens':
        iconComponent = <Zap className="h-16 w-16 text-blue-600" />
        break
      case 'vaccon':
        iconComponent = <Cpu className="h-16 w-16 text-blue-600" />
        break
      case 'panel':
        iconComponent = <Plug className="h-16 w-16 text-blue-600" />
        break
      default:
        iconComponent = <Wrench className="h-16 w-16 text-blue-600" />
    }
    
    return {
      id: category.id,
      name: category.name,
      description: category.description || `Comprehensive range of ${category.name} products`,
      icon: iconComponent,
      slug: category.slug
    }
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Explore our comprehensive range of industrial automation products from leading manufacturers
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6 text-center leading-relaxed">
                    {category.description}
                  </p>
                  
                  <Link href={`/products/${category.slug}`}>
                    <div className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-lg p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need Custom Solutions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Don't see what you're looking for? We provide custom automation solutions tailored to your specific requirements.
            </p>
            <Link href="/quote">
              <div className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <span>Get A Quote</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Why Choose Our Products?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">All products are sourced from authorized manufacturers and undergo strict quality checks</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Energy Efficient</h3>
              <p className="text-gray-600">Our products are designed to optimize energy consumption and reduce operational costs</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">🛠️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
              <p className="text-gray-600">Expert technical support and maintenance services for all our products</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">📦</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Fast and reliable delivery to ensure minimal downtime for your operations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}