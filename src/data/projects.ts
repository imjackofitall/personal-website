export interface Project {
  slug: string
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

export type ProjectCategory = "side" | "other" | "client"

export const sideProjects: Project[] = [
  {
    slug: "cover-letter-guru",
    title: "Cover Letter Guru",
    description: "AI-Powered Cover Letter Builder",
    tagline:
      "Create compelling, personalized cover letters in minutes with AI assistance. Stand out from the competition.",
    logo: "/cover-letter-guru-logo.png",
    screenshots: [
      "/cover-letter-guru-1.png",
      "/cover-letter-guru-2.png",
      "/cover-letter-guru-3.png",
      "/cover-letter-guru-4.png",
      "/cover-letter-guru-5.png",
    ],
    ctaText: "Try Cover Letter Guru",
    ctaLink: "https://www.cover-letter.guru",
    showGrowth: false,
  },
  {
    slug: "motivation-map",
    title: "Motivation Map",
    description: "Discover What Motivates You at Work",
    tagline:
      "Create visual mind maps of your professional motivations and share them with your team.",
    logo: "/motivationmap-logo.png",
    screenshots: [
      "/motivationmap1.png",
      "/motivationmap2.png",
      "/motivationmap3.png",
      "/motivationmap-colorpicker.png",
    ],
    ctaText: "Try Motivation Map",
    ctaLink: "https://motivationmap.me",
    showGrowth: false,
  },
  {
    slug: "shaka-shuffle",
    title: "ShakaShuffle",
    description: "Planning Poker, in Quokka style!",
    tagline:
      "Estimate, collaborate, and hang loose like the happiest animal on Earth.",
    logo: "/shaka-shuffle-logo.svg",
    screenshots: [
      "/ShakkaShuffle1.png",
      "/ShakkaShuffle2.png",
      "/ShakkaShuffle3.png",
      "/ShakkaShuffle4.png",
    ],
    ctaText: "Try ShakaShuffle",
    ctaLink: "https://shakashuffle.com",
    showGrowth: false,
  },
  {
    slug: "guiddr",
    title: "Guiddr",
    description:
      "Discover and Share the Best Places in Your City with Your Team",
    tagline:
      "Explore your colleagues recommendations in your city, find the best coffee spots, bars, restaurants, and outdoor activities.",
    logo: "/guidr-logo.svg",
    screenshots: ["/guidr1.png", "/guidr2.png", "/guidr3.png"],
    ctaText: "Explore Guiddr",
    ctaLink: "https://guiddr.com",
    showGrowth: false,
  },
  {
    slug: "standup-randomiser",
    title: "Standup Randomiser",
    description: "Randomize your daily standup order with ease",
    tagline:
      "Add team members, create squads, and let the app randomly select the speaking order for fair and engaging standups.",
    screenshots: [
      "/standup-randomiser1.png",
      "/standup-randomiser2.png",
      "/standup-randomiser3.png",
      "/standup-randomiser4.png",
    ],
    ctaText: "Try Standup Randomiser",
    ctaLink: "https://standup-randomiser.vercel.app",
    showGrowth: false,
  },
]

export const otherProjects: Project[] = [
  {
    slug: "dzdaisy",
    title: "DZDaisy",
    description:
      "Documenting my adventure restoring a '74 Volkswagen Kombi. From the ground up with a dream of a camper van, follow along as I bring this classic VW bus back to life.",
    logo: "/dzdaisy-logo.png",
    screenshots: ["/dzdaisy1.png", "/dzdaisy2.png"],
    ctaText: "Follow Journey",
    ctaLink: "https://dzdaisy.com",
    instagramText: "@thedzdaisy",
    instagramLink: "http://instagram.com/thedzdaisy",
    showGrowth: false,
  },
  {
    slug: "geek-society-indie-arcade",
    title: "Geek Society - Indie Arcade",
    description:
      "A dedicated, free-play cabinet at Brisbane's 1-Up Arcade that rotates Australian indie games, turning everyday foot traffic into live play-tests and giving local studios a permanent stage beyond PAX.",
    logo: "/geeksociety-logo.png",
    screenshots: ["/indie-arcade.jpg"],
    ctaText: "Learn More",
    ctaLink:
      "https://geeksociety.com.au/2017/11/08/introducing-the-indie-arcade/",
    showGrowth: false,
  },
]

export const clientJobs: Project[] = [
  {
    slug: "shokk-events",
    title: "ShokkEvents",
    description:
      "The ticketing portal powering Queensland's largest hardstyle promoter, and their community, the shows range from small club nights to festival sized events.",
    ctaText: "Shokk Events",
    ctaLink: "https://www.shokkevents.com/about",
    logo: "/shokkevents.png",
    screenshots: ["/shokkevents1.png"],
    showGrowth: false,
  },
  {
    slug: "all-class-cleaning",
    title: "All-class cleaning & yard maintenance",
    description:
      "I have designed the brand, logo, and website for a local cleaning company. The website is a single-page site that pairs a bold mascot brand with a service checklist and before-after gallery, guiding homeowners from problem to \"Contact Us\" in one scroll.",
    ctaText: "View Project",
    ctaLink: "https://www.all-class.com",
    logo: "/all-class-logo.png",
    screenshots: ["/all-class1.png"],
    showGrowth: false,
  },
]

export const allProjects: Project[] = [
  ...sideProjects,
  ...otherProjects,
  ...clientJobs,
]

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug)
}
