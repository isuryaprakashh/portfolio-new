'use client'

import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import Link from 'next/link'

const socials = [
  { name: 'GitHub', href: 'https://github.com/isuryaprakashh' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/isuryaprakashh' },
  { name: 'X', href: 'https://x.com/isuryaprakashh' },
  { name: 'Login', href: '/login' },
]

export default function Footer() {
  return (
    <section className="pt-[120px] pb-16 relative">
      <div className="container-narrow relative z-10 text-center flex flex-col items-center">
        {/* Blog hint */}
        <div className="mb-24 flex flex-col items-center">
          <Reveal>
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-4 block">
              Writings
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href="/blogs"
              className="group flex flex-col items-center gap-3"
            >
              <p className="text-[15px] text-[var(--color-deep-ink)] font-medium max-w-[400px] leading-relaxed transition-colors group-hover:text-[var(--color-primary)]">
                Occasionally writing about systems, experiments, and things I'm exploring.
              </p>
              <span className="text-[12px] text-[var(--color-text-muted)] flex items-center gap-1.5 transition-colors group-hover:text-[var(--color-primary)] mt-1">
                Read the blog <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </Reveal>
        </div>

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
