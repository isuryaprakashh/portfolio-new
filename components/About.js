'use client'

import { Reveal } from './Reveal'

export default function About() {
  return (
    <section id="about" className="section-spacing">
      <div className="container-narrow">
        {/* Section label */}
        <Reveal>
          <span className="text-label mb-8 block">About</span>
        </Reveal>

        {/* Heading — gradient highlight on key word */}
        <Reveal delay={0.1}>
          <h2 className="text-display mb-8">
            I enjoy building things that{' '}
            <span className="gradient-text">combine</span>{' '}
            <span className="text-[var(--color-text-muted)]" style={{ fontStyle: 'italic' }}>
              technology, systems, and experience.
            </span>
          </h2>
        </Reveal>

        {/* Body text */}
        <div className="flex flex-col gap-6 mb-16 max-w-[640px]">
          <Reveal delay={0.2}>
            <p className="text-body leading-[1.7]">
              From full-stack applications to AI-driven projects and immersive interfaces,
              I like exploring ideas by turning them into real products.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-body leading-[1.7]">
              Most of what I learn comes through building 
              experimenting with projects, participating in hackathons,
              and collaborating with people around me through communities and events.
            </p>
          </Reveal>
        </div>

        {/* Highlight row — accent cards with left border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: 'Focus', value: 'AI & Systems', color: 'var(--color-primary)' },
            { label: 'Approach', value: 'Build to Learn', color: 'var(--color-warm)' },
            { label: 'Interest', value: 'Experiences', color: 'var(--color-sage)' },
          ].map((item, i) => (
            <Reveal key={item.label} delay={0.4 + i * 0.1}>
              <div
                className="accent-card"
                style={{ borderLeftColor: item.color }}
              >
                <span className="text-label block mb-2">{item.label}</span>
                <span className="text-[18px] font-semibold text-[var(--color-deep-ink)]">
                  {item.value}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Technologies & Tools section */}
        <div className="mt-20 border-t border-[var(--color-border)] pt-16">
          <Reveal delay={0.6}>
            <div className="text-[11px] font-mono tracking-[0.25em] text-[var(--color-text-muted)] uppercase mb-10">
              Tech Stack
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Languages */}
            <Reveal delay={0.7}>
              <div>
                <h4 className="text-[13px] font-semibold text-[var(--color-text-secondary)] mb-5 uppercase tracking-wider">
                  Languages
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Python', slug: 'python' },
                    { name: 'JavaScript', slug: 'javascript' },
                    { name: 'TypeScript', slug: 'typescript' },
                    { name: 'C', slug: 'c' },
                    { name: 'HTML5', slug: 'html5' },
                    { name: 'CSS', slug: 'css' },
                  ].map((tech) => (
                    <TechIcon key={tech.slug} name={tech.name} slug={tech.slug} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Frameworks & Libraries */}
            <Reveal delay={0.8}>
              <div>
                <h4 className="text-[13px] font-semibold text-[var(--color-text-secondary)] mb-5 uppercase tracking-wider">
                  Frameworks &amp; Libs
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Next.js', slug: 'nextdotjs' },
                    { name: 'React', slug: 'react' },
                    { name: 'Node.js', slug: 'nodedotjs' },
                    { name: 'Express', slug: 'express' },
                    { name: 'Flask', slug: 'flask' },
                    { name: 'PyTorch', slug: 'pytorch' },
                    // { name: 'TensorFlow', slug: 'tensorflow' },
                    { name: 'Tailwind CSS', slug: 'tailwindcss' },
                    // { name: 'Framer Motion', slug: 'framer' },
                  ].map((tech) => (
                    <TechIcon key={tech.slug} name={tech.name} slug={tech.slug} />
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Tools & Design */}
            <Reveal delay={0.9}>
              <div>
                <h4 className="text-[13px] font-semibold text-[var(--color-text-secondary)] mb-5 uppercase tracking-wider">
                  Tools &amp; Design
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Figma', slug: 'figma' },
                    { name: 'Framer', slug: 'framer' },
                    { name: 'Git', slug: 'git' },
                    { name: 'GitHub', slug: 'github' },
                    { name: 'MongoDB', slug: 'mongodb' },
                    { name: 'MySQL', slug: 'mysql' },
                    { name: 'Vercel', slug: 'vercel' },
                    { name: 'Postman', slug: 'postman' },
                    { name: 'Linux', slug: 'linux' },
                  ].map((tech) => (
                    <TechIcon key={tech.slug} name={tech.name} slug={tech.slug} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function TechIcon({ name, slug }) {
  return (
    <div className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] shadow-sm transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 hover:border-[var(--color-primary)] active:scale-95 cursor-none">
      {/* Tooltip */}
      <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 rounded-md bg-[var(--color-deep-ink)] px-2.5 py-1 text-[11px] font-medium text-white shadow-md z-20 pointer-events-none whitespace-nowrap">
        {name}
      </span>
      {/* Icon Image */}
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={`${name} icon`}
        className="w-6 h-6 object-contain"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    </div>
  )
}
