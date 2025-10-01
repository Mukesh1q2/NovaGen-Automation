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
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-3 overflow-hidden shadow-md">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-semibold tracking-wide">
            ✨ Authorised channel partner of M/s Danfoss Industries & M/s Siemens ltd. 🏆
          </span>
        </div>
      </div>

      {/* Hero Carousel */}
      <div className="animate-fade-in">
        <HeroCarousel />
      </div>

      {/* Services Section */}
      <div className="animate-fade-in-up">
        <ServicesSection />
      </div>

      {/* About Section */}
      <div className="animate-fade-in-up animation-delay-200">
        <AboutSection />
      </div>

      {/* Service Cards Section */}
      <div className="animate-fade-in-up animation-delay-400">
        <ServiceCardsSection />
      </div>

      {/* Team Section */}
      <div className="animate-fade-in-up animation-delay-200">
        <TeamSection />
      </div>

      {/* Vision & Mission Section */}
      <div className="animate-fade-in-up animation-delay-400">
        <VisionSection />
      </div>

      {/* Blog Section */}
      <div className="animate-fade-in-up animation-delay-600">
        <BlogSection />
      </div>
    </div>
  )
}
