'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, FileText, ArrowRight } from 'lucide-react'

const navItems = [
  { href: '/#about', label: 'About', section: 'about' },
  { href: '/#projects', label: 'Work', section: 'projects' },
  { href: '/#research', label: 'Research', section: 'research' },
  { href: '/#contact', label: 'Contact', section: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.nav
      className={`nav-glass fixed top-0 left-0 right-0 z-50 ${scrolled || mobileMenuOpen ? 'scrolled bg-white/90 backdrop-blur-md' : ''}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="w-10 h-10 rounded-full border border-[var(--color-deep-ink)] flex items-center justify-center font-medium text-[13px] text-[var(--color-deep-ink)] hover:bg-[var(--color-deep-ink)] hover:text-white transition-all duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          SP
        </Link>

        {/* Desktop Nav Links */}
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

        {/* Action Buttons & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <Link href="/#contact" className="hidden sm:inline-flex btn-primary px-5 h-9 text-[11px]">
            Contact Me
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-deep-ink)] focus:outline-none shadow-sm transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[var(--color-border)] bg-white/95 backdrop-blur-xl px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[15px] font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    activeSection === item.section
                      ? 'text-[var(--color-primary)] bg-[var(--color-card-bg-alt)] font-semibold'
                      : 'text-[var(--color-deep-ink)] hover:bg-[var(--color-card-bg-alt)]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-[var(--color-border)] flex flex-col gap-3">
                <Link
                  href="/SURYA-RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg-alt)] text-[13px] font-medium text-[var(--color-deep-ink)]"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume</span>
                </Link>

                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full h-11 text-[13px] justify-center"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
