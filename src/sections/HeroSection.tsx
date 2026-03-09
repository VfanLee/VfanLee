'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { motion } from 'framer-motion'

const ParticleCanvas = dynamic(() => import('@/components/three/ParticleCanvas').then((m) => m.ParticleCanvas), {
  ssr: false,
})

export function HeroSection() {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedRef.current) return
    const typed = new Typed(typedRef.current, {
      strings: ['Web 开发工程师', '前端工程师', '开源热爱者'],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1800,
      loop: true,
      cursorChar: '|',
    })
    return () => typed.destroy()
  }, [])

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id) as HTMLElement
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el)
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* Subtle radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--background)_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-sm font-medium tracking-widest text-[--accent-portfolio] uppercase"
        >
          Hello World 👋
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-foreground mb-4 text-5xl font-bold tracking-tight sm:text-7xl"
        >
          I&apos;m <span className="text-[--accent-portfolio]">Vfan Lee</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-muted-foreground mb-8 text-xl sm:text-2xl"
        >
          <span ref={typedRef} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-muted-foreground mx-auto mb-24 max-w-xl text-base"
        >
          我使用现代技术栈打造快速、无障碍视觉体验出色的 Web 应用，兼具极致的细节把控。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            onClick={() => handleScrollTo('#projects')}
            className="bg-accent-portfolio hover:bg-accent-portfolio/90 cursor-pointer rounded-full px-8 py-3 text-sm font-semibold text-white shadow-[0_0_24px_var(--accent-portfolio)] transition-all active:scale-95"
          >
            查看项目
          </button>
          <button
            onClick={() => handleScrollTo('#contact')}
            className="border-border text-foreground hover:border-accent-portfolio hover:text-accent-portfolio bg-background/50 cursor-pointer rounded-full border px-8 py-3 text-sm font-semibold backdrop-blur-sm transition-all active:scale-95"
          >
            联系我
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-18 left-1/2 -translate-x-1/2"
        >
          <div className="border-border flex h-10 w-6 items-start justify-center rounded-full border p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="bg-muted-foreground h-2 w-1 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
