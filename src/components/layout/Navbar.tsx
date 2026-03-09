'use client'

import { navLinks } from '@/data'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const isProgrammaticScroll = useRef(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
    if (!isProgrammaticScroll.current) {
      setHidden(latest > lastY && latest > 80)
    } else {
      setHidden(false)
    }
    setLastY(latest)
  })

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      const targetId = href.replace('/#', '#')
      const el = document.querySelector(targetId) as HTMLElement
      if (el) {
        if (window.lenis) {
          isProgrammaticScroll.current = true
          window.lenis.scrollTo(el, {
            onComplete: () => {
              setTimeout(() => {
                isProgrammaticScroll.current = false
              }, 50)
            },
          })
        } else {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-border bg-background/80 border-b backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/"
            className="text-foreground text-lg font-bold tracking-tight"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault()
                if (window.lenis) {
                  isProgrammaticScroll.current = true
                  window.lenis.scrollTo(0, {
                    onComplete: () => {
                      setTimeout(() => {
                        isProgrammaticScroll.current = false
                      }, 50)
                    },
                  })
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }
            }}
          >
            Vfan Lee
          </Link>
        </motion.div>

        {/* Links */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </motion.ul>

        {/* Right side */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <ThemeToggle />
        </motion.div>
      </nav>
    </motion.header>
  )
}
