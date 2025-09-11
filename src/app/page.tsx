import HeroCarousel from '@/components/sections/HeroCarousel'
import ServicesSection from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'
import ServiceCardsSection from '@/components/sections/ServiceCardsSection'
import TeamSection from '@/components/sections/TeamSection'
import VisionSection from '@/components/sections/VisionSection'
import BlogSection from '@/components/sections/BlogSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Marquee Section */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium">
            Authorised channel partner of M/s Danfoss Industries & M/s Siemens ltd.
          </span>
        </div>
      </div>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutSection />

      {/* Service Cards Section */}
      <ServiceCardsSection />

      {/* Team Section */}
      <TeamSection />

      {/* Vision & Mission Section */}
      <VisionSection />

      {/* Blog Section */}
      <BlogSection />
    </div>
  )
}