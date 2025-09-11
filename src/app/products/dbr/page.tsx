import Link from 'next/link'
import { ArrowLeft, Wrench, CheckCircle, Star } from 'lucide-react'

export default function DBRPage() {
  const products = [
    {
      name: "Dynamic Braking Resistors",
      description: "High-quality DBR units for effective motor braking and energy dissipation",
      features: ["High power rating", "Compact design", "Multiple resistance values", "Durable construction"]
    },
    {
      name: "Braking Units",
      description: "Advanced braking units for precise control of motor stopping operations",
      features: ["Fast response", "Adjustable braking", "Overload protection", "Easy integration"]
    },
    {
      name: "Power Resistors",
      description: "Industrial-grade power resistors for various applications",
      features: ["High wattage", "Multiple configurations", "Cooling options", "Long life"]
    },
    {
      name: "Custom DBR Solutions",
      description: "Tailor-made DBR solutions for specific application requirements",
      features: ["Custom design", "Application-specific", "Complete systems", "Technical support"]
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
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">DBR</h1>
              <p className="text-xl max-w-3xl">
                Dynamic Braking Resistors for effective motor braking and energy dissipation in industrial applications
              </p>
            </div>
            <div className="hidden lg:block">
              <Wrench className="h-24 w-24 text-blue-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Dynamic Braking Resistors</h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  NovaGen Automation offers a comprehensive range of Dynamic Braking Resistors (DBR) designed to provide effective motor braking and energy dissipation in various industrial applications. DBRs are essential components in drive systems where controlled deceleration and braking are required.
                </p>
                <p className="leading-relaxed">
                  Our DBR solutions are engineered to handle high power dissipation requirements while maintaining reliability and longevity. We provide both standard and custom DBR solutions to meet the specific needs of different industries and applications.
                </p>
                <p className="leading-relaxed">
                  Dynamic Braking Resistors are crucial for applications involving frequent start-stop cycles, overhauling loads, or where precise speed control is necessary. They help in converting the kinetic energy of the motor into heat energy, providing smooth and controlled braking.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Controlled braking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Energy dissipation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Motor protection</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Long service life</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Custom solutions</span>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our DBR Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of dynamic braking resistors for industrial applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Technical Specifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Technical Specifications</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Range</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Power Rating</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1kW - 500kW</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Wide range of power ratings available</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Resistance Values</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.1Ω - 1000Ω</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Custom resistance values as per requirement</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Voltage Rating</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">415V - 1000V</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Suitable for various voltage levels</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Duty Cycle</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Intermittent - Continuous</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Based on application requirements</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Protection</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">IP20 - IP54</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Various protection levels available</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Applications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Cranes & Hoists</h3>
              <p className="text-gray-600 text-sm">Controlled braking for lifting equipment</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚆</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Elevators</h3>
              <p className="text-gray-600 text-sm">Smooth stopping for elevator systems</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Machine Tools</h3>
              <p className="text-gray-600 text-sm">Precision braking for machinery</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏭</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Conveyors</h3>
              <p className="text-gray-600 text-sm">Controlled stopping of conveyor systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need DBR Solutions?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our experts can help you select the right DBR solution for your application
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