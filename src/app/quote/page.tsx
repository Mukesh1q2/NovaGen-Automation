'use client'

import { useState } from 'react'
import { FileText, Calculator, CheckCircle, Send, Check } from 'lucide-react'
import { validateQuoteForm, ValidationError } from '@/lib/formValidation'

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    productType: '',
    quantity: '',
    budget: '',
    timeline: '',
    description: '',
    specifications: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<ValidationError[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateQuoteForm({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      industry: formData.industry,
      productType: formData.productType,
      description: formData.description
    })
    
    setErrors(validationErrors)
    
    if (validationErrors.length > 0) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Clear errors
    setErrors([])
  }

  const productTypes = [
    { value: '', label: 'Select Product Type' },
    { value: 'ac-drives', label: 'AC Drives' },
    { value: 'plc-systems', label: 'PLC Systems' },
    { value: 'hmi-panels', label: 'HMI/Touch Panels' },
    { value: 'servo-systems', label: 'Servo Motors & Drives' },
    { value: 'control-panels', label: 'Control Panels' },
    { value: 'dbr-systems', label: 'Dynamic Braking Resistors' },
    { value: 'custom-solution', label: 'Custom Solution' }
  ]

  const industries = [
    { value: '', label: 'Select Industry' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'food-beverage', label: 'Food & Beverage' },
    { value: 'textile', label: 'Textile' },
    { value: 'pharmaceutical', label: 'Pharmaceutical' },
    { value: 'water-treatment', label: 'Water Treatment' },
    { value: 'power-generation', label: 'Power Generation' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get A Quote</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Request a customized quote for your automation needs. Our experts will provide you with the best solution tailored to your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-800 mb-2">Quote Request Submitted Successfully!</h2>
                <p className="text-green-700 mb-4">
                  Thank you for your interest in NovaGen Automation. Our team will review your requirements and get back to you with a detailed quote within 24-48 hours.
                </p>
                <p className="text-green-600">
                  For immediate assistance, please call us at +91 98786-28680 or +91 70874-88699.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" aria-describedby="form-errors">
                {errors.length > 0 && (
                  <div id="form-errors" className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
                    <h3 className="text-red-800 font-semibold">Please correct the following errors:</h3>
                    <ul className="mt-2 list-disc list-inside text-red-700">
                      {errors.map((error, index) => (
                        <li key={index}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Company Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-blue-600" />
                    Company Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        aria-invalid={errors.some(e => e.field === 'name') ? 'true' : 'false'}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.some(e => e.field === 'name') 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.some(e => e.field === 'name') && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                          {errors.find(e => e.field === 'name')?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.some(e => e.field === 'company') 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="Your company name"
                      />
                      {errors.some(e => e.field === 'company') && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.find(e => e.field === 'company')?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.some(e => e.field === 'email') 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.some(e => e.field === 'email') && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.find(e => e.field === 'email')?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.some(e => e.field === 'phone') 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="+91 12345 67890"
                      />
                      {errors.some(e => e.field === 'phone') && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.find(e => e.field === 'phone')?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Requirements */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Calculator className="h-6 w-6 mr-2 text-blue-600" />
                    Project Requirements
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                        Industry *
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.some(e => e.field === 'industry') 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                      >
                        {industries.map(industry => (
                          <option key={industry.value} value={industry.value}>
                            {industry.label}
                          </option>
                        ))}
                      </select>
                      {errors.some(e => e.field === 'industry') && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.find(e => e.field === 'industry')?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Type *
                      </label>
                      <select
                        id="productType"
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.some(e => e.field === 'productType') 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                      >
                        {productTypes.map(product => (
                          <option key={product.value} value={product.value}>
                            {product.label}
                          </option>
                        ))}
                      </select>
                      {errors.some(e => e.field === 'productType') && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.find(e => e.field === 'productType')?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity/Units Required
                      </label>
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 5 units, 10 panels"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-1lakh">Under ₹1 Lakh</option>
                        <option value="1-5lakhs">₹1 - 5 Lakhs</option>
                        <option value="5-10lakhs">₹5 - 10 Lakhs</option>
                        <option value="10-25lakhs">₹10 - 25 Lakhs</option>
                        <option value="25-50lakhs">₹25 - 50 Lakhs</option>
                        <option value="above-50lakhs">Above ₹50 Lakhs</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                        Project Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select timeline</option>
                        <option value="immediate">Immediate (within 1 week)</option>
                        <option value="urgent">Urgent (1-4 weeks)</option>
                        <option value="normal">Normal (1-3 months)</option>
                        <option value="flexible">Flexible (3+ months)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.some(e => e.field === 'description') 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Please describe your project requirements in detail..."
                    ></textarea>
                    {errors.some(e => e.field === 'description') && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.find(e => e.field === 'description')?.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-2">
                      Technical Specifications (if any)
                    </label>
                    <textarea
                      id="specifications"
                      name="specifications"
                      value={formData.specifications}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Any specific technical requirements, brands, or standards..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Get Quote</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose NovaGen Automation?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Consultation</h3>
                <p className="text-gray-600">Get expert advice from our experienced engineers to find the perfect solution for your needs.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
                <p className="text-gray-600">We offer competitive pricing without compromising on quality or service.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
                <p className="text-gray-600">Get your quote within 24-48 hours with detailed specifications and pricing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}