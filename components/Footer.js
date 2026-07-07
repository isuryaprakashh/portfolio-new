'use client'

import { useState, useEffect } from 'react'
import { motion, animate } from 'framer-motion'
import { Reveal } from './Reveal'
import Link from 'next/link'

const socials = [
  { name: 'GitHub', href: 'https://github.com/isuryaprakashh' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/isuryaprakashh' },
  { name: 'X', href: 'https://x.com/isuryaprakashh' },
  { name: 'Login', href: '/login' },
]

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(99)
  const [displayedCount, setDisplayedCount] = useState(99)

  useEffect(() => {
    // Session tracking to avoid double-incrementing on refresh
    const hasVisited = sessionStorage.getItem('has_visited_portfolio_session')
    const mode = hasVisited ? 'get' : 'hit'
    if (!hasVisited) {
      sessionStorage.setItem('has_visited_portfolio_session', 'true')
    }

    const fetchVisitorCount = (currentMode) => {
      fetch(`/api/visitors?mode=${currentMode}&t=${Date.now()}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.value === 'number') {
            setVisitorCount(data.value)
          }
        })
        .catch((err) => {
          console.error('Failed to fetch visitor count', err)
        })
    }

    // Initial load
    fetchVisitorCount(mode)

    // Poll the GET endpoint every 5 seconds for real-time updates
    const interval = setInterval(() => {
      fetchVisitorCount('get')
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Animate the displayed visitor count for smooth ticking effect
  useEffect(() => {
    const controls = animate(displayedCount, visitorCount, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayedCount(Math.round(latest)),
    })
    return () => controls.stop()
  }, [visitorCount])

  return (
    <section className="pt-[40px] md:pt-[48px] lg:pt-[60px] pb-16 relative">
      <div className="container-narrow relative z-10 text-center flex flex-col items-center">
        {/* Blog hint */}
        <div className="mb-20 flex flex-col items-center">
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

        {/* Quote & Visitor Card */}
        <Reveal delay={0.3}>
          <div className="w-full bg-white border border-[rgba(0,0,0,0.08)] rounded-[16px] p-8 md:py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 max-w-[800px] mx-auto mb-20 text-left shadow-none">
            <div className="flex gap-4 items-start flex-1">
              <svg className="w-4 h-4 text-[rgba(0,0,0,0.4)] mt-1.5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div className="flex-1">
                <p className="text-[14px] leading-relaxed text-[rgba(0,0,0,0.7)] font-sans">
                  Ideas don&apos;t come out fully formed; they only become clearer as you work on them. You just have to get started.
                </p>
                <p className="text-[12px] text-[rgba(0,0,0,0.5)] mt-3 text-right font-sans">
                  — Mark Zuckerberg
                </p>
              </div>
            </div>
            
            <div className="h-12 w-[1px] bg-[rgba(0,0,0,0.1)] hidden md:block shrink-0" />
            
            <div className="text-[14px] text-[rgba(0,0,0,0.6)] whitespace-nowrap shrink-0 flex items-center gap-1.5 font-sans select-none">
              You are the <strong className="font-semibold text-[rgba(0,0,0,0.8)]">{displayedCount.toLocaleString()}</strong><sup className="text-[rgba(0,0,0,0.5)] text-[10px] -mt-1">th</sup> visitor
            </div>
          </div>
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
