// Shared by server and client blog code. Keep this file free of server-only imports.

export const SITE_URL = 'https://www.suryaprakash.me'

export function readTime(text) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

export function slugify(s) {
  return String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function absoluteUrl(path) {
  if (!path) return ''
  return /^https?:\/\//i.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}
