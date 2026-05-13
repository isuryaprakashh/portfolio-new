'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="flex flex-col items-center pt-16 pb-20 px-10 text-center max-w-[1200px] mx-auto">
      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2.5 px-4 py-2 bg-[var(--color-card-bg-alt)] rounded-full text-[12px] font-normal text-[var(--color-deep-ink)] mb-10 border border-[var(--color-border)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-[var(--color-deep-ink)] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
          SP
        </span>
        <span>Engineer · Explorer · Builder</span>
        <span className="text-[var(--color-text-secondary)]">Based in India →</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-display mb-6 max-w-[800px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        Surya Prakash
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-body max-w-[480px] mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
      >
        Exploring AI, scalable systems, and immersive web experiences through building and experimentation.
      </motion.p>

      {/* Features list */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 mb-10 text-[14px] font-normal text-[var(--color-text-secondary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        {[
          'AI & Systems',
          'Digital Interfaces',
          'Intelligent Apps'
        ].map((feat) => (
          <div key={feat} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]" />
            {feat}
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <a href="#projects" className="btn-primary px-8 h-[51px] text-[14px] font-medium">
          View My Work
        </a>
      </motion.div>
    </section>
  )
}
