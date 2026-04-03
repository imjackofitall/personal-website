"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChartBarIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import DarkModeToggle from "@/components/DarkModeToggle/DarkModeToggle"
import { ImageModal } from "@/components/ImageModal/ImageModal"
import { ProjectSection } from "@/components/ProjectSection/ProjectSection"
import { Avatar, SocialButtons, ProfileBadges, EmailSignup, BlogLink } from "@/components/UI"
import { sideProjects, otherProjects, clientJobs } from "@/data/projects"

// Content constants to avoid duplication
const content = {
  name: "Benjamin Doyle",
  location: "Australia",
  mrr: "$<1k MRR",
  tagline: "AI enthusiast, Indie-Hacker & Software Engineer building products that matter ✨",
  ctaText: "Want to learn, or have me build your next project?",
  ctaTextMobile: "Want to learn to build your own products? Or have me build your next project?",
  emailPlaceholder: "Enter your email",
  emailButtonText: "Email me! ✉️",
}

export default function Portfolio() {
  const [showScrollArrow, setShowScrollArrow] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc)
    setModalOpen(true)
  }

  // Handle scroll to hide/show arrow
  useEffect(() => {
    const handleScroll = () => {
      if (cardsContainerRef.current) {
        const scrollY = cardsContainerRef.current.scrollTop
        setShowScrollArrow(scrollY < 50) // Hide after scrolling 50px
      }
    }

    const container = cardsContainerRef.current
    if (container) {
      // Check if container is actually scrollable
      const isScrollable = container.scrollHeight > container.clientHeight
      setShowScrollArrow(isScrollable) // Only show arrow if there's content to scroll
      
      if (isScrollable) {
        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Handle wheel events on desktop to allow scrolling cards section from anywhere
  useEffect(() => {
    const handleWheel = (e: Event) => {
      const wheelEvent = e as WheelEvent
      // Only handle on desktop layout
      if (window.innerWidth >= 1024 && cardsContainerRef.current) {
        wheelEvent.preventDefault()
        cardsContainerRef.current.scrollTop += wheelEvent.deltaY
      }
    }

    const desktopContainer = document.querySelector('.hidden.lg\\:flex')
    if (desktopContainer) {
      desktopContainer.addEventListener('wheel', handleWheel, { passive: false })
      return () => desktopContainer.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <div className="min-h-screen font-dm-sans transition-colors duration-300" style={{backgroundColor: 'var(--background)', color: 'var(--foreground)'}}>
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Column - Sticky Hero (35%) */}
        <div className="w-[35%] p-6 flex items-center relative">
          {/* Dark Mode Toggle */}
          <div className="absolute top-6 right-6">
            <DarkModeToggle />
          </div>
          
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="flex justify-center">
              <Avatar />
            </div>

            {/* Name and Info */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-poppins font-bold" style={{color: 'var(--heading)'}}>{content.name}</h1>
              <ProfileBadges location={content.location} />
              <p className="text-lg font-dm-sans leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                {content.tagline}
              </p>
              <p className="text-sm font-dm-sans" style={{color: 'var(--muted)'}}>
                <ChartBarIcon className="w-4 h-4 inline mr-1" />
                {content.ctaText}
              </p>
            </div>

            <EmailSignup emailPlaceholder={content.emailPlaceholder} emailButtonText={content.emailButtonText} />
            <BlogLink />
            <SocialButtons />
          </div>

          {/* Bouncing Scroll Arrow */}
          {showScrollArrow && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce">
              <ChevronDownIcon 
                className="w-6 h-6 opacity-60 transition-opacity duration-300" 
                style={{color: 'var(--muted)'}}
              />
            </div>
          )}
        </div>

        {/* Right Column - All Projects (65%) */}
        <div ref={cardsContainerRef} className="w-[65%] p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            <ProjectSection title="My side projects 🚀" projects={sideProjects} onImageClick={openModal} />
            <ProjectSection title="Other projects 🛠️" projects={otherProjects} onImageClick={openModal} />
            <ProjectSection title="Client jobs 💼" projects={clientJobs} onImageClick={openModal} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header with Dark Mode Toggle */}
        <div className="p-4 flex justify-end">
          <DarkModeToggle />
        </div>
        
        {/* Mobile Hero */}
        <div className="p-4 space-y-4">
          <div className="text-center space-y-4">
            <Avatar size="w-32 h-32" />
            <h1 className="text-3xl font-poppins font-bold" style={{color: 'var(--heading)'}}>{content.name}</h1>
            <ProfileBadges isMobile location={content.location} />
            <p className="text-base font-dm-sans leading-relaxed" style={{color: 'var(--text-secondary)'}}>
              {content.tagline}
            </p>
            <p className="text-sm font-dm-sans" style={{color: 'var(--muted)'}}>
              <ChartBarIcon className="w-4 h-4 inline mr-1" />
              {content.ctaTextMobile}
            </p>
          </div>
          <EmailSignup className="space-y-3" emailPlaceholder={content.emailPlaceholder} emailButtonText={content.emailButtonText} />
          <BlogLink />
          <SocialButtons />
        </div>

        {/* Mobile Cards */}
        <div className="p-4 space-y-6">
          <ProjectSection title="My side projects 🚀" projects={sideProjects} isMobile onImageClick={openModal} />
          <ProjectSection title="Other projects 🛠️" projects={otherProjects} isMobile onImageClick={openModal} />
          <ProjectSection title="Client jobs 💼" projects={clientJobs} isMobile onImageClick={openModal} />
        </div>
      </div>

      {/* Global Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={selectedImage}
        alt="Project screenshot"
      />
    </div>
  )
}
