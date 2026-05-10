'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  return (
    <motion.nav
      className="py-6 px-10 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Logo */}
      <Link href="/" className="w-10 h-10 rounded-full border border-black flex items-center justify-center font-bold text-lg hover:bg-black hover:text-white transition-all">
        SP
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-10">
        {[
          { href: '#about', label: 'About' },
          { href: '#projects', label: 'Work' },
          { href: '#research', label: 'Research' },
          { href: '#contact', label: 'Contact' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-[14px] font-medium text-black hover:opacity-60 transition-opacity"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Action Button */}
      <button className="px-6 py-2.5 bg-black text-white text-[14px] font-semibold rounded-full shadow-button hover:bg-gray-800 transition-all">
        Contact Me
      </button>
    </motion.nav>
  )
}
