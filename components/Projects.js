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
    githubUrl: 'https://github.com/isuryaprakashh/HireVexa',
    technologies: ['nextdotjs', 'react', 'tailwindcss', 'nodedotjs', 'figma'],
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
    githubUrl: 'https://github.com/isuryaprakashh/aprameya',
    technologies: ['mongodb', 'express', 'react', 'nodedotjs'],
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
    githubUrl: 'https://github.com/isuryaprakashh/Scene-Classification',
    technologies: ['python', 'pytorch', 'flask'],
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
    githubUrl: 'https://github.com/isuryaprakashh/Asthetica',
    technologies: ['nextdotjs', 'react', 'tailwindcss', 'figma'],
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
    githubUrl: 'https://github.com/isuryaprakashh/OdinMail',
    technologies: ['nextdotjs', 'react', 'tailwindcss', 'nodedotjs'],
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
    githubUrl: 'https://github.com/isuryaprakashh/property-sales-rental',
    technologies: ['python', 'flask', 'html5', 'css3', 'javascript'],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-spacing">
      <div className="container-main">
        {/* Section label */}
        <Reveal>
          <span className="text-label mb-8 block font-semibold">Featured Projects</span>
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

        {/* Project list — grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

const skillNames = {
  nextdotjs: 'Next.js',
  react: 'React',
  tailwindcss: 'Tailwind CSS',
  nodedotjs: 'Node.js',
  figma: 'Figma',
  mongodb: 'MongoDB',
  express: 'Express',
  python: 'Python',
  pytorch: 'PyTorch',
  flask: 'Flask',
  html5: 'HTML5',
  css3: 'CSS3',
  javascript: 'JavaScript',
}

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={0.08 * (index % 2)}>
      <article className="project-grid-card group flex flex-col h-full bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-[24px] overflow-hidden transition-all duration-400 hover:shadow-md hover:border-gray-300">
        {/* Top visual section */}
        <div className="project-grid-card-visual relative aspect-[1.6/1] w-full overflow-hidden flex items-center justify-center p-3 bg-gray-50 border-b border-[var(--color-border)]">
          {/* Gradient backdrop with blur */}
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
            style={{ background: project.gradient, opacity: 0.15 }}
          />
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          
          {/* Centered screenshot */}
          <div className="project-grid-card-img-container relative w-[96%] h-[92%] rounded-xl overflow-hidden border border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
              quality={90}
            />
          </div>
        </div>

        {/* Bottom content section */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          {/* Title & links row */}
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-[20px] font-bold text-[var(--color-deep-ink)] tracking-tight">
              {project.title}
            </h3>
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-grid-card-link-btn text-[var(--color-text-muted)] hover:text-[var(--color-deep-ink)] transition-colors duration-200"
                  title="View GitHub Repository"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-grid-card-link-btn text-[var(--color-text-muted)] hover:text-[var(--color-deep-ink)] transition-colors duration-200"
                  title="View Live Site"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-[14.5px] text-[var(--color-text-secondary)] leading-[1.6] mb-7 flex-grow">
            {project.description}
          </p>

          {/* Tech stack icons row */}
          <div className="flex flex-wrap gap-3 pt-5 border-t border-[var(--color-border)] mt-auto">
            {project.technologies?.map((slug) => (
              <div
                key={slug}
                className="project-tech-icon w-8.5 h-8.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg-alt)] flex items-center justify-center shadow-sm hover:scale-110 hover:border-[var(--color-primary)] transition-all duration-200 cursor-none"
              >
                {/* Custom Tooltip */}
                <span className="project-tech-tooltip">
                  {skillNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)}
                </span>
                <img
                  src={`https://cdn.simpleicons.org/${slug}`}
                  alt={slug}
                  className="w-4.5 h-4.5 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  )
}
