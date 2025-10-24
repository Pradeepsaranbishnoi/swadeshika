/**
 * Hero Slider Component
 *
 * An auto-playing carousel for the homepage hero section that showcases
 * promotional content, product categories, and brand messaging.
 *
 * Features:
 * - Auto-play with 6-second intervals
 * - Manual navigation with prev/next arrows
 * - Dot indicators for slide position
 * - Smooth transitions with fade and scale effects
 * - Responsive design with mobile-optimized content
 * - Pause auto-play on manual interaction
 *
 * The slider uses React state to manage the current slide and auto-play status,
 * with useEffect handling the auto-play timer logic.
 */

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Slide data configuration - Each slide represents a promotional campaign
// Images, copy, and CTAs can be easily updated here
const slides = [
  {
    id: 1,
    title: "Taste the Tradition Feel the Purity",
    // subtitle: "Authentic Desi Ghee",
    description: "Crafted with care, perfected with purity, cherished for generations.",
    image: "/slider.png",
    cta: "Discover Ghee",
    ctaLink: "/shop/ghee",
  },
  // {
  //   id: 1,
  //   title: "Pure Tradition in Every Spoonful",
  //   subtitle: "Authentic Desi Ghee",
  //   description: "Handcrafted from grass-fed cow milk using time-honored methods",
  //   image: "/hero-slide-1-traditional-ghee.jpg",
  //   cta: "Discover Ghee",
  //   ctaLink: "/shop/ghee",
  // },
  {
    id: 2,
    title: "Spices That Tell Stories",
    subtitle: "Farm-Fresh Aromatics",
    description: "Sourced directly from organic farms across India",
    image: "/hero-slide-2-spices.jpg",
    cta: "Explore Spices",
    ctaLink: "/shop/spices",
  },
  {
    id: 3,
    title: "Nature's Finest Treasures",
    subtitle: "Premium Dry Fruits",
    description: "Handpicked nuts and dried fruits for wholesome nutrition",
    image: "/hero-slide-3-dry-fruits.jpg",
    cta: "Shop Collection",
    ctaLink: "/shop/dry-fruits",
  },
]

export function HeroSlider() {
  // State management for current slide index and auto-play status
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play effect - Advances to next slide every 6 seconds
  // Cleans up interval on component unmount or when auto-play is disabled
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length) // Loop back to first slide
    }, 6000) // 6 second interval

    return () => clearInterval(interval) // Cleanup on unmount
  }, [isAutoPlaying])

  // Manual slide navigation functions
  // These disable auto-play to give user full control
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false) // Stop auto-play when user manually selects slide
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length) // Handle negative wrap-around
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden bg-muted">
      {/* Slides Container - All slides are rendered but only current is visible */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-all duration-[1500ms] ease-out",
            // Current slide: fully visible and normal scale
            // Other slides: invisible and slightly scaled up for smooth transition
            index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0",
          )}
        >
          {/* Background image with cover fit */}
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability, slightly softer for brand look */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" /> */}

          {/* Slide Content - Text and CTAs */}
          <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
            <div className="max-w-3xl space-y-8">
              {/* Animated content - Fades in and slides up when slide becomes active */}
              <div
                className={cn(
                  "transition-all duration-1000 delay-300", // Delayed animation for staggered effect
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
              >
                {/* Subtitle - Small caps for emphasis */}
                <p className="text-white/90 text-sm lg:text-base font-medium tracking-widest uppercase mb-4">
                  {slide.subtitle}
                </p>
                {/* Main heading - Large serif font for elegance */}
                <h1 className="font-sans text-5xl sm:text-4xl lg:text-7xl xl:text-6xl font-bold  text-balance leading-[1.1] mb-6">
                  {slide.title}
                </h1>
                {/* Description text */}
                <p className="text-xl lg:text-2xl text-pretty max-w-2xl mb-10 leading-relaxed">
                  {slide.description}
                </p>
                {/* CTA buttons - Primary and secondary actions */}
                <div className="flex flex-wrap gap-4">
                  {/* Primary CTA - Shop category */}
                  {slide.ctaLink && (
                  <Button
                    size="lg"
                    asChild
                    className="bg-[#2D5F3F] hover:bg-[#234A32] text-white px-8 py-4 text-base h-auto rounded-full group shadow-lg"
                  >
                    <Link href={slide.ctaLink}>
                      {slide.cta}
                      {/* Animated arrow icon on hover */}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  )}
                  {/* Secondary CTA - Learn about brand */}
                  {/* <Button
                    size="lg"
                    asChild
                    className="bg-[#FF7E00] hover:bg-[#E67300] text-white px-8 py-4 text-base h-auto rounded-full shadow-lg"
                  >
                    <Link href="/about">Our Story</Link>
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Previous and Next buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators - Shows current slide position */}
      {/* Clicking a dot jumps directly to that slide */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              // Active dot is wider and fully opaque
              index === currentSlide ? "w-16 bg-white" : "w-8 bg-white/40 hover:bg-white/60",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
