'use client'

import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import Link from 'next/link'

export default function Footer() {
  return (
    <section id="contact" className="pt-28 pb-16 relative overflow-hidden">
      {/* No ambient glows per Kree8 design */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container-narrow relative z-10 text-center flex flex-col items-center">
        <Reveal>
          <div className="flex items-center gap-3 mb-10 justify-center">
            <span className="inline-block w-6 h-px bg-[var(--color-border)]" />
            <span className="text-[12px] tracking-[0.12em] uppercase text-[var(--color-muted)]">
              What's Next
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display text-black mb-5">Still Exploring?</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-body text-[var(--color-muted)] font-light leading-relaxed max-w-[460px] mb-10">
            I'm always open to new ideas, collaborations, and conversations.
            If something here resonated, let's connect.
          </p>
        </Reveal>

        {/* Kree8 Primary Button */}
        <Reveal delay={0.3}>
          <motion.a
            href="mailto:hello@suryaprakash.dev"
            className="inline-flex items-center justify-center gap-3 px-[32px] py-[16px] h-[56px] bg-[var(--color-primary)] text-[var(--color-white)] text-[16px] font-bold shadow-[var(--shadow-sm)]
              hover:bg-[var(--color-primary-hover)] transition-all duration-300 mb-10"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Let's Build Something</span>
            <span className="text-lg">→</span>
          </motion.a>
        </Reveal>

        {/* Blog hint */}
        <Reveal delay={0.4}>
          <p className="mb-20">
            <Link
              href="/blogs"
              className="text-[12px] tracking-[0.04em] text-[var(--color-border)] hover:text-[var(--color-primary)] transition-colors duration-300 border-b border-transparent hover:border-[var(--color-primary)]"
            >
              Occasionally writing about systems, experiments, and things I'm exploring.
            </Link>
          </p>
        </Reveal>

        {/* Bottom bar */}
        <Reveal delay={0.5}>
          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--color-border-gray)] gap-4">
            <span className="text-[12px] text-[var(--color-muted-slate)]">
              © 2026 Surya Prakash
            </span>
            <div className="flex gap-6">
              {['GitHub', 'LinkedIn', 'Twitter'].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="text-[14px] font-normal text-[var(--color-muted-slate)] hover:text-[var(--color-black)] transition-colors duration-200"
                  aria-label={name}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
