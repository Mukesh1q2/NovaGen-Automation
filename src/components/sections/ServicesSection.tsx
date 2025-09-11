import { Settings, Zap, Cpu, Plug } from 'lucide-react'

interface Service {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

export default function ServicesSection() {
  const services: Service[] = [
    {
      id: 1,
      title: "Danfoss",
      description: "An extremely flexible and cost-effective drive suitable for all industry. Energy efficient technologies empower smart communities and industries to create healthier and more comfortable climates",
      icon: <Settings className="h-12 w-12 text-blue-600" />
    },
    {
      id: 2,
      title: "Siemens",
      description: "A comprehensive portfolio of reliable frequency converters, motors, cables and connectors for almost every industry and field of application satisfies the highest performance standards and quality requirements.",
      icon: <Zap className="h-12 w-12 text-blue-600" />
    },
    {
      id: 3,
      title: "Panel",
      description: "The systems are supplied complete with power supply, backplane, measures for EMC. Specifically customized panel with full installation service.",
      icon: <Cpu className="h-12 w-12 text-blue-600" />
    },
    {
      id: 4,
      title: "Vaccon",
      description: "This range of modular medium-voltage (MV) drives empowers systems integrators and OEMs, delivering a whole new approach to attaining the ultimate in performance, exactly tailored to the needs of each application.",
      icon: <Plug className="h-12 w-12 text-blue-600" />
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}