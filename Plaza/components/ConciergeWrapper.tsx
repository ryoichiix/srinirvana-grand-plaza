'use client'
import dynamic from 'next/dynamic'

const FloatingConcierge = dynamic(() => import('./FloatingConcierge'), { ssr: false })

export default function ConciergeWrapper() {
  return <FloatingConcierge />
}
