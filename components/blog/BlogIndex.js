'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

// The editor (form, image compression, bulk import) is only downloaded once we know you're the admin.
const BlogAdmin = dynamic(() => import('./BlogAdmin'), { ssr: false })

const PAGE = 8
const VIEW_KEY = 'pb-view'

const meta = (p) => (p.readTime ? `${p.date} · ${p.readTime}` : p.date)

// Prefetch a post on hover/focus/touch only, instead of every link that scrolls into view.
function PostLink({ href, className, children }) {
  const [active, setActive] = useState(false)
  const on = () => setActive(true)
  return (
    <Link href={href} className={className} prefetch={active ? null : false} onMouseEnter={on} onFocus={on} onTouchStart={on}>
      {children}
    </Link>
  )
}

function RowAdmin({ post, onEdit, onDelete }) {
  return (
    <div className="pb-rowadmin">
      <button type="button" className="pb-btn" onClick={() => onEdit(post)}>Edit</button>
      <button type="button" className="pb-btn danger" onClick={() => onDelete(post)}>Delete</button>
    </div>
  )
}

export default function BlogIndex({ posts }) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [tag, setTag] = useState('All')
  const [view, setView] = useState('list')
  const [count, setCount] = useState(PAGE)
  const [request, setRequest] = useState(null)
  const [note, setNote] = useState(null)
  const sentinel = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(VIEW_KEY)
      if (saved === 'list' || saved === 'grid') setView(saved)
    } catch {}
    let live = true
    fetch('/api/auth/me', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (live) setIsAdmin(!!d?.isAuthenticated) })
      .catch(() => {})
    return () => { live = false }
  }, [])

  const tags = useMemo(() => {
    const set = new Set()
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [posts])

  const activeTag = tags.includes(tag) ? tag : 'All'
  const shown = useMemo(
    () => (activeTag === 'All' ? posts : posts.filter((p) => p.tags.includes(activeTag))),
    [posts, activeTag]
  )
  // Featured card only in list view on "All"; everything else is one flat, paged list.
  const featured = view === 'list' && activeTag === 'All' ? shown[0] : null
  const items = featured ? shown.slice(1) : shown
  const visible = items.slice(0, count)
  const remaining = items.length - visible.length

  // Reveal the next page when the sentinel nears the viewport. Re-observing after each page means a
  // still-visible sentinel (tall screens) keeps loading until the viewport is filled.
  useEffect(() => {
    const el = sentinel.current
    if (!el || remaining <= 0 || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) setCount((c) => c + PAGE)
    }, { rootMargin: '0px 0px 600px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [remaining, view, activeTag])

  function selectTag(t) {
    setTag(t)
    setCount(PAGE)
  }

  function chooseView(v) {
    setView(v)
    setCount(PAGE)
    try { localStorage.setItem(VIEW_KEY, v) } catch {}
  }

  const edit = (post) => setRequest({ post })

  async function remove(post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return
    try {
      const res = await fetch(`/api/blogs/${post._id}`, { method: 'DELETE' })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.success) throw new Error(json.error || 'Delete failed')
      setNote({ ok: true, text: 'Post deleted.' })
      router.refresh()
    } catch (err) {
      setNote({ ok: false, text: err.message })
    }
  }

  return (
    <>
      {isAdmin && <BlogAdmin request={request} posts={posts} onNote={setNote} />}
      {note && <p className={`pb-note ${note.ok ? 'ok' : 'err'}`} role="status">{note.text}</p>}

      <div className="pb-toolbar">
        {tags.length > 2 && (
          <div className="pb-tags" role="group" aria-label="Filter by topic">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={activeTag === t}
                className={`pb-tag ${activeTag === t ? 'on' : ''}`}
                onClick={() => selectTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="pb-view-toggle" role="group" aria-label="Layout">
          <button
            type="button"
            className={`pb-view-btn ${view === 'list' ? 'on' : ''}`}
            onClick={() => chooseView('list')}
            aria-pressed={view === 'list'}
            aria-label="List view"
            title="List view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </button>
          <button
            type="button"
            className={`pb-view-btn ${view === 'grid' ? 'on' : ''}`}
            onClick={() => chooseView('grid')}
            aria-pressed={view === 'grid'}
            aria-label="Grid view"
            title="Grid view"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {posts.length === 0 && <p className="pb-empty">No posts yet. New writing is on the way.</p>}

      {view === 'list' ? (
        <div>
          {featured && (
            <div>
              <PostLink className="pb-feat" href={`/blogs/${featured.slug}`}>
                {featured.cover && (
                  // LCP candidate: load eagerly and first.
                  <img src={featured.cover} alt="" width={1280} height={640} decoding="async" fetchPriority="high" />
                )}
                <div className="in">
                  <span className="pb-kicker"><span>{featured.date}</span>{featured.readTime && <span>{featured.readTime}</span>}</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.subtitle || featured.excerpt}</p>
                </div>
              </PostLink>
              {isAdmin && <RowAdmin post={featured} onEdit={edit} onDelete={remove} />}
            </div>
          )}

          {visible.map((p, i) => (
            <div key={p._id} className={`pb-post${p.cover ? ' has-thumb' : ''}`}>
              <PostLink href={`/blogs/${p.slug}`} className="pb-post-link">
                <div className="pb-post-content">
                  <span className="pb-line">
                    <b>{p.title}</b>
                    <i className="pb-dl" />
                    <span className="pb-meta">{meta(p)}</span>
                  </span>
                  <p>{p.excerpt}</p>
                  {p.tags.length > 0 && <span className="pb-chips">{p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}</span>}
                </div>
                {p.cover && (
                  <div className="pb-post-thumb">
                    <img src={p.cover} alt="" width={124} height={82} loading={!featured && i < 2 ? 'eager' : 'lazy'} decoding="async" />
                  </div>
                )}
              </PostLink>
              {isAdmin && <RowAdmin post={p} onEdit={edit} onDelete={remove} />}
            </div>
          ))}
        </div>
      ) : (
        <div className="pb-grid">
          {visible.map((p, i) => (
            <div key={p._id} className="pb-card">
              <PostLink href={`/blogs/${p.slug}`} className="pb-card-link">
                {p.cover ? (
                  <div className="pb-card-thumb">
                    <img
                      src={p.cover}
                      alt=""
                      width={640}
                      height={360}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      fetchPriority={i === 0 ? 'high' : undefined}
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="pb-card-thumb placeholder">
                    <span>{p.tags[0] || 'Article'}</span>
                  </div>
                )}
                <div className="pb-card-body">
                  <div className="pb-card-meta">
                    <span>{p.date}</span>
                    {p.readTime && <span>· {p.readTime}</span>}
                  </div>
                  <h2 className="pb-card-title">{p.title}</h2>
                  <p className="pb-card-excerpt">{p.excerpt}</p>
                  {p.tags.length > 0 && (
                    <div className="pb-chips">
                      {p.tags.slice(0, 2).map((t) => <span key={t}>{t}</span>)}
                    </div>
                  )}
                </div>
              </PostLink>
              {isAdmin && <RowAdmin post={p} onEdit={edit} onDelete={remove} />}
            </div>
          ))}
        </div>
      )}

      {remaining > 0 && (
        <>
          <div ref={sentinel} className="pb-sentinel" aria-hidden="true" />
          <button type="button" className="pb-loadmore" onClick={() => setCount((c) => c + PAGE)}>
            <span>Load more articles</span>
            <span className="pb-loadmore-n">({remaining} remaining)</span>
          </button>
        </>
      )}
    </>
  )
}
