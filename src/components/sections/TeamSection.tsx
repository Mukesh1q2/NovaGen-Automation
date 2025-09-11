import Link from 'next/link'
import { Users } from 'lucide-react'
import Image from 'next/image'

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
}

export default function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Sales Team",
      role: "Professional Sales",
      image: "/images/team/sales-team.jpg"
    },
    {
      id: 2,
      name: "Technical Team",
      role: "Expert Engineers",
      image: "/images/team/technical-team.jpg"
    },
    {
      id: 3,
      name: "Backend Team",
      role: "Support Staff",
      image: "/images/team/backend-team.jpg"
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Our Professional Team</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                  <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  <Link href="/team" className="hover:text-blue-600 transition-colors">
                    {member.name}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
          
          {/* Read More Card */}
          <div className="bg-blue-600 text-white rounded-lg p-6 flex flex-col justify-between h-full">
            <div className="mb-4">
              <div className="flex justify-center mb-4">
                <Users className="h-16 w-16" />
              </div>
              <div className="text-center">
                <Link href="/team" className="text-xl font-semibold hover:underline">
                  Read More
                </Link>
              </div>
            </div>
            <div className="text-sm leading-relaxed">
              <p>
                <strong>Our team</strong> has played a vital role behind every success achieved and we have highly dedicated and competitive team of professionals, who assists us in offering clients different products as per their needs. Moreover, our professionals are highly experienced and help us to procure premium quality products from some of the reliable vendors of the market as well.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}