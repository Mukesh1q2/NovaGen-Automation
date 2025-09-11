import Link from 'next/link'
import { ArrowLeft, Zap, CheckCircle, Star } from 'lucide-react'

export default function SiemensPage() {
  const products = [
    {
      name: "Servo Motors",
      description: "High-performance servo motors for precise motion control applications",
      features: ["High precision", "Compact design", "Multiple frame sizes", "High torque density"]
    },
    {
      name: "Servo Drives",
      description: "Advanced servo drives for optimal motor control and performance",
      features: ["Fast response", "Multi-axis control", "Integrated safety", "Easy commissioning"]
    },
    {
      name: "PLC Modules",
      description: "Programmable Logic Controllers for industrial automation",
      features: ["Modular design", "High processing power", "Extensive I/O options", "Network connectivity"]
    },
    {
      name: "HMI/Touch Panels",
      description: "Human Machine Interface solutions for operator control and visualization",
      features: ["Intuitive interface", "High resolution", "Robust construction", "Multiple sizes"]
    },
    {
      name: "Analog Input Modules",
      description: "Precision analog input modules for signal acquisition",
      features: ["High accuracy", "Multiple ranges", "Isolation options", "Diagnostics"]
    },
    {
      name: "Cables & Connectors",
      description: "High-quality cables and connectors for reliable system integration",
      features: ["Shielded cables", "Various lengths", "Industrial grade", "Easy installation"]
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
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Siemens</h1>
              <p className="text-xl max-w-3xl">
                Authorized partner of Siemens Ltd., offering comprehensive automation and drive solutions
              </p>
            </div>
            <div className="hidden lg:block">
              <Zap className="h-24 w-24 text-blue-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Siemens Products</h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  NovaGen Automation is an authorized partner of Siemens Ltd., a global powerhouse in electrical engineering and electronics. Siemens is renowned for its innovative technologies, comprehensive portfolio, and commitment to quality in the automation industry.
                </p>
                <p className="leading-relaxed">
                  Our partnership with Siemens enables us to provide cutting-edge automation solutions including servo systems, PLCs, HMIs, and various industrial components. Siemens products are known for their reliability, precision, and advanced features that help industries achieve optimal performance.
                </p>
                <p className="leading-relaxed">
                  With Siemens products, we offer solutions that cater to various industries including manufacturing, automotive, pharmaceuticals, food processing, and more, ensuring high productivity and efficiency.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">German engineering quality</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Advanced technology</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Global support network</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Comprehensive portfolio</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Industry 4.0 ready</span>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Siemens Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete range of Siemens automation and drive solutions
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

      {/* Applications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Applications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Automotive</h3>
              <p className="text-gray-600 text-sm">Precision manufacturing and assembly lines</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pharmaceuticals</h3>
              <p className="text-gray-600 text-sm">Compliant automation for drug manufacturing</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍕</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Food Processing</h3>
              <p className="text-gray-600 text-sm">Hygienic automation solutions</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Packaging</h3>
              <p className="text-gray-600 text-sm">High-speed packaging machinery control</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need Siemens Products?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact our experts to find the perfect Siemens solution for your automation needs
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