'use client'

import { useEffect } from 'react'

// Counts one view per post per tab session without making the (ISR-cached) page dynamic.
export default function ViewBeacon({ id }) {
  useEffect(() => {
    if (!id) return
    const key = `pb_viewed_${id}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, '1')
    } catch {}
    const url = `/api/blogs/${id}/view`
    try {
      if (navigator.sendBeacon?.(url)) return
    } catch {}
    fetch(url, { method: 'POST', keepalive: true }).catch(() => {})
  }, [id])
  return null
}
