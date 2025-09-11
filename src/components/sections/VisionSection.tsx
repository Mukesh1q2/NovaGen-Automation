import Link from 'next/link'
import { Building, Diamond, Handshake, HelpCircle } from 'lucide-react'

interface VisionItem {
  id: number
  title: string
  icon: React.ReactNode
  description: string
  link: string
}

export default function VisionSection() {
  const visionItems: VisionItem[] = [
    {
      id: 1,
      title: "Vendor Base",
      icon: <Building className="h-12 w-12 text-blue-600" />,
      description: "Strong relationships with leading industrial automation manufacturers",
      link: "/vision#vendor"
    },
    {
      id: 2,
      title: "Our Value",
      icon: <Diamond className="h-12 w-12 text-blue-600" />,
      description: "Commitment to quality, innovation, and customer satisfaction",
      link: "/vision#value"
    },
    {
      id: 3,
      title: "Our Promise",
      icon: <Handshake className="h-12 w-12 text-blue-600" />,
      description: "Dedicated to providing reliable automation solutions",
      link: "/vision#promise"
    },
    {
      id: 4,
      title: "Why Us??",
      icon: <HelpCircle className="h-12 w-12 text-blue-600" />,
      description: "Experience, expertise, and excellence in automation",
      link: "/vision#why"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-blue-600 text-lg font-semibold">NovaGen</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mt-2">Vision & Mission</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}