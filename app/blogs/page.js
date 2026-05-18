'use client'

import { motion } from 'framer-motion'
import { Reveal, StaggerContainer, staggerChild } from '@/components/Reveal'
import Link from 'next/link'

// Blog posts are now fetched from MongoDB


import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ _id: '', title: '', slug: '', date: '', excerpt: '', content: '', readTime: '', tags: '' })
  const router = useRouter()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs', { cache: 'no-store' })
        const data = await res.json()
        if (data.success) {
          setBlogPosts(data.data)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        setIsAdmin(data.isAuthenticated)
      } catch (e) {
        setIsAdmin(false)
      }
    }

    fetchBlogs()
    checkAuth()
  }, [])

  const handleShare = (e, post) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.origin + '/blogs/' + post.slug
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.origin + '/blogs/' + post.slug)
      alert('Link copied to clipboard!')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      if (res.ok) setBlogPosts(prev => prev.filter(b => b._id !== id))
    } catch (e) { console.error(e) }
  }

  const handleEdit = (post) => {
    setFormData({ ...post, tags: post.tags.join(', ') })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags
    }
    
    if (!submitData._id) {
      delete submitData._id
    }

    const url = formData._id ? `/api/blogs/${formData._id}` : '/api/blogs'
    const method = formData._id ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })
      
      const responseData = await res.json()

      if (res.ok && responseData.success) {
        setShowForm(false)
        setFormData({ _id: '', title: '', slug: '', date: '', excerpt: '', content: '', readTime: '', tags: '' })
        // Refetch
        const freshRes = await fetch('/api/blogs', { cache: 'no-store' })
        const freshData = await freshRes.json()
        setBlogPosts(freshData.data)
      } else {
        alert('Failed to save: ' + (responseData.error || 'Unknown error'))
      }
    } catch (e) { console.error(e) }
  }

  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container-narrow">
        <Reveal>
          <Link
            href="/"
            className="text-[12px] tracking-[0.06em] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-300 inline-block mb-16"
          >
            ← Back to portfolio
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <header className="mb-20 flex justify-between items-start">
            <div>
              <h1 className="text-display text-black mb-4">Writings</h1>
              <p className="text-body text-[var(--color-muted)] font-light leading-relaxed">
                Occasionally writing about systems,<br />
                experiments, and things I'm exploring.
              </p>
            </div>
            {isAdmin && (
              <button 
                onClick={() => {
                  setFormData({ _id: '', title: '', slug: '', date: '', excerpt: '', content: '', readTime: '', tags: '' })
                  setShowForm(!showForm)
                }} 
                className="text-[12px] px-4 py-2 border border-[var(--color-border)] rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                {showForm ? 'Close Editor' : '+ New Blog'}
              </button>
            )}
          </header>
        </Reveal>

        {showForm && isAdmin && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-20 p-6 border border-[var(--color-border)] rounded-2xl bg-[var(--color-card-bg)]">
            <h2 className="text-heading mb-4">{formData._id ? 'Edit Blog' : 'Create Blog'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="contact-input !p-3 !text-sm" />
              <input required placeholder="Slug (e.g. my-post)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="contact-input !p-3 !text-sm" />
              <div className="flex gap-4">
                <input required placeholder="Date (e.g. 2026 · 05)" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="contact-input !p-3 !text-sm flex-1" />
                <input required placeholder="Read Time (e.g. 5 min)" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} className="contact-input !p-3 !text-sm flex-1" />
              </div>
              <input placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="contact-input !p-3 !text-sm" />
              <textarea required placeholder="Excerpt" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="contact-input contact-textarea !min-h-[80px] !p-3 !text-sm" />
              <textarea required placeholder="Content" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="contact-input contact-textarea !min-h-[150px] !p-3 !text-sm" />
              <button type="submit" className="btn-primary !h-12 w-full mt-2">Save Blog</button>
            </form>
          </motion.div>
        )}

        {/* Blog posts or Skeleton Loader */}
        {loading ? (
          <div className="flex flex-col gap-8 py-8">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="animate-pulse flex flex-col md:flex-row gap-3 md:gap-10">
                <div className="flex md:flex-col gap-3 md:gap-1 shrink-0 md:min-w-[80px]">
                  <div className="h-3 bg-[var(--color-border)] rounded w-16"></div>
                  <div className="h-2 bg-[var(--color-border)] rounded w-10"></div>
                </div>
                <div className="flex-1">
                  <div className="h-5 bg-[var(--color-border)] rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-[var(--color-border)] rounded w-full mb-2"></div>
                  <div className="h-4 bg-[var(--color-border)] rounded w-5/6 mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-5 bg-[var(--color-border)] rounded-full w-12"></div>
                    <div className="h-5 bg-[var(--color-border)] rounded-full w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <StaggerContainer className="flex flex-col" staggerDelay={0.12}>
          {blogPosts.map((post) => (
            <motion.article
              key={post._id}
              onClick={() => router.push(`/blogs/${post.slug}`)}
              className="group relative flex flex-col md:flex-row gap-3 md:gap-10 py-8 border-b border-[var(--color-border)] first:border-t cursor-pointer transition-colors duration-300 hover:bg-black/5 rounded-xl px-4 -mx-4"
              variants={staggerChild}
              whileHover={{ x: 6, transition: { duration: 0.3 } }}
            >
              {/* Date */}
              <div className="flex md:flex-col gap-3 md:gap-1 shrink-0 md:min-w-[80px]">
                <span className="text-[12px] tracking-[0.08em] text-[var(--color-text-muted)]">
                  {post.date}
                </span>
                <span className="text-[10px] tracking-[0.06em] text-[var(--color-text-muted)] opacity-60">
                  {post.readTime}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-[1.15rem] font-medium text-black mb-1 tracking-tight leading-snug pr-24">
                  {post.title}
                </h2>
                <p className="text-[14px] text-[var(--color-muted)] font-light leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-[0.08em] uppercase text-[var(--color-text-muted)] px-2.5 py-1 border border-[var(--color-border)] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4">
                {/* Share Button (Visible to everyone) */}
                <button 
                  onClick={(e) => handleShare(e, post)} 
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5"
                  style={{ background: 'rgba(99, 102, 241, 0.08)' }}
                  title="Share"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                </button>

                {isAdmin && (
                  <>
                    {/* Edit Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleEdit(post); }} 
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5"
                      style={{ background: 'rgba(139, 158, 130, 0.1)' }}
                      title="Edit"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>

                    {/* Delete Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(post._id); }} 
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:-translate-y-0.5"
                      style={{ background: 'rgba(239, 68, 68, 0.08)' }}
                      title="Delete"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </motion.article>
          ))}
          {blogPosts.length === 0 && (
            <p className="text-[14px] text-[var(--color-text-muted)] py-10 text-center">No blogs published yet.</p>
          )}
        </StaggerContainer>
        )}

        <Reveal delay={0.3}>
          <div className="py-16 text-center">
            <p className="text-[12px] tracking-[0.06em] text-[var(--color-text-muted)]">
              More explorations coming soon.
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  )
}
