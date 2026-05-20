'use client'

import { useEffect, useRef } from 'react'

export default function CursorFollower() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        ringRef.current?.classList.add('hovering')
      } else {
        ringRef.current?.classList.remove('hovering')
      }
    }

    let raf
    const animate = () => {
      // Dot follows exactly immediately
      dotPos.current.x = mouse.current.x
      dotPos.current.y = mouse.current.y

      // Ring trails behind
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.25
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.25

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`
      }
      if (ringRef.current) {
        const size = ringRef.current.classList.contains('hovering') ? 28 : 18
        ringRef.current.style.transform = `translate(${ringPos.current.x - size}px, ${ringPos.current.y - size}px)`
      }

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
