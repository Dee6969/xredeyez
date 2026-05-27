import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import './jack.css'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jack — 3D Creator',
}

export default function JackLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`body { background: #0C0C0C !important; overflow-x: clip; }`}</style>
      <div className={`jack-root ${kanit.className}`} style={{ background: '#0C0C0C', overflowX: 'clip' }}>
        {children}
      </div>
    </>
  )
}
