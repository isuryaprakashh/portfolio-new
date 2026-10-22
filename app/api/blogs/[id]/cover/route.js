import { NextResponse } from 'next/server'
import { getCover, parseDataUrl } from '@/lib/blogs'

const YEAR = 'public, max-age=31536000, s-maxage=31536000, immutable'
const SHORT = 'public, max-age=300, s-maxage=3600'

function notFound() {
  return new Response(null, { status: 404, headers: { 'Cache-Control': 'public, max-age=60' } })
}

// Serves a post's cover. Base64 covers stored in Mongo are decoded to real image bytes so they can be
// cached by browsers/CDNs (URLs carry ?v=<updatedAt>, so a matching version is immutable).
// URL covers redirect to the original. No cover → 404.
export async function GET(request, { params }) {
  const { id } = await params
  let doc
  try {
    doc = await getCover(id)
  } catch {
    return new Response(null, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
  const cover = doc?.coverImage || ''
  if (!cover) return notFound()

  if (/^https?:\/\//i.test(cover) || cover.startsWith('/')) {
    if (cover.startsWith('/api/')) return notFound()
    const res = NextResponse.redirect(new URL(cover, request.url), 307)
    res.headers.set('Cache-Control', SHORT)
    return res
  }

  const img = parseDataUrl(cover)
  if (!img) return notFound()

  const version = String(doc.updatedAt ? new Date(doc.updatedAt).getTime() : 0)
  const etag = `"${id}-${version}"`
  const cacheControl = new URL(request.url).searchParams.get('v') === version ? YEAR : SHORT
  if (request.headers.get('if-none-match') === etag) {
    return new Response(null, { status: 304, headers: { ETag: etag, 'Cache-Control': cacheControl } })
  }

  const headers = {
    'Content-Type': img.mime,
    'Content-Length': String(img.bytes.length),
    'Cache-Control': cacheControl,
    ETag: etag,
    'X-Content-Type-Options': 'nosniff',
  }
  if (img.mime === 'image/svg+xml') headers['Content-Security-Policy'] = "default-src 'none'; style-src 'unsafe-inline'; sandbox"
  return new Response(img.bytes, { headers })
}
