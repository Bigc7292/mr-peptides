import { useEffect, useRef, useState, useCallback } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Lenis from 'lenis'
import './index.css'

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const raf = useRef(null)

  const handleMove = useCallback((e) => {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      setPos({ x: e.clientX, y: e.clientY })
    })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [handleMove])

  useEffect(() => {
    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)
    const selectors = 'a, button, input, textarea, select, [role="button"]'
    document.querySelectorAll(selectors).forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => {
      document.querySelectorAll(selectors).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference will-change-transform"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      />
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference will-change-transform transition-[width,height,border-radius] duration-300"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${hovered ? 1.6 : 1})`,
          width: hovered ? 64 : 40,
          height: hovered ? 64 : 40,
          borderRadius: '9999px',
        }}
      />
    </>
  )
}

function SmoothScroll({ children }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div ref={containerRef} className="cursor-none">
      {children}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SmoothScroll>
      <CustomCursor />
      <App />
    </SmoothScroll>
  </React.StrictMode>
)
