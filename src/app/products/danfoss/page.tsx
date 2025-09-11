import Link from 'next/link'
import { ArrowLeft, Settings, CheckCircle, Star } from 'lucide-react'

export default function DanfossPage() {
  const products = [
    {
      name: "AC Drives",
      description: "Variable frequency drives for precise motor control and energy efficiency",
      features: ["Energy efficient", "Precise control", "Easy installation", "Compact design"]
    },
    {
      name: "Soft Starters",
      description: "Smooth motor starting to reduce mechanical stress and electrical disturbances",
      features: ["Reduced starting current", "Built-in protection", "Communication options", "User-friendly interface"]
    },
    {
      name: "Harmonic Filters",
      description: "Active and passive harmonic filters for power quality improvement",
      features: ["THID reduction", "Compliance with standards", "Modular design", "Low maintenance"]
    },
    {
      name: "Pressure Transmitters",
      description: "High-precision pressure measurement for industrial applications",
      features: ["High accuracy", "Robust construction", "Various output options", "Easy calibration"]
    },
    {
      name: "Valves",
      description: "Industrial valves for flow control in various applications",
      features: ["Reliable operation", "Multiple sizes", "Different materials", "Actuator options"]
    },
    {
      name: "Refrigeration Compressors",
      description: "Energy-efficient compressors for commercial and industrial refrigeration",
      features: ["High efficiency", "Low noise", "Environmentally friendly", "Long service life"]
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/products" className="inline-flex items-center space-x-2 text-white hover:text-blue-200 transition-colors mb-4">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Products</span>
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Danfoss (AC Drives)</h1>
              <p className="text-xl max-w-3xl">
                Authorized channel partner of Danfoss Industries, providing comprehensive automation solutions
              </p>
            </div>
            <div className="hidden lg:block">
              <Settings className="h-24 w-24 text-blue-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Danfoss Products</h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  NovaGen Automation is proud to be an authorized channel partner of Danfoss Industries Pvt Ltd. Danfoss is a global leader in engineering solutions, specializing in climate and energy solutions. Their products are known for innovation, reliability, and energy efficiency.
                </p>
                <p className="leading-relaxed">
                  Our partnership with Danfoss allows us to offer a comprehensive range of AC drives, soft starters, harmonic filters, and other automation components that help industries optimize their processes and reduce energy consumption.
                </p>
                <p className="leading-relaxed">
                  Danfoss products are designed to meet the highest standards of quality and performance, making them ideal for various industrial applications including manufacturing, HVAC, water management, and more.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Energy efficiency up to 30%</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Reduced maintenance costs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Extended equipment life</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Global support network</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Environmentally friendly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Danfoss Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of Danfoss products for all your automation needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Key Features:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {product.name === "AC Drives" && (
                  <div className="mt-4">
                    <Link href="/products/danfoss/ac-drives" className="text-blue-600 hover:underline text-sm font-medium">
                      View Detailed Specifications →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Applications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Manufacturing</h3>
              <p className="text-gray-600 text-sm">Precision control for production lines and machinery</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❄️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">HVAC</h3>
              <p className="text-gray-600 text-sm">Climate control systems for buildings and facilities</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Water Management</h3>
              <p className="text-gray-600 text-sm">Pumps and treatment plants optimization</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Power Generation</h3>
              <p className="text-gray-600 text-sm">Efficient control systems for power plants</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need Danfoss Products?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get in touch with our experts to find the right Danfoss solution for your application
            </p>
            <Link href="/quote">
              <div className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                <span>Request Quote</span>
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}