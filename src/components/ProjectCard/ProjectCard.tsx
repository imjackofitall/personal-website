import { useState, useEffect, useRef } from "react"
import { 
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline"
import Image from "next/image"
import { Sparkline } from "@/components/Sparkline/Sparkline"
import { InstagramIcon } from "@/components/SocialIcons"

export interface Project {
  title: string
  description: string
  tagline?: string
  logo?: string
  screenshots?: string[]
  isComingSoon?: boolean
  sparklineData?: number[]
  ctaText?: string
  ctaLink?: string
  showGrowth?: boolean
  instagramLink?: string
  instagramText?: string
}

interface ProjectCardProps extends Project {
  onImageClick: (imageSrc: string) => void
}

export const ProjectCard = ({
  title,
  description,
  tagline,
  logo,
  screenshots,
  isComingSoon = false,
  sparklineData,
  ctaText = "View Project",
  ctaLink = "#",
  showGrowth = false,
  instagramLink,
  instagramText,
  onImageClick,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showAllThumbnails, setShowAllThumbnails] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAllThumbnails(false)
      }
    }

    if (showAllThumbnails) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showAllThumbnails])

  return (
    <div
      className={`card shadow-lg hover:shadow-xl transition-all duration-300 ease-out cursor-pointer h-full border ${
        isHovered ? "transform -translate-y-1" : ""
      } ${isComingSoon ? "opacity-75" : ""}`}
      style={{
        backgroundColor: 'var(--card-background)',
        borderColor: 'var(--border)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body p-4 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          {logo ? (
            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 bg-white dark:bg-gray-100">
              <Image
                src={logo}
                alt={`${title} logo`}
                width={48}
                height={48}
                className="w-full h-full object-contain p-0.5"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-garnet to-beaver flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{title.charAt(0)}</span>
            </div>
          )}
          
          {screenshots && screenshots.length > 0 && (
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <div className="flex gap-2">
                {/* Show all thumbnails if 3 or fewer images */}
                {screenshots.length <= 3 ? (
                  screenshots.map((screenshot, index) => (
                    <button
                      key={index}
                      onClick={() => onImageClick(screenshot)}
                      className="w-14 h-8 rounded-lg overflow-hidden border border-beaver/20 dark:border-beaver/30 hover:scale-105 hover:border-garnet hover:shadow-md transition-all duration-200"
                    >
                      <Image
                        src={screenshot}
                        alt={`${title} screenshot ${index + 1}`}
                        width={56}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))
                ) : (
                  /* For 4+ images: show first 2 + expandable "+N" button */
                  <>
                    {screenshots.slice(0, 2).map((screenshot, index) => (
                      <button
                        key={index}
                        onClick={() => onImageClick(screenshot)}
                        className="w-14 h-8 rounded-lg overflow-hidden border border-beaver/20 dark:border-beaver/30 hover:scale-105 hover:border-garnet hover:shadow-md transition-all duration-200"
                      >
                        <Image
                          src={screenshot}
                          alt={`${title} screenshot ${index + 1}`}
                          width={56}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowAllThumbnails(!showAllThumbnails)
                      }}
                      className="w-14 h-8 rounded-lg overflow-hidden border border-beaver/20 dark:border-beaver/30 flex items-center justify-center text-xs font-medium hover:scale-105 hover:border-garnet hover:shadow-md transition-all duration-200 relative"
                      style={{
                        backgroundColor: 'var(--muted)',
                        color: '#ffffff'
                      }}
                    >
                      +{screenshots.length - 2}
                      <ChevronDownIcon className={`w-3 h-3 ml-0.5 transition-transform duration-200 ${showAllThumbnails ? 'rotate-180' : ''}`} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Dropdown gallery for remaining images */}
              {showAllThumbnails && screenshots.length > 3 && (
                <div 
                  className="absolute top-12 right-0 z-10 border border-beaver/20 dark:border-beaver/30 rounded-lg shadow-lg p-2 min-w-[100px]"
                  style={{backgroundColor: 'var(--card-background)'}}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {screenshots.slice(2).map((screenshot, index) => (
                      <button
                        key={index + 2}
                        onClick={() => {
                          onImageClick(screenshot)
                          setShowAllThumbnails(false)
                        }}
                        className="w-14 h-8 rounded-lg overflow-hidden border border-beaver/20 dark:border-beaver/30 hover:scale-105 hover:border-garnet hover:shadow-md transition-all duration-200"
                      >
                        <Image
                          src={screenshot}
                          alt={`${title} screenshot ${index + 3}`}
                          width={56}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-1.5 flex-grow">
          <h3 className="font-poppins font-semibold text-lg" style={{color: 'var(--heading)'}}>{title}</h3>
          <p className="text-sm font-dm-sans leading-relaxed" style={{color: 'var(--text-secondary)'}}>{description}</p>
          {tagline && <p className="text-xs font-dm-sans italic" style={{color: 'var(--muted)'}}>{tagline}</p>}
        </div>

        {showGrowth && sparklineData && !isComingSoon && (
          <div className="flex items-center justify-between py-2 mt-4">
            <span className="text-xs font-dm-sans" style={{color: 'var(--muted)'}}>Growth</span>
            <Sparkline data={sparklineData} color="#754043" />
          </div>
        )}

        <div className="mt-4 pt-4">
          {isComingSoon ? (
            <div className="flex items-center justify-center py-1">
              <span className="font-dm-sans text-sm" style={{color: 'var(--muted)'}}>Coming soon ✨</span>
            </div>
          ) : (
            <div className="space-y-2">
              {instagramLink && instagramText && (
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="block mb-2">
                  <button 
                    className="btn w-full rounded-full font-dm-sans text-sm transition-all duration-200 border"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'var(--border)',
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.backgroundColor = 'var(--accent)'
                      e.currentTarget.style.color = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--text-secondary)'
                    }}
                  >
                    <InstagramIcon /> {instagramText}
                  </button>
                </a>
              )}
              <button
                className="btn w-full bg-garnet hover:bg-garnet/90 text-white rounded-full font-dm-sans text-sm transition-all duration-200 border-0"
                onClick={() => window.open(ctaLink, "_blank")}
              >
                {ctaText}
                <ArrowTopRightOnSquareIcon className="w-3 h-3 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
} 