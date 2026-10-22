'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { readTime, slugify } from './utils'

const EMPTY = { _id: '', title: '', subtitle: '', slug: '', date: '', coverImage: '', tags: '', excerpt: '', content: '' }
const MAX_UPLOAD = 15 * 1024 * 1024
// Covers are re-encoded in the browser (also strips EXIF/GPS) before they're stored.
const COVER = { maxWidth: 1600, quality: 0.82, type: 'image/webp', budget: 300 * 1024 }

const kb = (n) => `${Math.round(n / 1024)} KB`
const dataUrlBytes = (u) => Math.floor(((u.length - u.indexOf(',') - 1) * 3) / 4)

async function decodeImage(file) {
  if (typeof createImageBitmap === 'function') {
    try { return await createImageBitmap(file) } catch {}
  }
  const src = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.src = src
    await img.decode()
    return img
  } finally {
    URL.revokeObjectURL(src)
  }
}

async function compressCover(file) {
  const img = await decodeImage(file)
  const w0 = img.naturalWidth || img.width
  const h0 = img.naturalHeight || img.height
  if (!w0 || !h0) throw new Error('empty image')
  const scale = Math.min(1, COVER.maxWidth / w0)
  const w = Math.max(1, Math.round(w0 * scale))
  const h = Math.max(1, Math.round(h0 * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, 0, 0, w, h)
  img.close?.()

  let type = COVER.type
  let q = COVER.quality
  let url = canvas.toDataURL(type, q)
  if (!url.startsWith(`data:${type}`)) {
    // No WebP encoder (older Safari): JPEG on white instead of a huge PNG.
    type = 'image/jpeg'
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, w, h)
    url = canvas.toDataURL(type, q)
  }
  while (dataUrlBytes(url) > COVER.budget && q > 0.5) {
    q = Math.round((q - 0.08) * 100) / 100
    url = canvas.toDataURL(type, q)
  }
  return { url, w, h, type, bytes: dataUrlBytes(url) }
}

export default function BlogAdmin({ request, posts, onNote }) {
  const router = useRouter()
  const dialogRef = useRef(null)
  const jsonRef = useRef(null)
  const imgRef = useRef(null)
  const initialCover = useRef('')
  const loadSeq = useRef(0)
  const [form, setForm] = useState(EMPTY)
  // idle | loading (fetching full post) | failed | compressing | saving
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [coverInfo, setCoverInfo] = useState('')
  const [importing, setImporting] = useState(false)

  async function open(post) {
    const seq = ++loadSeq.current
    setError('')
    setCoverInfo('')
    if (!dialogRef.current?.open) dialogRef.current?.showModal()
    if (!post) {
      initialCover.current = ''
      setForm(EMPTY)
      setStatus('idle')
      return
    }
    // The list only has light fields; editing must start from the full stored post, or saving
    // would overwrite content with an empty string.
    setForm({ ...EMPTY, _id: post._id, title: post.title })
    setStatus('loading')
    try {
      const res = await fetch(`/api/blogs/${post._id}`, { cache: 'no-store' })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.success) throw new Error(json.error || `Could not load the post (${res.status})`)
      const d = json.data
      if (typeof d?.content !== 'string' || !d.content.trim()) throw new Error('Stored post has no content; not editable here.')
      if (seq !== loadSeq.current) return
      initialCover.current = d.coverImage || ''
      setForm({
        _id: String(d._id),
        title: d.title || '',
        subtitle: d.subtitle || '',
        slug: d.slug || '',
        date: d.date || '',
        coverImage: d.coverImage || '',
        tags: (d.tags || []).join(', '),
        excerpt: d.excerpt || '',
        content: d.content,
      })
      setStatus('idle')
    } catch (err) {
      if (seq !== loadSeq.current) return
      setStatus('failed')
      setError(err.message)
    }
  }

  // BlogIndex asks us to open the editor by passing a new { post } object.
  useEffect(() => {
    if (request) open(request.post)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request])

  function close() {
    loadSeq.current++
    dialogRef.current?.close()
  }

  async function handleImage(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) return setError('Please choose an image file.')
    if (file.size > MAX_UPLOAD) return setError('That image is over 15 MB. Pick a smaller one or paste a URL.')
    setError('')
    setStatus('compressing')
    try {
      const out = await compressCover(file)
      setForm((f) => ({ ...f, coverImage: out.url }))
      setCoverInfo(`${out.w}×${out.h} ${out.type.split('/')[1].toUpperCase()} · ${kb(out.bytes)} (was ${kb(file.size)})`)
    } catch {
      setError('Could not read that image. Try another file or paste an image URL.')
    } finally {
      setStatus('idle')
    }
  }

  async function save(e) {
    e.preventDefault()
    if (status !== 'idle') return
    if (!form.content.trim()) return setError('Content can’t be empty.')
    const body = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      slug: slugify(form.slug || form.title),
      date: form.date.trim(),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      excerpt: form.excerpt.trim(),
      content: form.content,
      readTime: readTime(form.content),
    }
    // Only send the cover when it changed: avoids re-uploading a large legacy base64 cover on every edit.
    if (!form._id || form.coverImage !== initialCover.current) body.coverImage = form.coverImage.trim()

    setStatus('saving')
    setError('')
    try {
      const res = await fetch(form._id ? `/api/blogs/${form._id}` : '/api/blogs', {
        method: form._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.success) throw new Error(json.error || `Save failed (${res.status})`)
      close()
      onNote({ ok: true, text: form._id ? 'Post updated.' : 'Post published.' })
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setStatus('idle')
    }
  }

  async function bulkImport(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    let items
    try {
      const parsed = JSON.parse(await file.text())
      items = Array.isArray(parsed) ? parsed : [parsed]
    } catch {
      onNote({ ok: false, text: 'That file is not valid JSON.' })
      return
    }
    setImporting(true)
    const bySlug = new Map(posts.map((p) => [p.slug, p._id]))
    let created = 0
    let updated = 0
    const failed = []
    for (const raw of [...items].reverse()) {
      // The API whitelists fields; _id/views/timestamps in the file are ignored.
      const p = { ...(raw || {}) }
      p.slug = slugify(p.slug || p.title)
      if (!p.readTime && p.content) p.readTime = readTime(p.content)
      const existing = bySlug.get(p.slug)
      try {
        const res = await fetch(existing ? `/api/blogs/${existing}` : '/api/blogs', {
          method: existing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(p),
        })
        const json = await res.json().catch(() => ({}))
        if (!res.ok || !json.success) throw new Error(json.error || `HTTP ${res.status}`)
        if (existing) updated++
        else created++
      } catch (err) {
        failed.push(`${p.title || p.slug}: ${err.message || 'failed'}`)
      }
    }
    setImporting(false)
    onNote({
      ok: failed.length === 0,
      text: `Imported ${created} new, updated ${updated}.` + (failed.length ? ` Failed: ${failed.join('; ')}` : ''),
    })
    router.refresh()
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const isData = form.coverImage.startsWith('data:')
  const editing = Boolean(form._id)
  const busy = status !== 'idle'

  return (
    <>
      <div className="pb-admin">
        <button type="button" className="pb-btn dark" onClick={() => open(null)}>New post</button>
        <button type="button" className="pb-btn" onClick={() => jsonRef.current?.click()} disabled={importing}>
          {importing ? 'Importing…' : 'Bulk upload JSON'}
        </button>
        <input ref={jsonRef} type="file" accept="application/json,.json" hidden onChange={bulkImport} />
      </div>

      <dialog ref={dialogRef} className="pb-dialog" aria-labelledby="pb-form-title" onClose={() => loadSeq.current++}>
        <form className="pb-form" onSubmit={save}>
          <h3 id="pb-form-title">{editing ? 'Edit post' : 'New post'}</h3>
          {status === 'loading' && <p className="pb-note" role="status">Loading the full post…</p>}
          {error && <p className="pb-note err" role="alert">{error}</p>}

          <fieldset className="pb-fields" disabled={status === 'loading' || status === 'failed'}>
            <input required placeholder="Title" value={form.title} onChange={set('title')} />
            <input placeholder="Subtitle (optional)" value={form.subtitle} onChange={set('subtitle')} />
            <div className="two">
              <input placeholder="Slug (auto from title)" value={form.slug} onChange={set('slug')} />
              <input required placeholder="Date, e.g. 2026 · 10" value={form.date} onChange={set('date')} />
            </div>

            <div>
              <input
                placeholder={isData ? 'Uploaded image in use. Paste a URL to replace it' : 'Cover image URL (optional)'}
                value={isData ? '' : form.coverImage}
                onChange={set('coverImage')}
              />
              <button type="button" className="pb-file-upload-btn" onClick={() => imgRef.current?.click()} disabled={busy}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                <span>{status === 'compressing' ? 'Optimizing…' : 'Upload from device'}</span>
              </button>
              <input ref={imgRef} type="file" accept="image/*" hidden onChange={handleImage} />
            </div>

            {form.coverImage && (
              <div className="pb-thumb-preview">
                <div className="pb-thumb-preview-img">
                  <img src={form.coverImage} alt="Cover preview" onError={(e) => { e.currentTarget.style.opacity = '0.3' }} />
                </div>
                <div className="pb-thumb-preview-info">
                  <span className="pb-thumb-preview-badge">Live card preview</span>
                  <b>{form.title || 'Post title preview'}</b>
                  <p>{form.excerpt || 'Short excerpt will appear here…'}</p>
                  {coverInfo && <small className="pb-cover-info">{coverInfo}</small>}
                </div>
                <button type="button" className="pb-btn pb-btn-sm" onClick={() => { setForm((f) => ({ ...f, coverImage: '' })); setCoverInfo('') }}>
                  Clear
                </button>
              </div>
            )}

            <input placeholder="Tags, comma separated" value={form.tags} onChange={set('tags')} />
            <textarea required placeholder="Excerpt (short summary)" value={form.excerpt} onChange={set('excerpt')} />
            <textarea required className="md" placeholder="Content (Markdown)" value={form.content} onChange={set('content')} />
          </fieldset>

          <div className="acts">
            <button type="button" className="pb-btn" onClick={close}>Cancel</button>
            <button type="submit" className="pb-btn dark" disabled={busy}>
              {status === 'saving' ? 'Saving…' : editing ? 'Save changes' : 'Publish'}
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
