'use client'

import { Reveal } from './Reveal'

export default function Research() {
  return (
    <section id="research" className="section-spacing">
      <div className="container-narrow">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-block w-6 h-px bg-[var(--color-border)]" />
            <span className="text-[12px] tracking-[0.12em] uppercase text-[var(--color-muted)]">
              Research
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display text-[var(--color-black)] mb-6">
            Research &amp;<br />Publications
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[1.35rem] font-light text-[var(--color-muted)] leading-relaxed mb-12">
            Some explorations<br />grow beyond projects.
          </p>
        </Reveal>

        {/* Publication card */}
        <Reveal delay={0.3}>
          <article className="flex gap-8 p-10 glass-card transition-all duration-300 group hover:shadow-xl">
            {/* Brand Accent Bar */}
            <div className="w-[4px] min-h-full bg-[var(--color-brand-accent)] shrink-0 rounded-full" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-black leading-tight mb-4 tracking-tight">
                Enhanced Visual Understanding using Deep Learning based on Scene Classification
              </h3>
              <p className="text-body text-gray-500 font-normal leading-relaxed mb-8">
                What started as experimentation in deep learning
                eventually evolved into published research
                presented at INDIACOM 2026.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-[11px] tracking-widest uppercase text-gray-400 font-bold">INDIACOM 2026</span>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span className="text-[11px] tracking-widest uppercase text-gray-400 font-bold">Bharati Vidyapeeth</span>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span className="text-[11px] tracking-widest uppercase text-gray-400 font-bold">Pune</span>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
