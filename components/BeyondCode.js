'use client'

import { motion } from 'framer-motion'
import { Reveal, StaggerContainer, staggerChild } from './Reveal'
import { Bot, Zap, Users, Layers } from 'lucide-react'
import { GithubIcon } from './Icons'

import dynamic from 'next/dynamic';
import 'react-github-calendar/tooltips.css';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
  { ssr: false, loading: () => <div className="h-32 w-full animate-pulse bg-[var(--color-border)] rounded-md"></div> }
);

const activities = [
  {
    icon: Bot,
    title: 'AI & Autonomous Club',
    description: 'Leading explorations in AI, robotics, and autonomous systems with a community of curious builders.',
    wide: true,
  },
  {
    icon: Zap,
    title: 'Hackathons',
    description: 'Building under constraints, rapid prototyping, and discovering new approaches through competitive collaboration.',
    wide: false,
  },
  {
    icon: Users,
    title: 'Student Communities',
    description: 'Organizing events, sharing knowledge, and growing alongside peers who value building and experimentation.',
    wide: false,
  },
  {
    icon: Layers,
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
          {activities.map((activity) => {
            const IconComponent = activity.icon
            return (
              <motion.div
                key={activity.title}
                className={`floating-card p-8 group ${activity.wide ? 'md:col-span-2' : 'md:col-span-1'}`}
                variants={staggerChild}
              >
                <div className="w-10 h-10 rounded-[12px] bg-[var(--color-card-bg-alt)] flex items-center justify-center text-[var(--color-deep-ink)] mb-6 border border-[var(--color-border)] group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] transition-all duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-semibold text-[var(--color-deep-ink)] mb-2 tracking-tight">
                  {activity.title}
                </h3>
                <p className="text-body leading-[1.7]">
                  {activity.description}
                </p>
              </motion.div>
            )
          })}
        </StaggerContainer>

        <Reveal delay={0.3}>
          <div className="floating-card p-8 md:p-10 w-full overflow-hidden">
            <h3 className="text-[17px] font-semibold text-[var(--color-deep-ink)] mb-6 tracking-tight flex items-center gap-2.5">
              <GithubIcon className="w-5 h-5 text-[var(--color-deep-ink)]" />
              Consistency in Open Source
            </h3>
            <div className="w-full overflow-x-auto pb-4 scrollbar-hide github-calendar-wrapper">
              <div className="min-w-[750px] w-full">
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
                  tooltips={{
                    activity: {
                      text: (activity) => `${activity.count} contributions on ${activity.date}`,
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
