// page.tsx - Dynamic product page

import Link from 'next/link'
import { ArrowLeft, Settings, CheckCircle, Star, Download, Package, Wrench, Check } from 'lucide-react'
import { getProductBySlug } from '@/lib/dbService'

async function getProduct(slug: string) {
  const product = await getProductBySlug(slug)
  if (!product) {
    return null
  }
  return { product, category: product.category }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const result = await getProduct(params.id)
  
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-600 hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    )
  }

  const { product, category } = result

  // Mock specifications for demo
  const productSpecs = {
    general: [
      { name: "Product Series", value: "VLT® AutomationDrive FC 302" },
      { name: "Power Range", value: "0.37 kW to 90 kW (0.5 HP to 125 HP)" },
      { name: "Voltage Range", value: "3 x 380-500 V (-15/+10%)" },
      { name: "Frequency Range", value: "0-2000 Hz" },
      { name: "Control Method", value: "V/f control, FC control, torque control" },
      { name: "Protection Class", value: "IP20 (Internal), IP55 (Built-in RF EMC filter)" }
    ],
    electrical: [
      { name: "Input Power", value: "3-phase 380-500 V" },
      { name: "Output Current", value: "1.2-170 A" },
      { name: "Overload Capacity", value: "150% for 1 minute (150% for 3 seconds)" },
      { name: "Efficiency", value: "Up to 98%" },
      { name: "Power Factor", value: ">0.95" },
      { name: "Harmonic Distortion", value: "THDi < 5% (with active filter)" }
    ]
  }

  const features = [
    "Advanced motor control algorithms for precise speed and torque control",
    "Built-in EMC filter for reduced electromagnetic interference",
    "Multiple communication protocols including Modbus, Profibus, and Ethernet/IP",
    "Intuitive keypad with multi-language support",
    "Plug-and-play installation with auto-configuration",
    "Energy optimization function to reduce power consumption"
  ]

  const applications = [
    "Pumps and fans in HVAC systems",
    "Conveyor belts in manufacturing",
    "Mixers and agitators in chemical processing",
    "Machine tools in metalworking"
  ]

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="text-blue-600 hover:underline">Products</Link>
            <span className="mx-2">/</span>
            <Link href={`/products/${category.slug}`} className="text-blue-600 hover:underline">{category.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <Link href={`/products/${category.slug}`} className="inline-flex items-center space-x-2 text-white hover:text-blue-200 transition-colors mb-4">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to {category.name} Products</span>
              </Link>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg max-w-2xl">
                {product.shortDescription}
              </p>
            </div>
            <div className="bg-blue-500 p-4 rounded-lg">
              <Settings className="h-16 w-16 text-blue-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-full">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0].url} alt={product.name} className="max-h-full max-w-full" />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 flex items-center justify-center text-gray-500">
                    Product Image
                  </div>
                )}
              </div>
              
              {/* Download Brochure */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline text-sm flex items-center">
                      Product Brochure (PDF)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline text-sm flex items-center">
                      Technical Manual (PDF)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Overview</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Key Benefits
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">Up to 30% energy savings</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">Reduced maintenance costs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">Extended motor life</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Product Information
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        <span className="font-medium">SKU:</span> {product.sku || 'N/A'}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Category:</span> {category.name}
                      </p>
                      {product.price && (
                        <p className="text-gray-600">
                          <span className="font-medium">Price:</span> ${product.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/quote" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Request Quote
                  </Link>
                  <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Add to Comparison
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Technical Specifications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Detailed technical specifications for the {product.name}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(productSpecs).map(([category, specs]) => (
              <div key={category} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
                  {category} Specifications
                </h3>
                <div className="space-y-3">
                  {specs.map((spec, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">{spec.name}:</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features and Applications */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Star className="h-6 w-6 text-blue-600 mr-2" />
                Key Features
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Applications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Wrench className="h-6 w-6 text-blue-600 mr-2" />
                Applications
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {applications.map((application, index) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
