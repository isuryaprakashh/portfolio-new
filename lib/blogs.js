// Server-only blog data access. Never import this from a 'use client' file (it pulls in mongoose).
import { cache } from 'react'
import { revalidatePath } from 'next/cache'
import mongoose from 'mongoose'
import connectToDatabase from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { readTime } from '@/components/blog/utils'

export const isObjectId = (id) => typeof id === 'string' && /^[a-f\d]{24}$/i.test(id)

export const isBuildPhase = () => process.env.NEXT_PHASE === 'phase-production-build'

// Covers are either a URL or a legacy base64 data URL (can be MBs). List queries must never ship the
// base64 to Node, so the projection reduces a data-URL cover to the marker 'data:' inside MongoDB.
const COVER_MARKER = {
  $let: {
    vars: { c: { $ifNull: ['$coverImage', ''] } },
    in: { $cond: [{ $eq: [{ $substrCP: ['$$c', 0, 5] }, 'data:'] }, 'data:', '$$c'] },
  },
}

const LIST_FIELDS = { title: 1, subtitle: 1, slug: 1, date: 1, excerpt: 1, readTime: 1, tags: 1, createdAt: 1, updatedAt: 1 }

// Public URL for a post's cover: remote/relative URLs as-is, base64 covers via the cacheable bytes route.
export function coverUrl(id, cover, updatedAt) {
  if (!cover) return null
  if (cover.startsWith('data:')) return `/api/blogs/${id}/cover?v=${updatedAt ? new Date(updatedAt).getTime() : 0}`
  if (/^https?:\/\//i.test(cover) || cover.startsWith('/')) return cover
  return null
}

function toListItem(d) {
  const _id = String(d._id)
  return {
    _id,
    title: d.title || '',
    subtitle: d.subtitle || '',
    slug: d.slug,
    date: d.date || '',
    excerpt: d.excerpt || '',
    readTime: d.readTime || '',
    tags: Array.isArray(d.tags) ? d.tags : [],
    cover: coverUrl(_id, d.cover, d.updatedAt),
  }
}

// Lightweight list (no content, no base64), newest first.
export async function getPostList({ limit = 0 } = {}) {
  await connectToDatabase()
  const pipeline = [{ $sort: { createdAt: -1, _id: -1 } }]
  if (limit > 0) pipeline.push({ $limit: limit })
  pipeline.push({ $project: { ...LIST_FIELDS, cover: COVER_MARKER } })
  const docs = await Blog.aggregate(pipeline)
  return docs.map(toListItem)
}

// Deduped per render: generateMetadata and the page share one query.
export const getPostBySlug = cache(async (slug) => {
  await connectToDatabase()
  const [d] = await Blog.aggregate([
    { $match: { slug: String(slug) } },
    { $limit: 1 },
    { $project: { ...LIST_FIELDS, content: 1, views: 1, cover: COVER_MARKER } },
  ])
  if (!d) return null
  return {
    ...toListItem(d),
    content: d.content || '',
    views: d.views || 0,
    publishedAt: d.createdAt ? new Date(d.createdAt).toISOString() : undefined,
    modifiedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : undefined,
  }
})

// Up to 3 other posts, most shared tags first, then newest. One round trip.
export async function getRelatedPosts(post, limit = 3) {
  await connectToDatabase()
  const docs = await Blog.aggregate([
    { $match: { _id: { $ne: new mongoose.Types.ObjectId(post._id) } } },
    { $addFields: { _score: { $size: { $setIntersection: [{ $ifNull: ['$tags', []] }, post.tags || []] } } } },
    { $sort: { _score: -1, createdAt: -1 } },
    { $limit: limit },
    { $project: { title: 1, slug: 1, excerpt: 1, date: 1, readTime: 1 } },
  ])
  return docs.map((d) => ({ _id: String(d._id), title: d.title, slug: d.slug, excerpt: d.excerpt || '', date: d.date || '', readTime: d.readTime || '' }))
}

export async function getAllSlugs() {
  await connectToDatabase()
  const docs = await Blog.find({}, { slug: 1, _id: 0 }).lean()
  return docs.map((d) => d.slug).filter(Boolean)
}

// Full raw document for the admin editor (includes content and the original coverImage).
export async function getPostForEdit(id) {
  if (!isObjectId(id)) return null
  await connectToDatabase()
  const d = await Blog.findById(id).lean()
  return d ? { ...d, _id: String(d._id) } : null
}

export async function getCover(id) {
  if (!isObjectId(id)) return null
  await connectToDatabase()
  return Blog.findById(id, { coverImage: 1, updatedAt: 1 }).lean()
}

export async function getOgPost(slug) {
  await connectToDatabase()
  return Blog.findOne({ slug: String(slug) }, { title: 1, subtitle: 1, excerpt: 1, date: 1, readTime: 1, tags: 1, coverImage: 1 }).lean()
}

const IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml'])

export function parseDataUrl(s) {
  const m = /^data:(image\/[a-z0-9.+-]+)(?:;[^;,]*)*;base64,/i.exec(s || '')
  if (!m) return null
  const mime = m[1].toLowerCase().replace('image/jpg', 'image/jpeg')
  if (!IMAGE_TYPES.has(mime)) return null
  return { mime, bytes: Buffer.from(s.slice(m[0].length), 'base64') }
}

// Whitelist + normalise a create/update payload. Unknown keys (_id, views, createdAt, __v, …) are dropped.
const TEXT_FIELDS = ['title', 'subtitle', 'slug', 'date', 'excerpt', 'readTime']
const REQUIRED = ['title', 'slug', 'date', 'excerpt', 'content', 'readTime']
const MAX_COVER_CHARS = 3_000_000

export function pickPostFields(body) {
  const src = body && typeof body === 'object' ? body : {}
  const out = {}
  for (const k of TEXT_FIELDS) if (typeof src[k] === 'string') out[k] = src[k].trim()
  if (typeof src.content === 'string') out.content = src.content
  if (Array.isArray(src.tags)) out.tags = src.tags.map((t) => String(t).trim()).filter(Boolean)
  else if (typeof src.tags === 'string') out.tags = src.tags.split(',').map((t) => t.trim()).filter(Boolean)
  if (typeof src.coverImage === 'string') {
    const c = src.coverImage.trim()
    // Our own derived cover URL must never be written back (it would point at itself).
    if (!/\/api\/blogs\/[^/]+\/cover/.test(c)) out.coverImage = c
  }
  if (!out.readTime && typeof out.content === 'string' && out.content.trim()) out.readTime = readTime(out.content)
  return out
}

// Returns an error message or null. `partial` = update: only fields that are present must be non-empty.
export function validatePost(data, { partial = false } = {}) {
  for (const k of REQUIRED) {
    const present = typeof data[k] === 'string'
    if ((partial ? present : true) && !(present && data[k].trim())) return `${k} can't be empty.`
  }
  const c = data.coverImage
  if (c) {
    if (c.startsWith('data:')) {
      if (!parseDataUrl(c)) return 'Cover must be a PNG, JPEG, WebP, GIF or AVIF image.'
      if (c.length > MAX_COVER_CHARS) return 'Cover image is too large. Upload it again so it gets compressed.'
    } else if (!/^https?:\/\//i.test(c) && !c.startsWith('/')) {
      return 'Cover must be an http(s) URL, a /path, or an uploaded image.'
    }
  }
  return null
}

// After any create/update/delete: refresh /blogs, the affected post URLs (old + new slug on rename),
// and every post page + OG card (their "More writing" lists may mention the changed post).
export function revalidateBlogs(...slugs) {
  revalidatePath('/blogs')
  for (const s of new Set(slugs.filter(Boolean))) revalidatePath(`/blogs/${s}`)
  revalidatePath('/(writing)/blogs/[slug]', 'layout')
}

export function errorResponseInit(error) {
  if (error instanceof SyntaxError) return { status: 400, message: 'Invalid JSON body.' }
  if (error?.code === 11000) return { status: 409, message: 'That slug is already used by another post.' }
  if (error?.name === 'ValidationError' || error?.name === 'CastError') return { status: 400, message: error.message }
  return { status: 500, message: error?.message || 'Server error' }
}
