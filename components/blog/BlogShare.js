'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
import { SITE_URL } from './utils'

const noop = () => () => {}
// false on the server and during hydration, real value after mount: no hydration mismatch.
const useCanNativeShare = () =>
  useSyncExternalStore(noop, () => typeof navigator.share === 'function', () => false)

export default function BlogShare({ title, slug }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  const canNativeShare = useCanNativeShare()
  const url = `${SITE_URL}/blogs/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title || 'Article')

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard API blocked (insecure context / permissions): fall back to a temporary textarea.
      const t = document.createElement('textarea')
      t.value = url
      t.setAttribute('readonly', '')
      t.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(t)
      t.select()
      try { document.execCommand('copy') } catch {}
      t.remove()
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  async function nativeShare() {
    try {
      await navigator.share({ title: title || 'Surya Prakash | Writing', text: `Read "${title}" by Surya Prakash`, url })
    } catch (err) {
      if (err?.name !== 'AbortError') copy()
    }
  }

  return (
    <span className="pb-share">
      {canNativeShare && (
        <button type="button" onClick={nativeShare} aria-label="Share article" title="Share" className="pb-share-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </button>
      )}

      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out "${title}": `)}${encodedUrl}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
        className="pb-share-btn"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </a>

      <a
        href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on X"
        title="Share on X"
        className="pb-share-btn"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h4.6L20 20h-4.6z" />
          <path d="M19.6 4l-6.4 7.3M4.4 20l6.4-7.3" />
        </svg>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        className="pb-share-btn"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6V16" />
        </svg>
      </a>

      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        title={copied ? 'Copied!' : 'Copy link'}
        className="pb-share-btn"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--green)' }} aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
          </svg>
        )}
      </button>
      <span className="pb-sr" role="status" aria-live="polite">{copied ? 'Link copied' : ''}</span>
    </span>
  )
}
