'use client'

import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

const projects = [
  {
    id: 'asthetica',
    number: '01',
    title: 'Asthetica',
    intro: 'A digital experience where art feels immersive rather than transactional.',
    description: 'An immersive product experience balancing full-stack architecture with design and systems thinking. Built to explore how digital commerce can feel more like a curated gallery than a storefront.',
    tags: ['Immersive Experience', 'Full-Stack', 'Design Systems'],
  },
  {
    id: 'scene-classification',
    number: '02',
    title: 'Scene Classification',
    intro: 'Exploring deep learning models for intelligent scene classification.',
    description: 'What started as experimentation in deep learning eventually evolved into published research presented at INDIACOM 2026. A journey from curiosity to contribution.',
    tags: ['Deep Learning', 'Computer Vision', 'Research'],
  },
  {
    id: 'hirevexa',
    number: '03',
    title: 'Hirevexa',
    intro: 'Intelligent hiring powered by AI-driven systems.',
    description: 'An AI-powered platform that rethinks hiring through intelligent applications and product thinking. Built to make recruitment smarter, not just faster.',
    tags: ['AI-Powered', 'Product Thinking', 'Intelligent Systems'],
  },
  {
    id: 'ota-portal',
    number: '04',
    title: 'OTA Update Portal',
    intro: 'Enterprise-grade vehicle update management at scale.',
    description: 'A scalable system for managing over-the-air updates across connected vehicle fleets. Enterprise architecture meets systems thinking in the automotive IoT space.',
    tags: ['Enterprise', 'Scalable Systems', 'IoT'],
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
        <div className="flex flex-col gap-20 md:gap-24">
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
      <article className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${!isEven ? 'md:[direction:rtl] md:*:[direction:ltr]' : ''}`}>
        {/* Visual Card — with hover overlay */}
        <motion.div
          className={`project-visual relative aspect-[4/3] card-featured p-6 flex flex-col justify-end group ${!isEven ? 'md:order-2' : ''}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="absolute top-6 right-6 text-[4rem] font-light text-black/[0.05] leading-none select-none">
            {project.number}
          </span>
          <span className="relative z-10 text-[clamp(1.125rem,2vw,1.5rem)] font-normal text-[var(--color-deep-ink)] tracking-tight">
            {project.title}
          </span>

          {/* Hover overlay */}
          <div className="project-overlay">
            <span className="view-label">
              View Project <span>→</span>
            </span>
          </div>
        </motion.div>

        {/* Info */}
        <div className={`py-2 ${!isEven ? 'md:order-1' : ''}`}>
          <span className="text-label block mb-4">
            {project.number}
          </span>
          <h3 className="text-heading mb-3">{project.title}</h3>
          <p className="text-body italic mb-3 leading-[1.7]">
            {project.intro}
          </p>
          <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.7] mb-6">
            {project.description}
          </p>

          {/* Tags — improved contrast & styling */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-normal px-3.5 py-1.5 rounded-full bg-[var(--color-card-bg-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)] tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
