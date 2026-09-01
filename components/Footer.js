'use client'

import { useState, useEffect } from 'react'
import { motion, animate } from 'framer-motion'
import { Reveal } from './Reveal'
import Link from 'next/link'
import { Quote, ArrowRight, BookOpen, Lock } from 'lucide-react'
import { GithubIcon, LinkedInIcon, XIcon } from './Icons'

const socials = [
  { name: 'GitHub', href: 'https://github.com/isuryaprakashh', icon: GithubIcon, hoverClass: 'hover:!text-black' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/isuryaprakashh', icon: LinkedInIcon, hoverClass: 'hover:!text-[var(--color-primary)]' },
  { name: 'X', href: 'https://x.com/isuryaprakashh', icon: XIcon, hoverClass: 'hover:!text-black' },
  { name: 'Login', href: '/login', icon: Lock, hoverClass: 'hover:!text-emerald-600' },
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
    <section className="pt-[40px] md:pt-[48px] lg:pt-[60px] pb-12 relative overflow-hidden">
      <div className="container-narrow relative z-10 text-center flex flex-col items-center">
        {/* Blog hint */}
        <div className="mb-16 flex flex-col items-center">
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
                Read the blog <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Quote & Visitor Card */}
        <Reveal delay={0.3}>
          <div className="w-full bg-white border border-[rgba(0,0,0,0.08)] rounded-[16px] p-8 md:py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 max-w-[800px] mx-auto mb-10 text-left shadow-none">
            <div className="flex gap-4 items-start flex-1">
              <Quote className="w-4 h-4 text-[rgba(0,0,0,0.35)] mt-1 shrink-0" />
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
      </div>

      {/* ── Giant Display Name Watermark (Full-Width Cardboard Style) ── */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 my-6 md:my-10 select-none pointer-events-none flex justify-center items-center">
        <motion.svg
          viewBox="0 0 1100 180"
          className="w-full h-auto max-h-[160px] md:max-h-[220px]"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <text
            x="50%"
            y="55%"
            dominantBaseline="central"
            textAnchor="middle"
            className="fill-[var(--color-deep-ink)] opacity-[0.06] hover:opacity-[0.1] transition-opacity duration-500 font-serif font-normal"
            style={{
              fontSize: '142px',
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: '-0.02em',
            }}
          >
            SURYA PRAKASH
          </text>
        </motion.svg>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[var(--color-border)] gap-4">
          <span className="text-[12px] text-[var(--color-text-muted)]">
            © 2026 Surya Prakash
          </span>
          <div className="flex items-center gap-5">
            {socials.map((social) => {
              const IconComponent = social.icon
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`inline-flex items-center gap-1.5 text-[12px] font-normal text-[var(--color-text-muted)] ${social.hoverClass} transition-colors duration-200`}
                  aria-label={social.name}
                  whileHover={{ scale: 1.05, y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{social.name}</span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
