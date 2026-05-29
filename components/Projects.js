'use client'

import Image from 'next/image'
import { Reveal } from './Reveal'

const projects = [
  {
    id: 'hirevexa',
    number: '01',
    title: 'Hirevexa',
    intro: 'Intelligent hiring powered by AI-driven systems.',
    description:
      'An AI-powered platform that rethinks hiring through intelligent applications and product thinking. Built to make recruitment smarter, not just faster.',
    tags: ['AI-Powered', 'Product Thinking', 'Intelligent Systems'],
    image: '/projects/HireVexa.png',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    liveUrl: 'https://hirevexa.vercel.app/',
  },

  {
    id: 'aprameya',
    number: '02',
    title: 'Aprameya',
    intro: 'Building systems that make student communities feel more connected and organized.',
    description:
      'A centralized platform designed for managing club operations, events, and collaboration. Built with a focus on structure, usability, and scalable coordination within student communities.',
    tags: ['Community Systems', 'MERN Stack', 'Collaboration'],
    image: '/projects/aprameya.png',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    liveUrl: 'https://aprameya.kluniversity.me/',
  },

  {
    id: 'scene-classification',
    number: '03',
    title: 'Scene Classification',
    intro: 'Exploring deep learning models for intelligent scene classification.',
    description:
      'What started as experimentation in deep learning eventually evolved into published research presented at INDIACOM 2026. A journey from curiosity to contribution.',
    tags: ['Deep Learning', 'Computer Vision', 'Research'],
    image: '/projects/Scene-Classification.png',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },

  {
    id: 'asthetica',
    number: '04',
    title: 'Asthetica',
    intro: 'A digital experience where art feels immersive rather than transactional.',
    description:
      'An immersive product experience balancing full-stack architecture with design and systems thinking. Built to explore how digital commerce can feel more like a curated gallery than a storefront.',
    tags: ['Immersive Experience', 'Full-Stack', 'Design Systems'],
    image: '/projects/asthetica.png',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    liveUrl: 'https://asthetica.vercel.app/',
  },

  {
    id: 'odinmail',
    number: '05',
    title: 'ODINMAIL',
    intro: 'Reducing email overload through AI-assisted workflows.',
    description:
      'An AI-driven productivity tool focused on organizing, prioritizing, and drafting emails intelligently. Built around the idea that communication systems should feel seamless and less overwhelming.',
    tags: ['AI Productivity', 'Workflow Systems', 'Hackathon'],
    image: '/projects/OdinMail.png',
    gradient: 'linear-gradient(135deg, #13547a 0%, #80d0c7 100%)',
    liveUrl: 'https://odin-mail-dusky.vercel.app/',
  },

  {
    id: 'property-sales-rental',
    number: '06',
    title: 'Property Sales & Rental',
    intro: 'Simplifying how properties are listed, discovered, and managed online.',
    description:
      'A web-based platform focused on improving the experience of browsing and managing property rentals and sales through structured interfaces and streamlined workflows.',
    tags: ['Web Platform', 'Management System', 'User Experience'],
    image: '/projects/property-sales.png',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    liveUrl: 'http://psrm.pythonanywhere.com/',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-spacing">
      <div className="container-main">
        {/* Section label */}
        <Reveal>
          <span className="text-label mb-8 block">Work</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display mb-4">
            Projects &amp;<br />Explorations
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-body max-w-[500px] leading-[1.7] mb-16">
            Each project is an exploration — driven by curiosity,
            experimentation, and the desire to build systems that feel alive.
          </p>
        </Reveal>

        {/* Project list — staggered entrance */}
        <div className="flex flex-col gap-12 md:gap-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0

  return (
    <Reveal delay={0.08 * index}>
      <article className={`project-card-wrapper grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${!isEven ? 'md:[direction:rtl] md:*:[direction:ltr]' : ''}`}>
        {/* Visual Card — project screenshot */}
        <div
          className={`project-visual-card relative aspect-[4/3] overflow-hidden ${!isEven ? 'md:order-2' : ''}`}
        >
          {/* Gradient background that peeks through */}
          <div
            className="absolute inset-0 rounded-[20px]"
            style={{ background: project.gradient, opacity: 0.08 }}
          />

          {/* Project screenshot */}
          <div className="project-image-container relative w-full h-full overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} — project screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
              quality={90}
            />
          </div>

          {/* Floating number badge */}
          <span className="absolute top-5 left-5 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[13px] font-medium text-[var(--color-deep-ink)] shadow-sm border border-white/50">
            {project.number}
          </span>
        </div>

        {/* Info */}
        <div className={`py-2 ${!isEven ? 'md:order-1' : ''}`}>
          <h3 className="text-heading mb-3">{project.title}</h3>
          <p className="text-body italic mb-3 leading-[1.7]">
            {project.intro}
          </p>
          <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.7] mb-6">
            {project.description}
          </p>

          {/* Tags — pill badges */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="project-pill-tag"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Live project link button */}
          {project.liveUrl && (
            <div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-live-btn"
                style={{ '--project-gradient': project.gradient }}
              >
                <span>Live Project</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}
