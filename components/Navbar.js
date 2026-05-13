'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  return (
    <motion.nav
      className="py-5 px-10 flex items-center justify-between max-w-[1200px] mx-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="w-10 h-10 rounded-full border border-[var(--color-deep-ink)] flex items-center justify-center font-semibold text-sm text-[var(--color-deep-ink)] hover:bg-[var(--color-deep-ink)] hover:text-white transition-all duration-200"
      >
        SP
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {[
          { href: '#about', label: 'About' },
          { href: '#projects', label: 'Work' },
          { href: '#research', label: 'Research' },
          { href: '#contact', label: 'Contact' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[12px] font-normal text-[var(--color-deep-ink)] hover:text-[var(--color-text-secondary)] transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Action Button */}
      <Link
        href="#contact"
        className="btn-primary px-5 h-10 text-[12px] rounded-full"
      >
        Contact Me
      </Link>
    </motion.nav>
  )
}
