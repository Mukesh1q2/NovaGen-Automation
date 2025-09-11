import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">About Us</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-blue-600">NovaGen Automation</h2>
              
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  Inaugurated in the year 2003, at Ludhiana (Punjab, India), we, "NovaGen Automation" authorized Channel Partner with M/s Danfoss Industries Pvt Ltd & M/s Siemens Ltd.
                </p>
                
                <p className="leading-relaxed">
                  NovaGen Automation is one of the reliable Suppliers and Service Provider of superior quality assortment of AC Drives, Soft Starters, Harmonic Filter Active and Passive, Pressure Transmitter, Valve, Refrigeration Compressor, Touch Screen Panel, PLC Module, Analog Input Module, Servo Motor and Amplifier etc. These products are manufactured using the finest quality raw material and sophisticated technology at vendors' end. We are well-aware of the fact that maintaining quality is the prime requirement to flourish in any business that is why our professionals give their best to offer clients the best quality products.
                </p>
              </div>
              
              <Link href="/about">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="order-1 lg:order-2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/hero/company-office.jpg"
                alt="NovaGen Automation Office"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}