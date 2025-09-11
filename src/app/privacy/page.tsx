'use client'

import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-blue-500 p-4 rounded-lg">
                <Lock className="h-24 w-24 text-blue-200" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Information We Collect</h2>
              
              <p className="text-gray-600 mb-4">
                We collect information you provide directly to us when you access or use our services, 
                contact us for information, or participate in our activities. This includes:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Name, email address, phone number, and company information when you contact us</li>
                <li>Information about your business needs and requirements</li>
                <li>Payment information when you purchase our products or services</li>
                <li>Correspondence and communications with our team</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">How We Use Your Information</h2>
              
              <p className="text-gray-600 mb-4">
                We use the information we collect to:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Provide, maintain, and improve our products and services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Process transactions and send transaction-related information</li>
                <li>Send you technical notices, updates, and promotional materials</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">Information Sharing and Disclosure</h2>
              
              <p className="text-gray-600 mb-4">
                We may share your information in the following circumstances:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>With vendors, consultants, and other service providers who need access to such information</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
                <li>Between and among NovaGen Automation and any current or future parent, subsidiary, or affiliated company</li>
                <li>To comply with legal obligations or to protect the rights, property, and safety of NovaGen Automation</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">Data Security</h2>
              
              <p className="text-gray-600 mb-6">
                We take reasonable measures to help protect information about you from loss, theft, misuse, 
                unauthorized access, disclosure, alteration, and destruction.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">Your Rights</h2>
              
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Access personal information we hold about you</li>
                <li>Request correction of inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing of your personal information</li>
                <li>Request transfer of your personal information</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8">Contact Us</h2>
              
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">NovaGen Automation</h3>
                <p className="text-gray-600 mb-1">Pot No. 56, Akal sahay Nagar</p>
                <p className="text-gray-600 mb-1">Mundian Kalan, Chandigarh Road</p>
                <p className="text-gray-600 mb-3">Ludhiana - 141015, Punjab, India</p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Phone:</span> +91 98786-28680, +91 70874-88699
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> office@novagenautomation.com
                </p>
              </div>
              
              <p className="text-gray-600">
                This Privacy Policy was last updated on April 5, 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}