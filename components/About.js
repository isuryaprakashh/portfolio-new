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

        {/* Heading */}
        <Reveal delay={0.1}>
          <h2 className="text-display mb-8">
            I enjoy building things that combine{' '}
            <span className="text-[var(--color-text-secondary)]">
              technology, systems, and experience.
            </span>
          </h2>
        </Reveal>

        {/* Body text */}
        <div className="flex flex-col gap-6 mb-14 max-w-[640px]">
          <Reveal delay={0.2}>
            <p className="text-body leading-relaxed">
              From full-stack applications to AI-driven projects and immersive interfaces,
              I like exploring ideas by turning them into real products.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-body leading-relaxed">
              Most of what I learn comes through building —
              experimenting with projects, participating in hackathons,
              and collaborating with people around me through communities and events.
            </p>
          </Reveal>
        </div>

        {/* Highlight row */}
        <Reveal delay={0.4}>
          <div className="card-featured flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0">
            {[
              { label: 'Focus', value: 'AI & Systems' },
              { label: 'Approach', value: 'Build to Learn' },
              { label: 'Interest', value: 'Experiences' },
            ].map((item, i) => (
              <div key={item.label} className="flex-1 flex flex-col gap-1 px-0 md:px-6 first:md:pl-0 last:md:pr-0">
                <span className="text-label">{item.label}</span>
                <span className="text-[18px] font-semibold text-[var(--color-deep-ink)]">{item.value}</span>
                {i < 2 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[var(--color-border)]" />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
