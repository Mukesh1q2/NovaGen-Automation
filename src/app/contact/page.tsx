'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { validateContactForm, ValidationError } from '@/lib/formValidation'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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
    const validationErrors = validateContactForm(formData)
    setErrors(validationErrors)
    
    if (validationErrors.length > 0) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    // Clear errors
    setErrors([])
  }

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Address",
      details: [
        "Pot No. 56, Akal sahay Nagar",
        "Mundian Kalan, Chandigarh Road",
        "Ludhiana - 141015, Punjab, India"
      ]
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Phone",
      details: [
        "+91 98786-28680",
        "+91 70874-88699"
      ]
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email",
      details: [
        "office@novagenautomation.com",
        "info@novagenautomation.com"
      ]
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Business Hours",
      details: [
        "Monday - Saturday: 9:30 AM - 6:30 PM",
        "Sunday: Closed"
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Get in touch with our experts for all your automation needs. We're here to help you find the perfect solution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-describedby="form-errors">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
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
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        aria-invalid={errors.some(e => e.field === 'email') ? 'true' : 'false'}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.some(e => e.field === 'email') 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.some(e => e.field === 'email') && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                          {errors.find(e => e.field === 'email')?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
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
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.some(e => e.field === 'subject') 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="service-request">Service Request</option>
                        <option value="quotation">Quotation</option>
                        <option value="general">General Inquiry</option>
                      </select>
                      {errors.some(e => e.field === 'subject') && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.find(e => e.field === 'subject')?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.some(e => e.field === 'message') 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                    {errors.some(e => e.field === 'message') && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.find(e => e.field === 'message')?.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Find Us</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d725.6356346654877!2d75.9375725!3d30.8811314!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9d23f166a8ff%3A0x991c1f274249a2ec!2sEmson%20Power%20Engineers!5e1!3m2!1sen!2sin!4v1693899454721!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-96"
                ></iframe>
              </div>

              {/* Quick Contact */}
              <div className="mt-8 bg-blue-600 text-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Need Immediate Assistance?</h3>
                <p className="mb-4">Call us directly for urgent inquiries or technical support.</p>
                <div className="space-y-2">
                  <a href="tel:+919878628680" className="block hover:text-blue-200 transition-colors">
                    📞 +91 98786-28680
                  </a>
                  <a href="tel:+917087488699" className="block hover:text-blue-200 transition-colors">
                    📞 +91 70874-88699
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">What areas do you serve?</h3>
                <p className="text-gray-600">We primarily serve the Punjab region and North India, but we can provide solutions and support across India based on project requirements.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Do you provide after-sales support?</h3>
                <p className="text-gray-600">Yes, we provide comprehensive after-sales support including installation, maintenance, and technical assistance for all our products.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">How can I get a quote for my project?</h3>
                <p className="text-gray-600">You can fill out the contact form above or call us directly. Our team will get back to you with a detailed quote based on your requirements.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">What brands do you work with?</h3>
                <p className="text-gray-600">We are authorized partners of Danfoss and Siemens, and we also work with other leading automation brands to provide comprehensive solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}