'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const roles = ['Builder', 'Creator', 'Explorer', 'Engineer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
      } else {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  const nameWords = ['Surya', 'Prakash']

  return (
    <section className="flex flex-col items-center pt-28 pb-16 px-10 text-center max-w-[1200px] mx-auto min-h-[90vh] justify-center">
      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2.5 px-4 py-2 bg-[var(--color-card-bg)] rounded-full text-[12px] font-normal text-[var(--color-deep-ink)] mb-10 border border-[var(--color-border)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-[var(--color-deep-ink)] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
          SP
        </span>
        <span className="text-[var(--color-text-secondary)]">
          {displayText}
          <motion.span
            className="inline-block w-[2px] h-[14px] bg-[var(--color-primary)] ml-0.5 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          />
        </span>
        <span className="text-[var(--color-text-muted)]">Based in India →</span>
      </motion.div>

      {/* Heading — stagger reveal each word */}
      <h1 className="text-display mb-6 max-w-[800px]" style={{ fontSize: 'clamp(48px, 7vw, 72px)' }}>
        {nameWords.map((word, i) => (
          <motion.span
            key={word}
            className="inline-block mr-4"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: 0.2 + i * 0.15,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Subtitle — warmer tone, larger */}
      <motion.p
        className="text-[18px] text-[var(--color-text-secondary)] max-w-[520px] mb-10 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Exploring AI, scalable systems, and immersive web experiences
        through building and experimentation.
      </motion.p>

      {/* Features list */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 mb-12 text-[14px] font-normal text-[var(--color-text-secondary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
      >
        {['AI & Systems', 'Digital Interfaces', 'Intelligent Apps'].map((feat, i) => (
          <motion.div
            key={feat}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
            {feat}
          </motion.div>
        ))}
      </motion.div>

      {/* CTA — glow button */}
      <motion.div
        className="flex flex-col items-center gap-3 mb-16"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
      >
        <a href="#projects" className="btn-glow">
          View My Work
          <span className="text-[var(--color-text-muted)] text-sm">↓</span>
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>Scroll</span>
        <div className="scroll-arrow">↓</div>
      </motion.div>
    </section>
  )
}
