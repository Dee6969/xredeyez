'use client'
import { useEffect, useRef, type ReactNode } from 'react'

export default function VenueReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            obs.disconnect()
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )
      obs.observe(el)
      return () => obs.disconnect()
    }

    if (delay > 0) {
      const t = setTimeout(run, delay)
      return () => clearTimeout(t)
    }
    return run()
  }, [delay])

  return (
    <div ref={ref} className={`vlp-reveal ${className}`}>
      {children}
    </div>
  )
}
