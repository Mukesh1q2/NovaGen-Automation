import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Enquiry', href: '/contact' },
    { name: 'Career', href: '/career' },
    { name: 'FAQ', href: '/faq' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-blue-400">NovaGen Automation</h3>
            </div>
            <p className="text-gray-300 mb-4">
              We at NovaGen Automation are continuously working to interface technology, systems & human resources to provide products & services that meets quality & performance of the customers.
            </p>
            <div className="flex items-start space-x-2 text-gray-300">
              <MapPin className="h-5 w-5 mt-1 text-blue-400" />
              <span className="text-sm">
                Pot No. 56, Akal sahay Nagar, Mundian Kalan, Chandigarh Road, Ludhiana- 141015
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors group"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <div>
                  <span className="text-gray-300 text-sm">Contact no: </span>
                  <a href="tel:+919878628680" className="text-gray-300 hover:text-blue-400 transition-colors">
                    +91 98786-28680
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <div>
                  <span className="text-gray-300 text-sm">Contact no: </span>
                  <a href="tel:+917087488699" className="text-gray-300 hover:text-blue-400 transition-colors">
                    +91 70874-88699
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <div>
                  <span className="text-gray-300 text-sm">Email: </span>
                  <a href="mailto:office@novagenautomation.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                    office@novagenautomation.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <div>
                  <span className="text-gray-300 text-sm">Email: </span>
                  <a href="mailto:info@novagenautomation.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                    info@novagenautomation.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-blue-400">Follow Us:</h5>
              <div className="flex space-x-3">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Reach Us</h4>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d725.6356346654877!2d75.9375725!3d30.8811314!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a9d23f166a8ff%3A0x991c1f274249a2ec!2sEmson%20Power%20Engineers!5e1!3m2!1sen!2sin!4v1693899454721!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            © {currentYear} NovaGen Automation. Designed By Kalsi IT Solution.
          </div>
        </div>
      </div>
    </footer>
  )
}