'use client'

import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import Link from 'next/link'

const socials = [
  { name: 'GitHub', href: '#' },
  { name: 'LinkedIn', href: '#' },
  { name: 'Twitter', href: '#' },
]

export default function Footer() {
  return (
    <section id="contact" className="pt-[120px] pb-16 relative">
      <div className="container-narrow relative z-10 text-center flex flex-col items-center">
        <Reveal>
          <span className="text-label mb-8 block">What's Next</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display mb-5">Still Exploring?</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-body leading-[1.7] max-w-[420px] mb-10">
            I'm always open to new ideas, collaborations, and conversations.
            If something here resonated, let's connect.
          </p>
        </Reveal>

        {/* CTA — pulse animation */}
        <Reveal delay={0.3}>
          <motion.a
            href="mailto:hello@suryaprakash.dev"
            className="btn-accent pulse-glow mb-8"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Let's Build Something</span>
            <span className="text-lg">→</span>
          </motion.a>
        </Reveal>

        {/* Blog hint */}
        <Reveal delay={0.4}>
          <p className="mb-16">
            <Link
              href="/blogs"
              className="text-[12px] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-300 border-b border-transparent hover:border-[var(--color-primary)] pb-0.5"
            >
              Occasionally writing about systems, experiments, and things I'm exploring.
            </Link>
          </p>
        </Reveal>

        {/* Bottom bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--color-border)] gap-4">
          <span className="text-[12px] text-[var(--color-text-muted)]">
            © 2026 Surya Prakash
          </span>
          <div className="flex gap-5">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="text-[12px] font-normal text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200"
                aria-label={social.name}
                whileHover={{ scale: 1.1, y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
