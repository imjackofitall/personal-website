import type { MetadataRoute } from "next"
import { allProjects } from "@/data/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `https://imjackofitall.com/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [
    {
      url: "https://imjackofitall.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectUrls,
  ]
}
