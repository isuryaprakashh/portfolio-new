'use client'

import { motion } from 'framer-motion'
import { Reveal, StaggerContainer, staggerChild } from './Reveal'

import dynamic from 'next/dynamic';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { ssr: false, loading: () => <div className="h-32 w-full animate-pulse bg-[var(--color-border)] rounded-md"></div> }
);

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
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16" staggerDelay={0.1}>
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

        <Reveal delay={0.3}>
          <div className="floating-card p-8 md:p-10 w-full overflow-hidden">
            <h3 className="text-[17px] font-semibold text-[var(--color-deep-ink)] mb-6 tracking-tight flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Consistency in Open Source
            </h3>
            <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
              <div className="min-w-[750px]">
                <GitHubCalendar 
                  username="isuryaprakashh" 
                  colorScheme="light"
                  theme={{
                    light: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
                  }}
                  fontSize={12}
                  blockSize={12}
                  blockMargin={4}
                  blockRadius={3}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
