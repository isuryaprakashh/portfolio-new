'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, StaggerContainer, staggerChild } from '@/components/Reveal'
import Link from 'next/link'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'

function calculateReadingTime(text) {
  if (!text) return '1 min read';
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return dateStr;
}

function ShareDropdown({ post, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/blogs/${post.slug}`
    : `/blogs/${post.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    onClose();
  };

  const handleShareX = () => {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    onClose();
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    onClose();
  };

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="share-dropdown"
    >
      <button className="share-dropdown-item" onClick={handleCopyLink}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        Copy link
      </button>
      <button className="share-dropdown-item" onClick={handleShareX}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </button>
      <button className="share-dropdown-item" onClick={handleShareLinkedIn}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        Share on LinkedIn
      </button>
    </motion.div>
  );
}

// Hero card for the latest/featured post
function HeroCard({ post, router, isAdmin, onEdit, onDelete }) {
  const [showShare, setShowShare] = useState(false);

  return (
    <motion.article
      className="blog-hero-card"
      onClick={() => router.push(`/blogs/${post.slug}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero image */}
      <div className="blog-hero-image">
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} loading="eager" />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="blog-card-content">
        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-subtitle">{post.subtitle || post.excerpt}</p>

        <div className="blog-card-meta">
          <span className="blog-card-meta-item">{formatDate(post.date)}</span>
          <span className="blog-card-meta-dot" />
          <span className="blog-card-meta-item">{calculateReadingTime(post.content)}</span>

          {post.tags && post.tags.length > 0 && (
            <>
              <span className="blog-card-meta-dot" />
              <span
                className="blog-card-meta-item"
                style={{
                  background: 'var(--color-card-bg-alt)',
                  padding: '2px 10px',
                  borderRadius: '100px',
                  fontSize: '12px',
                }}
              >
                {post.tags[0]}
              </span>
            </>
          )}

          {/* Actions */}
          <div className="blog-card-actions">
            <div style={{ position: 'relative' }}>
              <button
                className="blog-card-action-btn"
                title="Share"
                onClick={(e) => { e.stopPropagation(); setShowShare(!showShare); }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
              <AnimatePresence>
                {showShare && <ShareDropdown post={post} onClose={() => setShowShare(false)} />}
              </AnimatePresence>
            </div>

            {isAdmin && (
              <>
                <button
                  className="blog-card-action-btn"
                  title="Edit"
                  onClick={(e) => { e.stopPropagation(); onEdit(post); }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  className="blog-card-action-btn"
                  title="Delete"
                  onClick={(e) => { e.stopPropagation(); onDelete(post._id); }}
                  style={{ color: '#EF4444' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// Standard feed card (horizontal layout: text left, thumbnail right)
function FeedCard({ post, router, isAdmin, onEdit, onDelete }) {
  const [showShare, setShowShare] = useState(false);

  return (
    <motion.article
      className="blog-card-medium"
      onClick={() => router.push(`/blogs/${post.slug}`)}
      variants={staggerChild}
    >
      {/* Content */}
      <div className="blog-card-content">
        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-subtitle">{post.subtitle || post.excerpt}</p>

        <div className="blog-card-meta">
          <span className="blog-card-meta-item">{formatDate(post.date)}</span>
          <span className="blog-card-meta-dot" />
          <span className="blog-card-meta-item">{calculateReadingTime(post.content)}</span>

          {post.tags && post.tags.length > 0 && (
            <>
              <span className="blog-card-meta-dot" />
              <span
                className="blog-card-meta-item"
                style={{
                  background: 'var(--color-card-bg-alt)',
                  padding: '2px 10px',
                  borderRadius: '100px',
                  fontSize: '12px',
                }}
              >
                {post.tags[0]}
              </span>
            </>
          )}

          {/* Actions */}
          <div className="blog-card-actions">
            <div style={{ position: 'relative' }}>
              <button
                className="blog-card-action-btn"
                title="Share"
                onClick={(e) => { e.stopPropagation(); setShowShare(!showShare); }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
              <AnimatePresence>
                {showShare && <ShareDropdown post={post} onClose={() => setShowShare(false)} />}
              </AnimatePresence>
            </div>

            {isAdmin && (
              <>
                <button
                  className="blog-card-action-btn"
                  title="Edit"
                  onClick={(e) => { e.stopPropagation(); onEdit(post); }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  className="blog-card-action-btn"
                  title="Delete"
                  onClick={(e) => { e.stopPropagation(); onDelete(post._id); }}
                  style={{ color: '#EF4444' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="blog-card-thumbnail">
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} loading="lazy" />
        ) : (
          <div className="blog-card-thumbnail-placeholder">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function BlogsPage() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    _id: '', title: '', slug: '', date: '', excerpt: '', subtitle: '', coverImage: '', content: '', tags: ''
  })
  const [activeTag, setActiveTag] = useState('All')
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

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    blogPosts.forEach(p => p.tags?.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [blogPosts]);

  // Filter posts by active tag
  const filteredPosts = useMemo(() => {
    if (activeTag === 'All') return blogPosts;
    return blogPosts.filter(p => p.tags?.includes(activeTag));
  }, [blogPosts, activeTag]);

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
    const calculatedReadTime = calculateReadingTime(formData.content);
    const submitData = {
      ...formData,
      readTime: calculatedReadTime,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags
    }

    if (!submitData._id) delete submitData._id;

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
        setFormData({ _id: '', title: '', slug: '', date: '', excerpt: '', subtitle: '', coverImage: '', content: '', tags: '' })
        const freshRes = await fetch('/api/blogs', { cache: 'no-store' })
        const freshData = await freshRes.json()
        setBlogPosts(freshData.data)
      } else {
        alert('Failed to save: ' + (responseData.error || 'Unknown error'))
      }
    } catch (e) { console.error(e) }
  }

  // Split: first post is hero, rest are feed cards
  const heroPost = filteredPosts[0];
  const feedPosts = filteredPosts.slice(1);

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
          <header className="mb-12 flex justify-between items-start">
            <div>
              <h1 className="text-display text-black mb-4">Writings</h1>
              <p className="text-body text-[var(--color-muted)] leading-relaxed">
                Occasionally writing about systems,<br />
                experiments, and things I'm exploring.
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => {
                  setFormData({ _id: '', title: '', slug: '', date: '', excerpt: '', subtitle: '', coverImage: '', content: '', tags: '' })
                  setShowForm(!showForm)
                }}
                className="text-[12px] px-4 py-2 border border-[var(--color-border)] rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                {showForm ? 'Close Editor' : '+ New Blog'}
              </button>
            )}
          </header>
        </Reveal>

        {/* Admin Editor */}
        {showForm && isAdmin && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-20 p-6 border border-[var(--color-border)] rounded-2xl bg-[var(--color-card-bg)]">
            <h2 className="text-heading mb-4">{formData._id ? 'Edit Blog' : 'Create Blog'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input required placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="contact-input !p-3 !text-sm" />
              <input placeholder="Subtitle (optional hook line)" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="contact-input !p-3 !text-sm" />
              <input required placeholder="Slug (e.g. my-post)" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="contact-input !p-3 !text-sm" />
              <div className="flex gap-4">
                <input required placeholder="Date (e.g. 2026 · 05)" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="contact-input !p-3 !text-sm flex-1" />
                <input disabled placeholder="Read Time (Auto-calculated)" className="contact-input !p-3 !text-sm flex-1 opacity-50 bg-gray-100 cursor-not-allowed" />
              </div>
              <input placeholder="Cover Image URL (optional)" value={formData.coverImage} onChange={e => setFormData({ ...formData, coverImage: e.target.value })} className="contact-input !p-3 !text-sm" />
              <input placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} className="contact-input !p-3 !text-sm" />
              <textarea required placeholder="Excerpt" value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} className="contact-input contact-textarea !min-h-[80px] !p-3 !text-sm" />
              <textarea required placeholder="Markdown Content..." value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="contact-input contact-textarea !min-h-[250px] !p-3 !text-sm font-mono" />
              <button type="submit" className="btn-primary !h-12 w-full mt-2">Save Blog</button>
            </form>
          </motion.div>
        )}

        {/* Tag Filter Bar */}
        {!loading && blogPosts.length > 0 && allTags.length > 2 && (
          <Reveal delay={0.15}>
            <div className="tag-filter-bar">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-filter-pill ${activeTag === tag ? 'active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {/* Blog posts or Skeleton Loader */}
        {loading ? (
          <div className="flex flex-col py-8">
            {/* Hero skeleton */}
            <div className="animate-pulse mb-8 pb-8 border-b border-[var(--color-border)]">
              <div className="w-full aspect-video bg-[var(--color-card-bg-alt)] rounded-lg mb-5" />
              <div className="h-7 bg-[var(--color-card-bg-alt)] rounded w-3/4 mb-3" />
              <div className="h-5 bg-[var(--color-card-bg-alt)] rounded w-full mb-2" />
              <div className="h-5 bg-[var(--color-card-bg-alt)] rounded w-5/6 mb-4" />
              <div className="flex gap-3">
                <div className="h-4 bg-[var(--color-card-bg-alt)] rounded w-16" />
                <div className="h-4 bg-[var(--color-card-bg-alt)] rounded w-20" />
              </div>
            </div>
            {/* Feed skeletons */}
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="animate-pulse flex gap-6 py-7 border-b border-[var(--color-border)]">
                <div className="flex-1">
                  <div className="h-5 bg-[var(--color-card-bg-alt)] rounded w-3/4 mb-3" />
                  <div className="h-4 bg-[var(--color-card-bg-alt)] rounded w-full mb-2" />
                  <div className="h-4 bg-[var(--color-card-bg-alt)] rounded w-5/6 mb-4" />
                  <div className="flex gap-3">
                    <div className="h-3 bg-[var(--color-card-bg-alt)] rounded w-16" />
                    <div className="h-3 bg-[var(--color-card-bg-alt)] rounded w-20" />
                  </div>
                </div>
                <div className="w-[160px] h-[107px] bg-[var(--color-card-bg-alt)] rounded shrink-0" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-[14px] text-[var(--color-text-muted)] py-10 text-center">
            {activeTag !== 'All' ? `No posts tagged "${activeTag}" yet.` : 'No blogs published yet.'}
          </p>
        ) : (
          <div>
            {/* Hero Card */}
            {heroPost && (
              <HeroCard
                post={heroPost}
                router={router}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}

            {/* Feed Cards */}
            {feedPosts.length > 0 && (
              <StaggerContainer className="flex flex-col" staggerDelay={0.08}>
                {feedPosts.map((post) => (
                  <FeedCard
                    key={post._id}
                    post={post}
                    router={router}
                    isAdmin={isAdmin}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </StaggerContainer>
            )}
          </div>
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
