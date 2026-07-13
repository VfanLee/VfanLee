'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'

declare global {
  interface Window {
    vfanLenis: Lenis | undefined
  }
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    window.vfanLenis = lenis

    // Hook Lenis into GSAP's RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      window.vfanLenis = undefined
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
