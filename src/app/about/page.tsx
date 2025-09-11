'use client'

import Link from 'next/link'
import { ArrowLeft, Building, Target, Award, Wrench, Zap, Cpu } from 'lucide-react'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="inline-flex items-center space-x-2 text-white hover:text-blue-200 transition-colors mb-4">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-xl max-w-3xl">
                Learn more about NovaGen Automation and our commitment to excellence in industrial automation solutions
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-blue-500 p-4 rounded-lg">
                <Building className="h-24 w-24 text-blue-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">NovaGen Automation</h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed text-lg">
                  We are pleased to introduce ourselves as NovaGen Automation Systems & Solution.
                </p>
                <p className="leading-relaxed">
                  We are focused on bringing the best Automation technology in the world to our customers and creating 
                  innovative solutions tailored to the local market needs.
                </p>
                <p className="leading-relaxed">
                  We are your one Stop solution for all your Automation needs from Sensors to Cloud including PLC, VFDs, 
                  Motors, HMI, and Customized VFD & PLC Panels etc. including all the Hardware and Software involved 
                  in Automation Industry.
                </p>
                <p className="leading-relaxed">
                  Our team of highly qualified and experienced engineers involved in providing specialized technical 
                  services in the field of system design & integration, installation, commissioning, maintenance, 
                  servicing, repairing and supplying of spares for complete process control & automation.
                </p>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  NovaGen Automation Systems & Solution's vision is "To further strengthen and expand our new established 
                  position, and continue being the first choice for our esteemed customer and Prospective Customers".
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Our vision is the conduit for this success, and is founded on a team-building approach to our employee 
                  and client relationships. This Vision encompasses the tradition of quality services with an emphasis on 
                  innovation. Integral to the concept of quality is our adherence to the ethical and professional standards. 
                  We'll strive to implement long term relationship with our clients, based on safety, quality, timely 
                  service and an anticipation of their needs.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  With the aim of building a strong foundation as a Automation Solution provider throughout the nation. 
                  Considering the current industrial growth in the region, we recognize the need for more reliable and 
                  capable service organization.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  NovaGen Automation's mission is "To serve its customers with quality services which add value to 
                  their projects".
                </p>
              </div>
            </div>

            {/* Brands */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Brand Partnerships</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <Wrench className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Danfoss</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>Servo Motors</li>
                    <li>Servo Drives</li>
                    <li>HMI</li>
                    <li>VFD</li>
                    <li>Cables</li>
                    <li>Connectors</li>
                  </ul>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <Zap className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Siemens</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>Servo Motors</li>
                    <li>Servo Drives</li>
                    <li>HMI</li>
                    <li>VFD</li>
                    <li>Cables</li>
                    <li>Connectors</li>
                  </ul>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <Cpu className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Yaskawa</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>Servo Motors</li>
                    <li>Servo Drives</li>
                    <li>HMI</li>
                    <li>VFD</li>
                    <li>Cables</li>
                    <li>Connectors</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Electrical & Control Panels */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Electrical & Control Panels</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>MCC/PCC/DISTRIBUTION PANELS/APFC PANELS</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>PLC & VFD CONTROL PANELS</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm">
                    Our control panels are designed and manufactured to meet the highest standards of quality and 
                    reliability. Each panel is supplied complete with power supply, backplane, and measures for 
                    EMC compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}