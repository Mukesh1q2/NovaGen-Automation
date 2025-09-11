import Link from 'next/link'
import { ArrowLeft, Plug, CheckCircle, Star } from 'lucide-react'

export default function PanelPage() {
  const panelTypes = [
    {
      name: "Control Panels",
      description: "Custom-designed control panels for various industrial applications",
      features: ["Complete with power supply", "Backplane integration", "EMC compliance", "Easy installation"]
    },
    {
      name: "Automation Panels",
      description: "Advanced automation panels with integrated control systems",
      features: ["PLC integration", "HMI interface", "Safety circuits", "Remote monitoring"]
    },
    {
      name: "Power Distribution Panels",
      description: "Reliable power distribution solutions for industrial facilities",
      features: ["Multiple feeders", "Protection devices", "Metering options", "Compact design"]
    },
    {
      name: "Custom Panel Solutions",
      description: "Tailor-made panel solutions for specific application requirements",
      features: ["Custom design", "Application-specific", "Scalable solutions", "Complete documentation"]
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
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Electrical Panels</h1>
              <p className="text-xl max-w-3xl">
                Custom-designed automation panels with complete installation service and technical support
              </p>
            </div>
            <div className="hidden lg:block">
              <Plug className="h-24 w-24 text-blue-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our Panels</h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  NovaGen Automation specializes in designing and manufacturing high-quality electrical panels for industrial automation applications. Our panels are engineered to meet the highest standards of quality, safety, and performance.
                </p>
                <p className="leading-relaxed">
                  We offer customized panel solutions that are supplied complete with power supply, backplane, and measures for EMC compliance. Our panels are specifically designed to meet the unique requirements of each application, ensuring optimal performance and reliability.
                </p>
                <p className="leading-relaxed">
                  Our team of experienced engineers works closely with clients to understand their specific needs and deliver panel solutions that integrate seamlessly with their existing systems. We provide full installation service and comprehensive technical support to ensure smooth operation.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Custom design solutions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Complete installation service</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">EMC compliant designs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Quality components</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Technical support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Panel Types Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Panel Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of electrical panels for various industrial applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {panelTypes.map((panel, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{panel.name}</h3>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-gray-600 mb-4">{panel.description}</p>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Key Features:</h4>
                  <ul className="space-y-1">
                    {panel.features.map((feature, featureIndex) => (
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

      {/* Manufacturing Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Manufacturing Process</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Design</h3>
              <p className="text-gray-600 text-sm">Custom design based on application requirements</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Component Selection</h3>
              <p className="text-gray-600 text-sm">Quality components from trusted manufacturers</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Assembly</h3>
              <p className="text-gray-600 text-sm">Precision assembly by skilled technicians</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Testing</h3>
              <p className="text-gray-600 text-sm">Rigorous testing for quality assurance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quality Standards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Compliance</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>IEC standards</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>IS specifications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>EMC directives</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Testing</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Insulation resistance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Continuity tests</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Functional testing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need Custom Panels?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let our experts design the perfect panel solution for your specific requirements
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