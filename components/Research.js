'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'

export default function Research() {
  const [showAbstract, setShowAbstract] = useState(false)

  return (
    <section id="research" className="section-spacing">
      <div className="container-narrow">
        <Reveal>
          <span className="text-label mb-8 block">Research</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-display mb-4">
            Research &amp;<br />Publications
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-body leading-[1.7] mb-14 max-w-[500px]">
            Some explorations grow beyond projects.
          </p>
        </Reveal>

        {/* Publication card */}
        <Reveal delay={0.3}>
          <article className="card p-8 md:p-10 flex gap-6 group">
            {/* Accent Bar */}
            <div className="w-[3px] min-h-full bg-[var(--color-primary)] shrink-0 rounded-full group-hover:bg-[var(--color-brand-accent)] transition-colors duration-300" />
            <div className="flex-1">
              {/* Venue badge — prominent pill badges */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-medium px-3.5 py-1.5 rounded-full bg-[var(--color-primary)] text-white tracking-wider uppercase">
                  IEEE Publication
                </span>
                <span className="text-[11px] font-medium px-3.5 py-1.5 rounded-full bg-[var(--color-card-bg-alt)] text-[var(--color-text-secondary)] border border-[var(--color-border)] tracking-wider uppercase">
                  INDIACom 2026
                </span>
              </div>

              <h3 className="text-heading mb-3">
                Enhanced Visual Understanding Using Deep Learning Based on Scene Classification
              </h3>

              <p className="text-body leading-[1.7] mb-4 text-[var(--color-text-secondary)]">
                What started as a project ended up as a conference paper.
              </p>

              {/* Abstract Toggle Button */}
              <button
                onClick={() => setShowAbstract(!showAbstract)}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[var(--color-primary)] hover:text-[var(--color-brand-accent)] transition-colors mb-6 cursor-none focus:outline-none"
              >
                <span>{showAbstract ? 'Hide Abstract' : 'Read Abstract'}</span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transform transition-transform duration-300 ${showAbstract ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Collapsible Abstract Content */}
              <AnimatePresence initial={false}>
                {showAbstract && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-[14px] leading-[1.7] text-[var(--color-text-secondary)] bg-[var(--color-card-bg-alt)] p-5 rounded-2xl border border-[var(--color-border)] mb-6">
                      Scene classification is a fundamental problem in computer visual sense, which is used to discover a place from an image, providing an answer for &apos;where am I?&apos; in various applications such as robotics, autonomous vehicles, and surveillance. This study focuses on classifying an image by understanding the overall environment of the image using deep learning models. The study starts with preprocessing, feature extraction, and training with an 80-20 split of three models, which are Artificial Neural Networks (ANN), Convolutional Neural-Networks (CNN) and a Transfer based studying model on Residual Network (ResNet-18), which consists of deep 18-layered neural networks which achieved the best validation accuracy of 95.94 percent. To provide better accessibility, a Flask based web application is developed, allowing people to upload images and obtain results.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              {/* Action Links */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-3 mt-6 mb-6">
                <div className="flex items-center gap-2 flex-wrap text-[14px]">
                  <span className="font-medium text-[var(--color-text-secondary)]">IEEE Document Link:</span>
                  <a
                    href="https://ieeexplore.ieee.org/document/11525589"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13.5px] text-[var(--color-primary)] hover:underline cursor-none w-fit font-sans"
                  >
                    <span className="truncate max-w-[280px] sm:max-w-none">https://ieeexplore.ieee.org/document/11525589</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="shrink-0"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-[14px]">
                  <span className="font-medium text-[var(--color-text-secondary)]">DOI:</span>
                  <a
                    href="https://doi.org/10.23919/INDIACom70271.2026.11525589"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13.5px] text-[var(--color-primary)] hover:underline cursor-none w-fit font-sans"
                  >
                    <span className="truncate max-w-[280px] sm:max-w-none">https://doi.org/10.23919/INDIACom70271.2026.11525589</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="shrink-0"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Metadata tags */}
              <div className="flex items-center gap-3 flex-wrap border-t border-[var(--color-border)] pt-5">
                {['Inukurthi Surya Prakash', 'New Delhi, India', 'Deep Learning', 'ResNet-18'].map((item, i, arr) => (
                  <span key={item} className="flex items-center gap-3">
                    <span className="text-[11px] tracking-wider uppercase text-[var(--color-text-muted)] font-normal">{item}</span>
                    {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
