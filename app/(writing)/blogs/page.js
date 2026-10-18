'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const EMPTY = { _id: '', title: '', subtitle: '', slug: '', date: '', coverImage: '', tags: '', excerpt: '', content: '' }

function readTime(text) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function slugify(s) {
  return String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export default function BlogsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTag, setActiveTag] = useState('All')
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [note, setNote] = useState(null)
  const dialogRef = useRef(null)
  const fileRef = useRef(null)

  async function load() {
    try {
      const res = await fetch('/api/blogs', { cache: 'no-store' })
      const json = await res.json()
      setPosts(json?.data || [])
    } catch {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    fetch('/api/auth/me').then((r) => r.json()).then((d) => setIsAdmin(!!d?.isAuthenticated)).catch(() => {})
  }, [])

  const tags = useMemo(() => {
    const set = new Set()
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)))
    return ['All', ...Array.from(set).sort()]
  }, [posts])

  const shown = useMemo(
    () => (activeTag === 'All' ? posts : posts.filter((p) => (p.tags || []).includes(activeTag))),
    [posts, activeTag]
  )
  const featured = shown[0]
  const rest = shown.slice(1)

  function openForm(post) {
    setForm(post ? { ...EMPTY, ...post, tags: (post.tags || []).join(', ') } : EMPTY)
    dialogRef.current?.showModal()
  }

  async function save(e) {
    e.preventDefault()
    setSaving(true)
    const body = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      slug: slugify(form.slug || form.title),
      date: form.date.trim(),
      coverImage: form.coverImage.trim(),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      excerpt: form.excerpt.trim(),
      content: form.content,
      readTime: readTime(form.content),
    }
    try {
      const res = await fetch(form._id ? `/api/blogs/${form._id}` : '/api/blogs', {
        method: form._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Save failed')
      dialogRef.current?.close()
      setNote({ ok: true, text: form._id ? 'Post updated.' : 'Post published.' })
      await load()
    } catch (err) {
      setNote({ ok: false, text: err.message })
    } finally {
      setSaving(false)
    }
  }

  async function remove(post) {
    if (!confirm(`Delete “${post.title}”? This can't be undone.`)) return
    const res = await fetch(`/api/blogs/${post._id}`, { method: 'DELETE' })
    const json = await res.json().catch(() => ({}))
    setNote(json.success ? { ok: true, text: 'Post deleted.' } : { ok: false, text: json.error || 'Delete failed' })
    load()
  }

  // Bulk upload: pick a .json file containing one post or an array of posts.
  // Posts whose slug already exists are updated; new slugs are created.
  async function bulkImport(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    let items
    try {
      const parsed = JSON.parse(await file.text())
      items = Array.isArray(parsed) ? parsed : [parsed]
    } catch {
      setNote({ ok: false, text: 'That file is not valid JSON.' })
      return
    }
    const bySlug = new Map(posts.map((p) => [p.slug, p._id]))
    let created = 0, updated = 0
    const failed = []
    // oldest first, so the first post in the file ends up newest
    for (const raw of [...items].reverse()) {
      const { _id, createdAt, updatedAt, __v, views, ...p } = raw || {}
      p.slug = slugify(p.slug || p.title)
      if (!p.readTime && p.content) p.readTime = readTime(p.content)
      if (typeof p.tags === 'string') p.tags = p.tags.split(',').map((t) => t.trim()).filter(Boolean)
      const existing = bySlug.get(p.slug)
      try {
        const res = await fetch(existing ? `/api/blogs/${existing}` : '/api/blogs', {
          method: existing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(p),
        })
        const json = await res.json()
        if (!json.success) throw new Error(json.error)
        if (existing) updated++
        else created++
      } catch (err) {
        failed.push(`${p.title || p.slug}: ${err.message || 'failed'}`)
      }
    }
    setNote({
      ok: failed.length === 0,
      text: `Imported ${created} new, updated ${updated}.` + (failed.length ? ` Failed: ${failed.join('; ')}` : ''),
    })
    load()
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <main className="pb-main">
      <div className="pb-wrap">
        <a className="pb-back" href="/">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          Surya Prakash
        </a>
        <h1 className="pb-h1">Writing</h1>
        <p className="pb-intro">Occasionally writing about systems, experiments, and things I&apos;m exploring.</p>

        {isAdmin && (
          <div className="pb-admin">
            <button className="pb-btn dark" onClick={() => openForm(null)}>New post</button>
            <button className="pb-btn" onClick={() => fileRef.current?.click()}>Bulk upload JSON</button>
            <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={bulkImport} />
          </div>
        )}
        {note && <p className={`pb-note ${note.ok ? 'ok' : 'err'}`} role="status">{note.text}</p>}

        {tags.length > 2 && (
          <div className="pb-tags" role="tablist" aria-label="Filter by topic">
            {tags.map((t) => (
              <button key={t} role="tab" aria-selected={activeTag === t} className={`pb-tag ${activeTag === t ? 'on' : ''}`} onClick={() => setActiveTag(t)}>
                {t}
              </button>
            ))}
          </div>
        )}

        {loading && (<><div className="pb-skel" /><div className="pb-skel" /><div className="pb-skel" /></>)}
        {!loading && shown.length === 0 && <p className="pb-empty">No posts yet. New writing is on the way.</p>}

        {featured && (
          <div>
            <a className="pb-feat" href={`/blogs/${featured.slug}`}>
              {featured.coverImage && <img src={featured.coverImage} alt="" />}
              <div className="in">
                <span className="pb-kicker"><span>{featured.date}</span><span>{readTime(featured.content)}</span></span>
                <h2>{featured.title}</h2>
                <p>{featured.subtitle || featured.excerpt}</p>
              </div>
            </a>
            {isAdmin && (
              <div className="pb-rowadmin">
                <button className="pb-btn" onClick={() => openForm(featured)}>Edit</button>
                <button className="pb-btn danger" onClick={() => remove(featured)}>Delete</button>
              </div>
            )}
          </div>
        )}

        <div>
          {rest.map((p) => (
            <div key={p._id} className="pb-post">
              <a href={`/blogs/${p.slug}`} style={{ display: 'block' }}>
                <span className="pb-line"><b>{p.title}</b><i className="pb-dl" /><span className="pb-meta">{p.date}</span></span>
                <p>{p.excerpt}</p>
                {p.tags?.length > 0 && <span className="pb-chips">{p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}</span>}
              </a>
              {isAdmin && (
                <div className="pb-rowadmin">
                  <button className="pb-btn" onClick={() => openForm(p)}>Edit</button>
                  <button className="pb-btn danger" onClick={() => remove(p)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <dialog ref={dialogRef} className="pb-dialog" aria-label="Edit post">
        <form className="pb-form" onSubmit={save}>
          <h3>{form._id ? 'Edit post' : 'New post'}</h3>
          <input required placeholder="Title" value={form.title} onChange={set('title')} />
          <input placeholder="Subtitle (optional)" value={form.subtitle} onChange={set('subtitle')} />
          <div className="two">
            <input placeholder="Slug (auto from title)" value={form.slug} onChange={set('slug')} />
            <input required placeholder="Date, e.g. 2026 · 10" value={form.date} onChange={set('date')} />
          </div>
          <input placeholder="Cover image URL (optional)" value={form.coverImage} onChange={set('coverImage')} />
          <input placeholder="Tags, comma separated" value={form.tags} onChange={set('tags')} />
          <textarea required placeholder="Excerpt" value={form.excerpt} onChange={set('excerpt')} />
          <textarea required className="md" placeholder="Content (Markdown)" value={form.content} onChange={set('content')} />
          <div className="acts">
            <button type="button" className="pb-btn" onClick={() => dialogRef.current?.close()}>Cancel</button>
            <button type="submit" className="pb-btn dark" disabled={saving}>{saving ? 'Saving…' : form._id ? 'Save changes' : 'Publish'}</button>
          </div>
        </form>
      </dialog>
    </main>
  )
}
