import { Building, Diamond, Handshake, HelpCircle, Target, Lightbulb, Users, Award, Check } from 'lucide-react'

export default function VisionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Vision & Mission</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Our commitment to excellence, innovation, and customer satisfaction in industrial automation
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed text-lg">
                  To be the leading automation solutions provider in India, recognized for our technical expertise, customer-centric approach, and commitment to innovation. We strive to build long-term relationships with our clients by consistently delivering value and excellence in every project we undertake.
                </p>
                <div className="flex items-center space-x-3 pt-4">
                  <Target className="h-8 w-8 text-blue-600" />
                  <span className="text-blue-600 font-medium">Focused on Excellence</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed text-lg">
                  To provide cutting-edge automation solutions that empower industries to achieve operational excellence, enhance productivity, and maintain competitive advantage in the global marketplace. We are committed to delivering innovative, reliable, and cost-effective solutions that meet the highest standards of quality and performance.
                </p>
                <div className="flex items-center space-x-3 pt-4">
                  <Lightbulb className="h-8 w-8 text-blue-600" />
                  <span className="text-blue-600 font-medium">Driving Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div id="vendor" className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <Building className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Vendor Base</h3>
              <p className="text-gray-600 leading-relaxed">
                Strong relationships with leading industrial automation manufacturers including Danfoss and Siemens, ensuring access to the latest technologies and genuine products.
              </p>
            </div>
            
            <div id="value" className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <Diamond className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Value</h3>
              <p className="text-gray-600 leading-relaxed">
                Commitment to quality, innovation, and customer satisfaction. We believe in delivering value through excellence in every aspect of our business.
              </p>
            </div>
            
            <div id="promise" className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <Handshake className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Promise</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated to providing reliable automation solutions with unmatched technical support, timely delivery, and long-term partnerships with our clients.
              </p>
            </div>
            
            <div id="why" className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <HelpCircle className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Why Us?</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience, expertise, and excellence in automation solutions with a proven track record of successful projects across various industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose NovaGen */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose NovaGen Automation?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the advantages of partnering with us for your automation needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Expert Team</h3>
              </div>
              <p className="text-gray-600">
                Our team of highly skilled professionals has extensive experience in industrial automation and is dedicated to providing the best solutions for your needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Quality Assurance</h3>
              </div>
              <p className="text-gray-600">
                We source and supply only the highest quality products from reputable manufacturers, ensuring reliability and longevity of all our solutions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Custom Solutions</h3>
              </div>
              <p className="text-gray-600">
                We understand that every industry has unique requirements. We provide tailored solutions that address specific challenges and optimize operations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Building className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Authorized Partner</h3>
              </div>
              <p className="text-gray-600">
                As authorized channel partners of Danfoss and Siemens, we provide genuine products with full manufacturer support and warranty.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Handshake className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Customer Focus</h3>
              </div>
              <p className="text-gray-600">
                We put our customers at the center of everything we do, building long-term relationships based on trust, reliability, and mutual success.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="h-8 w-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Innovation</h3>
              </div>
              <p className="text-gray-600">
                We stay at the forefront of automation technology, continuously updating our knowledge and offerings to provide the most advanced solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-600 text-white rounded-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Commitment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">To Our Customers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
                      <span>Uncompromising quality in all products and services</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
                      <span>Timely delivery and project execution</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
                      <span>24/7 technical support and maintenance</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
                      <span>Continuous improvement and innovation</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">To Our Industry</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
                      <span>Promoting energy-efficient solutions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
                      <span>Advancing automation technology</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
                      <span>Maintaining highest safety standards</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-blue-200 flex-shrink-0 mt-0.5" />
                      <span>Building sustainable industrial practices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Future Goals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our vision for the future and commitment to growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2025</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Expand Reach</h3>
              <p className="text-gray-600 text-sm">Extend our services to new regions and industries</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2026</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation Hub</h3>
              <p className="text-gray-600 text-sm">Establish R&D center for automation solutions</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2027</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">Lead in green automation solutions</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2028</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Presence</h3>
              <p className="text-gray-600 text-sm">Establish international operations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}