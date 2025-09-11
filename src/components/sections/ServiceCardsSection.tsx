import Link from 'next/link'
import { Settings, Wrench, Zap } from 'lucide-react'

interface ServiceCard {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  link: string
}

export default function ServiceCardsSection() {
  const services: ServiceCard[] = [
    {
      id: 1,
      title: "Danfoss",
      description: "Troubleshoot and fix your Danfoss products to ensure smooth operations and high reliability For AC drives please contact your local sales office for fix and troubleshooting by certified service engineer. Online support available.",
      icon: <Settings className="h-16 w-16 text-blue-600" />,
      link: "/services/danfoss"
    },
    {
      id: 2,
      title: "Siemens",
      description: "Our Service experts provide you with comprehensive support directly from the product manufacturer. Whether you have technical questions or need urgent product and system support, you can reach us via phone or online support request.",
      icon: <Wrench className="h-16 w-16 text-blue-600" />,
      link: "/services/siemens"
    },
    {
      id: 3,
      title: "Vaccon",
      description: "Vaccon strives to manufacture the best AC drives and inverters in the world with optimum process control and energy efficiency for electronic motors. Most drive failures can be avoided through preventative maintenance.",
      icon: <Zap className="h-16 w-16 text-blue-600" />,
      link: "/services/vaccon"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Services</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.id} href={service.link}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer">
                {/* Front of card */}
                <div className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* Back of card (visible on hover) */}
                <div className="bg-blue-600 text-white p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}