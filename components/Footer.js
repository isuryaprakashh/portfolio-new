'use client'

import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import Link from 'next/link'

export default function Footer() {
  return (
    <section id="contact" className="pt-20 pb-16 relative">
      <div className="container-narrow relative z-10 text-center flex flex-col items-center">
        <Reveal>
          <span className="text-label mb-8 block">What's Next</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display mb-4">Still Exploring?</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-body font-light leading-relaxed max-w-[420px] mb-10">
            I'm always open to new ideas, collaborations, and conversations.
            If something here resonated, let's connect.
          </p>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.3}>
          <motion.a
            href="mailto:hello@suryaprakash.dev"
            className="btn-accent mb-8"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Let's Build Something</span>
            <span>→</span>
          </motion.a>
        </Reveal>

        {/* Blog hint */}
        <Reveal delay={0.4}>
          <p className="mb-12">
            <Link
              href="/blogs"
              className="text-[12px] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-200 border-b border-transparent hover:border-[var(--color-primary)]"
            >
              Occasionally writing about systems, experiments, and things I'm exploring.
            </Link>
          </p>
        </Reveal>

        {/* Bottom bar — no Reveal so it's always visible at page bottom */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--color-border)] gap-4">
          <span className="text-[12px] text-[var(--color-text-secondary)]">
            © 2026 Surya Prakash
          </span>
          <div className="flex gap-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map((name) => (
              <a
                key={name}
                href="#"
                className="text-[12px] font-normal text-[var(--color-text-secondary)] hover:text-[var(--color-deep-ink)] transition-colors duration-200"
                aria-label={name}
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
