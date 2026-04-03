import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { allProjects, getProjectBySlug } from "@/data/projects"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const description = project.tagline || project.description

  return {
    title: `${project.title} - Benjamin Doyle`,
    description,
    openGraph: {
      title: `${project.title} - Benjamin Doyle`,
      description,
      url: `/projects/${slug}`,
      type: "article",
      images: project.screenshots?.[0]
        ? [{ url: project.screenshots[0], alt: project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Benjamin Doyle`,
      description,
      images: project.screenshots?.[0] ? [project.screenshots[0]] : undefined,
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div
      className="min-h-screen font-dm-sans transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted)" }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to portfolio
        </Link>

        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          {project.logo && (
            <div className="shrink-0">
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                width={72}
                height={72}
                className="rounded-xl"
              />
            </div>
          )}
          <div className="space-y-2">
            <h1
              className="text-3xl sm:text-4xl font-poppins font-bold"
              style={{ color: "var(--heading)" }}
            >
              {project.title}
            </h1>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              {project.description}
            </p>
          </div>
        </div>

        {/* Tagline */}
        {project.tagline && (
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.tagline}
          </p>
        )}

        {/* CTA */}
        {project.ctaLink && (
          <div className="mb-10">
            <a
              href={project.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--accent)" }}
            >
              {project.ctaText || "Visit Project"}
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </a>
            {project.instagramLink && (
              <a
                href={project.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 ml-4 px-6 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 border"
                style={{
                  color: "var(--foreground)",
                  borderColor: "var(--border)",
                }}
              >
                {project.instagramText || "Instagram"}
              </a>
            )}
          </div>
        )}

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="space-y-6">
            <h2
              className="text-xl font-poppins font-semibold"
              style={{ color: "var(--heading)" }}
            >
              Screenshots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
