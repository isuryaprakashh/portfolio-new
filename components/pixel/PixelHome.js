'use client'

import { useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import MARKUP from './markup'
import initPixel from './initPixel'

// MARKUP is an HTML string, so its links are plain <a> tags. Clicks on internal ones are routed
// through the Next router: leaving home and coming back is then a client-side navigation that
// keeps the JS, the built scenes and the fetched posts in memory, instead of a full reload.
function internalPath(a) {
  if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return null
  const href = a.getAttribute('href')
  if (!href || href.startsWith('#')) return null
  let url
  try { url = new URL(a.href) } catch { return null }
  if (url.origin !== location.origin) return null // external, mailto:, tel:, javascript:
  if (url.pathname === location.pathname && url.search === location.search) return null // hash link on this page
  if (/\.[a-z0-9]+$/i.test(url.pathname)) return null // static files such as a PDF
  return url.pathname + url.search + url.hash
}

const linkFrom = (e, root) => {
  const a = e.target instanceof Element ? e.target.closest('a[href]') : null
  return a && root.contains(a) ? a : null
}

export default function PixelHome() {
  const ref = useRef(null)
  const router = useRouter()

  // A layout effect runs before the browser paints, both right after hydration and when you
  // navigate back here client-side, so both canvases are drawn in the very first frame.
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    // initPixel mutates its DOM (role text, posts, classes, canvas sizes, ...). React doesn't
    // re-apply dangerouslySetInnerHTML when an effect re-runs on the same element (StrictMode's
    // double effects, Fast Refresh), so start every re-run from pristine markup.
    if (root.hasAttribute('data-px-ready')) root.innerHTML = MARKUP
    root.setAttribute('data-px-ready', '')
    const stop = initPixel(root)

    const ac = new AbortController()
    const { signal } = ac
    const prefetched = new Set()
    const prefetch = (path) => {
      if (prefetched.has(path)) return
      prefetched.add(path)
      router.prefetch(path)
    }

    root.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const path = internalPath(linkFrom(e, root))
      if (!path) return
      e.preventDefault()
      router.push(path)
    }, { signal })

    // warm a route as soon as the visitor shows intent (hover, touch, keyboard focus)
    const warm = (e) => {
      const path = internalPath(linkFrom(e, root))
      if (path) prefetch(path)
    }
    root.addEventListener('pointerover', warm, { signal, passive: true })
    root.addEventListener('touchstart', warm, { signal, passive: true })
    root.addEventListener('focusin', warm, { signal })

    // the blog is the most likely next stop
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => prefetch('/blogs'), { timeout: 3000 })
      : window.setTimeout(() => prefetch('/blogs'), 1500)

    return () => {
      ac.abort()
      if (window.requestIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      stop()
    }
  }, [router])

  return <div ref={ref} className="px" dangerouslySetInnerHTML={{ __html: MARKUP }} suppressHydrationWarning />
}
