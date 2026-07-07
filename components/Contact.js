'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateForm = () => {
    const newErrors = {}
    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const form = e.target
      const data = new FormData(form)
      data.append('access_key', '54964161-b264-49f5-a841-40d1d72f878e')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: "Message sent! I'll get back to you soon.",
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to send message.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section id="contact" className="section-spacing relative">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-label mb-6 block">Get In Touch</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-display mb-5">Let's Work Together</h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-body leading-[1.7] max-w-[520px] mx-auto">
              I'm currently open to internships and collaborations.
              Drop a message or reach out directly — I'd love to hear from you.
            </p>
          </Reveal>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-[960px] mx-auto items-start">

          {/* ── Contact Form ── */}
          <Reveal delay={0.3} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="contact-form-card">
              <div className="contact-field-group">
                <label htmlFor="contact-name" className="contact-label">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  placeholder="Surya Prakash"
                  value={formData.name}
                  onChange={handleChange}
                  className={`contact-input ${errors.name ? 'contact-input-error' : ''}`}
                />
                {errors.name && (
                  <p className="contact-error">{errors.name}</p>
                )}
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-email" className="contact-label">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="isurya2005@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`contact-input ${errors.email ? 'contact-input-error' : ''}`}
                />
                {errors.email && (
                  <p className="contact-error">{errors.email}</p>
                )}
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-message" className="contact-label">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your idea or project..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`contact-input contact-textarea ${errors.message ? 'contact-input-error' : ''}`}
                />
                {errors.message && (
                  <p className="contact-error">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="contact-submit-btn"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="contact-spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span>→</span>
                  </>
                )}
              </motion.button>

              {/* Status message */}
              {submitStatus && (
                <motion.div
                  className={`contact-status ${submitStatus.type === 'success' ? 'contact-status-success' : 'contact-status-error'}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span>{submitStatus.type === 'success' ? '✓' : '✕'}</span>
                  <span>{submitStatus.message}</span>
                </motion.div>
              )}
            </form>
          </Reveal>

          {/* ── Sidebar — Direct Reach ── */}
          <Reveal delay={0.45} className="lg:col-span-2">
            <div className="flex flex-col gap-5">
              {/* Divider (mobile only) */}
              <div className="flex items-center gap-4 lg:hidden">
                <div className="h-px bg-[var(--color-border)] flex-grow" />
                <span className="text-label">Or</span>
                <div className="h-px bg-[var(--color-border)] flex-grow" />
              </div>

              {/* Email card */}
              <motion.a
                href="mailto:isurya2005@gmail.com"
                className="contact-reach-card group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-reach-icon" style={{ background: 'rgba(30, 58, 138, 0.08)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-label">Email</span>
                  <span className="text-[14px] font-medium text-[var(--color-deep-ink)] truncate group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    isurya2005@gmail.com
                  </span>
                </div>
                <span className="contact-reach-arrow group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </motion.a>

              {/* Phone card */}
              <motion.a
                href="tel:+919533551895"
                className="contact-reach-card group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-reach-icon" style={{ background: 'rgba(139, 158, 130, 0.1)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label">Phone</span>
                  <span className="text-[14px] font-medium text-[var(--color-deep-ink)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    +91 9533551895
                  </span>
                </div>
                <span className="contact-reach-arrow group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </motion.a>

              {/* Location card (non-clickable) */}
              <div className="contact-reach-card">
                <div className="contact-reach-icon" style={{ background: 'rgba(212, 165, 116, 0.1)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warm)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-label">Location</span>
                  <span className="text-[14px] font-medium text-[var(--color-deep-ink)]">
                    India
                  </span>
                </div>
              </div>

              {/* Resume card */}
              <motion.a
                href="/SURYA-RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-reach-card group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-reach-icon" style={{ background: 'rgba(6, 182, 212, 0.1)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-label">Resume</span>
                  <span className="text-[14px] font-medium text-[var(--color-deep-ink)] group-hover:text-[var(--color-primary)] transition-colors duration-300 truncate">
                   SURYA_RESUME
                  </span>
                </div>
                <span className="contact-reach-arrow group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </motion.a>

              {/* Status badge */}
              <div className="contact-status-badge">
                <span className="contact-pulse-dot" />
                <span className="text-[12px] text-[var(--color-text-secondary)]">
                  Open to opportunities
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
