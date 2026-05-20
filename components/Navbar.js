'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const navItems = [
  { href: '/#about', label: 'About', section: 'about' },
  { href: '/#projects', label: 'Work', section: 'projects' },
  { href: '/#research', label: 'Research', section: 'research' },
  { href: '/#contact', label: 'Contact', section: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Determine active section
      const sections = navItems.map((item) => {
        const el = document.getElementById(item.section)
        if (!el) return { id: item.section, top: Infinity }
        const rect = el.getBoundingClientRect()
        return { id: item.section, top: Math.abs(rect.top - 100) }
      })
      const closest = sections.reduce((a, b) => (a.top < b.top ? a : b))
      if (closest.top < 400) {
        setActiveSection(closest.id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`nav-glass fixed top-0 left-0 right-0 z-50 ${scrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4 px-10">
        {/* Logo */}
        <Link
          href="/"
          className="w-10 h-10 rounded-full border border-[var(--color-deep-ink)] flex items-center justify-center font-medium text-[13px] text-[var(--color-deep-ink)] hover:bg-[var(--color-deep-ink)] hover:text-white transition-all duration-300"
        >
          SP
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-link text-[12px] font-normal text-[var(--color-deep-ink)] transition-colors duration-200 ${activeSection === item.section ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <Link href="/#contact" className="btn-primary px-5 h-9 text-[11px]">
          Contact Me
        </Link>
      </div>
    </motion.nav>
  )
}
