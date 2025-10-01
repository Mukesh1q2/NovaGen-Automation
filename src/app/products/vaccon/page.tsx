import Link from 'next/link'
import { ArrowLeft, Cpu, CheckCircle, Star, Wrench, BarChart, Settings, BookOpen } from 'lucide-react'

export default function VacconPage() {
  const products = [
    {
      name: "AC Drives",
      description: "High-performance AC drives for various industrial applications",
      features: ["Optimum process control", "Energy efficient", "Compact design", "Easy programming"]
    },
    {
      name: "Medium Voltage Drives",
      description: "Modular medium-voltage drives for systems integrators and OEMs",
      features: ["Modular design", "High power range", "Advanced control", "Low maintenance"]
    },
    {
      name: "Inverters",
      description: "Premium inverters for motor speed control and energy optimization",
      features: ["High efficiency", "Precise control", "Multiple communication options", "Built-in diagnostics"]
    },
    {
      name: "Control Systems",
      description: "Comprehensive control systems for complex automation requirements",
      features: ["Integrated solution", "Scalable architecture", "User-friendly interface", "Remote monitoring"]
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
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Vaccon</h1>
              <p className="text-xl max-w-3xl">
                Premium AC drives and inverters for optimal process control and energy efficiency
              </p>
            </div>
            <div className="hidden lg:block">
              <Cpu className="h-24 w-24 text-blue-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Vaccon Products</h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  Vaccon is a leading manufacturer of high-quality AC drives and inverters, specializing in solutions that deliver optimum process control and energy efficiency for electronic motors. Their commitment to innovation and quality has made them a trusted name in the automation industry.
                </p>
                <p className="leading-relaxed">
                  At NovaGen Automation, we offer Vaccon's comprehensive range of products that are designed to meet the demanding requirements of modern industrial applications. Vaccon drives are known for their reliability, performance, and ease of use.
                </p>
                <p className="leading-relaxed">
                  The Vaccon range of modular medium-voltage drives empowers systems integrators and OEMs, delivering a whole new approach to attaining the ultimate in performance, exactly tailored to the needs of each application.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Energy efficiency up to 98%</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Long service life</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Low maintenance requirements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Global technical support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Custom solutions available</span>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vaccon Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              High-performance drives and inverters for industrial applications
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Maintenance Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Preventative maintenance is key to avoiding drive failures and ensuring optimal performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Regular Check-ups</h3>
              <p className="text-gray-600 text-sm">Scheduled maintenance to prevent unexpected failures</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Performance Analysis</h3>
              <p className="text-gray-600 text-sm">Detailed analysis of drive performance and efficiency</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Emergency Repairs</h3>
              <p className="text-gray-600 text-sm">24/7 emergency repair services for critical situations</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Training</h3>
              <p className="text-gray-600 text-sm">Operator and maintenance training programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need Vaccon Products?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get expert advice on selecting the right Vaccon drive for your application
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