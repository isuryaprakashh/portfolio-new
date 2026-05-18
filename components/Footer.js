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
    <section id="contact" className="pt-[120px] pb-16 relative">
      <div className="container-narrow relative z-10 text-center flex flex-col items-center">
        {/* Blog hint */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-label mb-6 block">BLOGS</span>
          </Reveal>
        </div>
        
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
