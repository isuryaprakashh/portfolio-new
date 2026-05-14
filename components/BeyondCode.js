'use client'

import { motion } from 'framer-motion'
import { Reveal, StaggerContainer, staggerChild } from './Reveal'

const activities = [
  {
    icon: '◈',
    title: 'AI & Autonomous Club',
    description: 'Leading explorations in AI, robotics, and autonomous systems with a community of curious builders.',
    wide: true,
  },
  {
    icon: '◇',
    title: 'Hackathons',
    description: 'Building under constraints, rapid prototyping, and discovering new approaches through competitive collaboration.',
    wide: false,
  },
  {
    icon: '○',
    title: 'Student Communities',
    description: 'Organizing events, sharing knowledge, and growing alongside peers who value building and experimentation.',
    wide: false,
  },
  {
    icon: '△',
    title: 'Collaborative Projects',
    description: 'Working across disciplines — combining engineering, design, and product thinking in team environments.',
    wide: true,
  },
]

export default function BeyondCode() {
  return (
    <section id="beyond" className="section-spacing">
      <div className="container-main">
        <Reveal>
          <span className="text-label mb-8 block">Beyond Code</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display mb-4">
            Beyond Code
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-body leading-[1.7] mb-4 max-w-[480px]">
            Some of the best ideas come from building with people.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.7] max-w-[480px] mb-14">
            Hackathons, student communities, and collaborative projects
            have become a big part of how I learn and build.
          </p>
        </Reveal>

        {/* Activity grid — varied sizes */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" staggerDelay={0.1}>
          {activities.map((activity) => (
            <motion.div
              key={activity.title}
              className={`floating-card p-8 group ${activity.wide ? 'md:col-span-2' : 'md:col-span-1'}`}
              variants={staggerChild}
            >
              <div className="w-10 h-10 rounded-[12px] bg-[var(--color-card-bg-alt)] flex items-center justify-center text-lg text-[var(--color-deep-ink)] mb-6 border border-[var(--color-border)] group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] transition-all duration-300">
                {activity.icon}
              </div>
              <h3 className="text-[17px] font-semibold text-[var(--color-deep-ink)] mb-2 tracking-tight">
                {activity.title}
              </h3>
              <p className="text-body leading-[1.7]">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
