'use client'

import { Reveal } from './Reveal'

export default function Research() {
  return (
    <section id="research" className="section-spacing">
      <div className="container-narrow">
        <Reveal>
          <span className="text-label mb-8 block">Research</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display mb-4">
            Research &amp;<br />Publications
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-body font-light leading-relaxed mb-12 max-w-[500px]">
            Some explorations grow beyond projects.
          </p>
        </Reveal>

        {/* Publication card */}
        <Reveal delay={0.3}>
          <article className="card p-8 md:p-10 flex gap-6">
            {/* Accent Bar */}
            <div className="w-[3px] min-h-full bg-[var(--color-primary)] shrink-0 rounded-full" />
            <div className="flex-1">
              <h3 className="text-heading mb-3">
                Enhanced Visual Understanding using Deep Learning based on Scene Classification
              </h3>
              <p className="text-body leading-relaxed mb-6">
                What started as experimentation in deep learning
                eventually evolved into published research
                presented at INDIACOM 2026.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {['INDIACOM 2026', 'Bharati Vidyapeeth', 'Pune'].map((item, i) => (
                  <span key={item} className="flex items-center gap-3">
                    <span className="text-label">{item}</span>
                    {i < 2 && <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
