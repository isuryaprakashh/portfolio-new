'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { Mail, Phone, MapPin, FileText, Copy, Check, Send, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText('isurya2005@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

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
                    <Send className="w-4 h-4" />
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
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
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

              {/* Email card with Copy button */}
              <motion.div
                className="contact-reach-card group relative cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href="mailto:isurya2005@gmail.com"
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                >
                  <div className="contact-reach-icon" style={{ background: 'rgba(30, 58, 138, 0.08)' }}>
                    <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-label">Email</span>
                    <span className="text-[14px] font-medium text-[var(--color-deep-ink)] truncate group-hover:text-[var(--color-primary)] transition-colors duration-300">
                      isurya2005@gmail.com
                    </span>
                  </div>
                </a>

                {/* Quick Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-xs font-medium border border-[var(--color-border)] bg-[var(--color-card-bg-alt)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 shrink-0 flex items-center gap-1 cursor-none focus:outline-none"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      Copied
                    </span>
                  ) : (
                    <span className="text-[11px] text-[var(--color-text-muted)] group-hover:text-[var(--color-deep-ink)] flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </span>
                  )}
                </button>
              </motion.div>

              {/* Phone card */}
              <motion.a
                href="tel:+919533551895"
                className="contact-reach-card group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-reach-icon" style={{ background: 'rgba(139, 158, 130, 0.1)' }}>
                  <Phone className="w-5 h-5 text-[var(--color-sage)]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-label">Phone</span>
                  <span className="text-[14px] font-medium text-[var(--color-deep-ink)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    +91 9533551895
                  </span>
                </div>
                <ArrowUpRight className="contact-reach-arrow w-4 h-4 ml-auto text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </motion.a>

              {/* Location card (non-clickable) */}
              <div className="contact-reach-card">
                <div className="contact-reach-icon" style={{ background: 'rgba(212, 165, 116, 0.1)' }}>
                  <MapPin className="w-5 h-5 text-[var(--color-warm)]" />
                </div>
                <div className="flex flex-col gap-0.5">
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
                  <FileText className="w-5 h-5 text-[var(--color-brand-accent)]" />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-label">Resume</span>
                  <span className="text-[14px] font-medium text-[var(--color-deep-ink)] group-hover:text-[var(--color-primary)] transition-colors duration-300 truncate">
                    SURYA_RESUME.pdf
                  </span>
                </div>
                <ArrowUpRight className="contact-reach-arrow w-4 h-4 ml-auto text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
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
