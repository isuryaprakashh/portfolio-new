'use client'

import { useRef, useState } from 'react'

// Tiny copy button for server-rendered code blocks. Reads the text from the DOM, so the code isn't
// duplicated into the RSC payload as a prop.
export default function CopyCode() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  async function copy(e) {
    const text = e.currentTarget.closest('.pb-code')?.querySelector('code')?.innerText ?? ''
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button type="button" className="pb-copy" onClick={copy} aria-label={copied ? 'Copied' : 'Copy code'}>
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
