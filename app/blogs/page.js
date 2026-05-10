'use client'

import { motion } from 'framer-motion'
import { Reveal, StaggerContainer, staggerChild } from '@/components/Reveal'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    date: '2026 · 05',
    title: 'Building Systems That Think',
    excerpt: 'Reflections on designing AI-powered architectures that balance intelligence with simplicity.',
    readTime: '5 min',
    tags: ['Systems', 'AI'],
  },
  {
    id: 2,
    date: '2026 · 04',
    title: 'The Art of Immersive Interfaces',
    excerpt: 'How cinematic design principles can transform web experiences beyond the ordinary.',
    readTime: '4 min',
    tags: ['Design', 'Web'],
  },
  {
    id: 3,
    date: '2026 · 03',
    title: 'From Hackathon to Production',
    excerpt: 'Lessons learned from turning rapid prototypes into systems that scale and sustain.',
    readTime: '6 min',
    tags: ['Engineering', 'Lessons'],
  },
]

export default function BlogsPage() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container-narrow">
        <Reveal>
          <Link
            href="/"
            className="text-[12px] tracking-[0.06em] text-[var(--color-border)] hover:text-black transition-colors duration-300 inline-block mb-16"
          >
            ← Back to portfolio
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <header className="mb-20">
            <h1 className="text-display text-black mb-4">Writings</h1>
            <p className="text-body text-[var(--color-muted)] font-light leading-relaxed">
              Occasionally writing about systems,<br />
              experiments, and things I'm exploring.
            </p>
          </header>
        </Reveal>

        {/* Blog posts */}
        <StaggerContainer className="flex flex-col" staggerDelay={0.12}>
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              className="flex flex-col md:flex-row gap-3 md:gap-10 py-8 border-b border-[var(--color-light)] first:border-t cursor-pointer hover:opacity-80 transition-opacity duration-300"
              variants={staggerChild}
              whileHover={{ x: 6, transition: { duration: 0.3 } }}
            >
              {/* Date */}
              <div className="flex md:flex-col gap-3 md:gap-1 shrink-0 md:min-w-[80px]">
                <span className="text-[12px] tracking-[0.08em] text-[var(--color-border)]">
                  {post.date}
                </span>
                <span className="text-[10px] tracking-[0.06em] text-[var(--color-border)] opacity-60">
                  {post.readTime}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-[1.15rem] font-medium text-black mb-1 tracking-tight leading-snug">
                  {post.title}
                </h2>
                <p className="text-[14px] text-[var(--color-muted)] font-light leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[0.08em] uppercase text-[var(--color-border)] px-2.5 py-1 border border-[var(--color-light)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </StaggerContainer>

        <Reveal delay={0.3}>
          <div className="py-16 text-center">
            <p className="text-[12px] tracking-[0.06em] text-[var(--color-border)]">
              More explorations coming soon.
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
