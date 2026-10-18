'use client'

import { useEffect, useRef } from 'react'
import MARKUP from './markup'
import initPixel from './initPixel'

export default function PixelHome() {
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true
    const stop = initPixel()
    return () => {
      started.current = false
      if (typeof stop === 'function') stop()
    }
  }, [])

  return <div className="px" dangerouslySetInnerHTML={{ __html: MARKUP }} suppressHydrationWarning />
}
