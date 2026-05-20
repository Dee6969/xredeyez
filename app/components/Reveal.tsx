'use client'
import React, { useEffect, useRef, type ReactNode } from 'react'

export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: keyof React.JSX.IntrinsicElements
}) {
  const ref = useRef<HTMLElement>(null)

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
        { threshold: 0.07, rootMargin: '0px 0px -32px 0px' }
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
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`site-reveal ${className}`}>
      {children}
    </Tag>
  )
}
