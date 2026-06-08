'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'
import Image from 'next/image'

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
          <article className="project-grid-card group grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-[24px] overflow-hidden transition-all duration-400 hover:shadow-md hover:border-gray-300 p-0">
            {/* Left Column - Visual (lg:col-span-5) */}
            <div className="lg:col-span-5 relative w-full overflow-hidden flex items-center justify-center p-3.5 bg-gray-50 border-b lg:border-b-0 lg:border-r border-[var(--color-border)] min-h-[220px]">
              {/* Gradient backdrop with blur */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', opacity: 0.15 }}
              />
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
              
              {/* Centered screenshot */}
              <div className="project-grid-card-img-container relative w-[96%] h-[92%] aspect-[4/3] rounded-xl overflow-hidden border border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1">
                <Image
                  src="/projects/Scene-Classification.png"
                  alt="Scene Classification research diagram"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover object-top"
                  quality={90}
                />
              </div>
            </div>

            {/* Right Column - Content (lg:col-span-7) */}
            <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-center">
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
                Exploring deep learning models for intelligent scene classification. This study starts with preprocessing, feature extraction, and training with an 80-20 split of ANN, CNN, and a Transfer Learning model on ResNet-18, achieving a validation accuracy of 95.94%.
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
              <div className="flex items-center gap-3 mt-6 flex-wrap mb-6">
                <a
                  href="https://ieeexplore.ieee.org/document/11525589"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full bg-[var(--color-deep-ink)] text-white hover:bg-[var(--color-primary)] transition-all duration-300 shadow-sm cursor-none"
                >
                  <span>IEEE Xplore</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
                <a
                  href="https://doi.org/10.23919/INDIACom70271.2026.11525589"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-card-bg-alt)] transition-all duration-300 shadow-sm cursor-none"
                >
                  <span>DOI Link</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
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
