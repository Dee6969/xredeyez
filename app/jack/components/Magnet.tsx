'use client'
import { useRef, useEffect, type ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isActive = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      const cx = left + width / 2
      const cy = top + height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      if (Math.abs(dx) < width / 2 + padding && Math.abs(dy) < height / 2 + padding) {
        if (!isActive.current) {
          isActive.current = true
          el.style.transition = activeTransition
        }
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`
      } else if (isActive.current) {
        isActive.current = false
        el.style.transition = inactiveTransition
        el.style.transform = 'translate3d(0, 0, 0)'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [padding, strength, activeTransition, inactiveTransition])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
