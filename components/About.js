'use client'

import { Reveal } from './Reveal'

export default function About() {
  return (
    <section id="about" className="section-spacing">
      <div className="container-narrow">
        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-block w-6 h-px bg-[var(--color-border)]" />
            <span className="text-[12px] tracking-[0.12em] uppercase text-[var(--color-muted)]">
              About
            </span>
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.1}>
          <h2 className="text-display text-[var(--color-black)] mb-12 text-[56px] leading-[1.1]">
            I enjoy building things that combine
            <br />
            <span className="text-gray-400">
              technology, systems, and experience.
            </span>
          </h2>
        </Reveal>

        {/* Body text */}
        <div className="flex flex-col gap-8 mb-16 max-w-[700px]">
          <Reveal delay={0.2}>
            <p className="text-[20px] text-gray-600 font-normal leading-relaxed">
              From full-stack applications to AI-driven projects and immersive interfaces,
              I like exploring ideas by turning them into real products.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-[20px] text-gray-600 font-normal leading-relaxed">
              Most of what I learn comes through building —
              experimenting with projects, participating in hackathons,
              and collaborating with people around me through communities and events.
            </p>
          </Reveal>
        </div>

        {/* Highlight row */}
        <Reveal delay={0.4}>
          <div className="glass-card p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex flex-col gap-1 flex-1 text-center md:text-left">
              <span className="text-[11px] uppercase text-gray-400 font-bold tracking-widest mb-1">Focus</span>
              <span className="text-xl font-extrabold text-black">AI & Systems</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-100" />
            <div className="flex flex-col gap-1 flex-1 text-center md:text-left">
              <span className="text-[11px] uppercase text-gray-400 font-bold tracking-widest mb-1">Approach</span>
              <span className="text-xl font-extrabold text-black">Build to Learn</span>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-100" />
            <div className="flex flex-col gap-1 flex-1 text-center md:text-left">
              <span className="text-[11px] uppercase text-gray-400 font-bold tracking-widest mb-1">Interest</span>
              <span className="text-xl font-extrabold text-black">Experiences</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
