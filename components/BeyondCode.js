'use client'

import { motion } from 'framer-motion'
import { Reveal, StaggerContainer, staggerChild } from './Reveal'

const activities = [
  {
    icon: '◈',
    title: 'AI & Autonomous Club',
    description: 'Leading explorations in AI, robotics, and autonomous systems with a community of curious builders.',
  },
  {
    icon: '◇',
    title: 'Hackathons',
    description: 'Building under constraints, rapid prototyping, and discovering new approaches through competitive collaboration.',
  },
  {
    icon: '○',
    title: 'Student Communities',
    description: 'Organizing events, sharing knowledge, and growing alongside peers who value building and experimentation.',
  },
  {
    icon: '△',
    title: 'Collaborative Projects',
    description: 'Working across disciplines — combining engineering, design, and product thinking in team environments.',
  },
]

export default function BeyondCode() {
  return (
    <section id="beyond" className="section-spacing">
      <div className="container-main">
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="inline-block w-6 h-px bg-[var(--color-border)]" />
            <span className="text-[12px] tracking-[0.12em] uppercase text-[var(--color-muted)]">
              Beyond Code
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display text-black mb-4">
            Beyond Code
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-[1.35rem] font-light text-[var(--color-muted)] leading-relaxed mb-4">
            Some of the best ideas<br />come from building with people.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[14px] text-[var(--color-muted)] font-light leading-relaxed max-w-[500px] mb-12 md:mb-16">
            Hackathons, student communities, and collaborative projects
            have become a big part of how I learn and build.
          </p>
        </Reveal>

        {/* Activity grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.1}>
          {activities.map((activity) => (
            <motion.div
              key={activity.title}
              className="p-10 floating-card cursor-default group"
              variants={staggerChild}
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl text-black mb-8 border border-gray-100 group-hover:bg-[var(--color-brand-accent)] group-hover:border-[var(--color-brand-accent)] transition-all duration-300">
                {activity.icon}
              </div>
              <h3 className="text-xl font-extrabold text-black mb-3 tracking-tight">
                {activity.title}
              </h3>
              <p className="text-body text-gray-500 font-normal leading-relaxed">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
