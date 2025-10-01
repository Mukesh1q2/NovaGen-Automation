'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface Slide {
  id: string
  title: string
  description?: string | null
  desktopImage: string
  mobileImage: string
  link?: string | null
  order: number
  thumbnails?: string[]
}

// Default slides data
const defaultSlides: Slide[] = [
  {
    id: '1',
    title: "A.C Drive",
    description: "NovaGen Automation dealing in AC drives, soft starter & many more products of danfoss industries.",
    desktopImage: "/images/hero/ac-drive-desktop.jpg",
    mobileImage: "/images/hero/ac-drive-mobile.jpg",
    link: "/products/danfoss",
    order: 1,
    thumbnails: ["/images/products/ac-drive-1.jpg", "/images/products/ac-drive-2.jpg", "/images/products/ac-drive-3.jpg"]
  },
  {
    id: '2',
    title: "Filter Drier & Pressure Transmitter",
    description: "NovaGen Automation dealing in Valve, Filter Drier, Pressure Transmitter, refrigeration compressor & many more products of Danfoss Industries.",
    desktopImage: "/images/hero/filter-drier-desktop.jpg",
    mobileImage: "/images/hero/filter-drier-mobile.jpg",
    link: "/quote",
    order: 2,
    thumbnails: ["/images/products/filter-drier-1.jpg", "/images/products/filter-drier-2.jpg"]
  },
  {
    id: '3',
    title: "Servo Motors & Drives",
    description: "NovaGen Automation dealing in Servo Motor, Servo Drive, PLC, HMI, Cable, CPU & other accessories of Siemens make.",
    desktopImage: "/images/hero/servo-desktop.jpg",
    mobileImage: "/images/hero/servo-mobile.jpg",
    link: "/products/siemens",
    order: 3,
    thumbnails: ["/images/products/servo-1.jpg", "/images/products/servo-2.jpg", "/images/products/servo-3.jpg"]
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<Slide[]>(defaultSlides)
  const [isMounted, setIsMounted] = useState(false)

  // Load slides from API after component mounts
  useEffect(() => {
    let active = true

    const fetchSlides = async () => {
      setIsMounted(true)
      try {
        const response = await fetch('/api/slides', { cache: 'no-store' })
        if (!response.ok) {
          throw new Error('Failed to load slides')
        }
        const data = await response.json()
        if (!active) return

        const mapped: Slide[] = (data.slides ?? []).map((slide: any, index: number) => {
          const thumbnails = (slide.thumbnails ?? []).map((thumb: any) => thumb.url)
          const fallback = defaultSlides[index % defaultSlides.length]?.thumbnails ?? []

          return {
            id: slide.id,
            title: slide.title,
            description: slide.description ?? '',
            desktopImage: slide.desktopImage ?? defaultSlides[index % defaultSlides.length].desktopImage,
            mobileImage: slide.mobileImage ?? slide.desktopImage ?? defaultSlides[index % defaultSlides.length].mobileImage,
            link: slide.link ?? '/products',
            order: slide.order ?? 0,
            thumbnails: thumbnails.length ? thumbnails : fallback,
          }
        })

        setSlides(mapped.length ? mapped : defaultSlides)
      } catch (error) {
        console.error('Failed to load slides:', error)
        if (active) {
          setSlides(defaultSlides)
        }
      }
    }

    void fetchSlides()

    return () => {
      active = false
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [slides.length])

  // Don't render anything until component is mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section data-testid="hero-carousel" className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            data-testid="carousel-slide"
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.desktopImage}
                alt={slide.title}
                width={1920}
                height={600}
                className="w-full h-full object-cover hidden lg:block"
              />
              <Image
                src={slide.mobileImage}
                alt={slide.title}
                width={400}
                height={300}
                className="w-full h-full object-cover lg:hidden"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="container mx-auto px-4 text-center text-white">
                <div className="max-w-4xl mx-auto">
                  {slide.thumbnails && slide.thumbnails.length > 0 && (
                    <div className="flex justify-center space-x-4 mb-6 hidden lg:flex">
                      {slide.thumbnails.map((img, imgIndex) => (
                        <Image
                          key={imgIndex}
                          src={img}
                          alt={`Product ${imgIndex + 1}`}
                          width={150}
                          height={100}
                          className="w-24 h-16 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4 animate-fade-in-up">
                    {slide.title}
                  </h2>
                  <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
                    {slide.description}
                  </p>
                  <Link href={slide.link ?? "/products"}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg animate-fade-in-up shadow-lg">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 z-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}