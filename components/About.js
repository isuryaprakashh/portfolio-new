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
              Most of what I learn comes through building —
              experimenting with projects, participating in hackathons,
              and collaborating with people around me through communities and events.
            </p>
          </Reveal>
        </div>

        {/* Highlight row — accent cards with left border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: 'Focus', value: 'AI & Systems', color: 'var(--color-primary)', icon: '⚡' },
            { label: 'Approach', value: 'Build to Learn', color: 'var(--color-warm)', icon: '🔧' },
            { label: 'Interest', value: 'Experiences', color: 'var(--color-sage)', icon: '✦' },
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
      </div>
    </section>
  )
}
