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
    role: ['Product Experience', 'Architecture', 'Design + Systems Balance'],
  },
  {
    id: 'scene-classification',
    number: '02',
    title: 'Scene Classification',
    intro: 'Exploring deep learning models for intelligent scene classification.',
    description: 'What started as experimentation in deep learning eventually evolved into published research presented at INDIACOM 2026. A journey from curiosity to contribution.',
    tags: ['Deep Learning', 'Computer Vision', 'Research'],
    role: ['AI Exploration', 'Experimentation', 'Research Mindset'],
  },
  {
    id: 'hirevexa',
    number: '03',
    title: 'Hirevexa',
    intro: 'Intelligent hiring powered by AI-driven systems.',
    description: 'An AI-powered platform that rethinks hiring through intelligent applications and product thinking. Built to make recruitment smarter, not just faster.',
    tags: ['AI-Powered', 'Product Thinking', 'Intelligent Systems'],
    role: ['AI Systems', 'Intelligent Applications', 'Product Thinking'],
  },
  {
    id: 'ota-portal',
    number: '04',
    title: 'OTA Update Portal',
    intro: 'Enterprise-grade vehicle update management at scale.',
    description: 'A scalable system for managing over-the-air updates across connected vehicle fleets. Enterprise architecture meets systems thinking in the automotive IoT space.',
    tags: ['Enterprise', 'Scalable Systems', 'IoT'],
    role: ['Scalable Systems', 'Enterprise Architecture', 'Systems Thinking'],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-spacing">
      <div className="container-main">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-block w-6 h-px bg-[var(--color-border)]" />
            <span className="text-[12px] tracking-[0.12em] uppercase text-[var(--color-muted)]">
              Work
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display text-[var(--color-black)] mb-4">
            Projects &amp;<br />Explorations
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-body text-[var(--color-muted)] font-light max-w-[500px] leading-relaxed mb-16 md:mb-24">
            Each project is an exploration — driven by curiosity,
            experimentation, and the desire to build systems that feel alive.
          </p>
        </Reveal>

        {/* Project list */}
        <div className="flex flex-col gap-20 md:gap-28">
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
    <Reveal delay={0.1}>
      <article className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${!isEven ? 'md:[direction:rtl] md:*:[direction:ltr]' : ''}`}>
        {/* Visual - Premium Glass Card */}
        <motion.div
          className={`relative aspect-[4/3] glass-card shadow-md p-[20px_24px] cursor-default flex flex-col justify-end group transition-all duration-300 hover:shadow-xl ${!isEven ? 'md:order-2' : ''}`}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Subtle hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--color-primary)] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300" />
          
          <span className="absolute top-6 right-6 text-[5rem] font-extralight text-black/[0.04] leading-none tracking-tight">
            {project.number}
          </span>
          <span className="relative z-10 text-[clamp(1.25rem,2.5vw,1.75rem)] font-light text-black tracking-tight">
            {project.title}
          </span>
        </motion.div>

        {/* Info */}
        <div className={`py-2 ${!isEven ? 'md:order-1' : ''}`}>
          <span className="text-[12px] tracking-[0.1em] text-[var(--color-muted-slate)] block mb-4 uppercase">
            {project.number}
          </span>
          <h3 className="text-heading text-[var(--color-black)] mb-2">{project.title}</h3>
          <p className="text-body italic text-[var(--color-muted)] mb-4 leading-relaxed">
            {project.intro}
          </p>
          <p className="text-[14px] text-[var(--color-muted)] font-light leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-3 py-1 rounded-full border border-gray-100 bg-white shadow-sm text-gray-600 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Roles */}
          <div className="flex flex-wrap gap-5">
            {project.role.map((r) => (
              <span key={r} className="text-[12px] text-[var(--color-border)] tracking-[0.04em]">
                {r}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
