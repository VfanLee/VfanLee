'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export function ContactSection() {
  return (
    <section id="contact" className="flex min-h-screen flex-col justify-center py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-foreground mb-6 text-4xl font-bold tracking-tight">联系我</h2>

          <div className="my-4">
            <p className="text-muted-foreground mx-auto max-w-lg text-lg">
              我随时乐于讨论新项目、创新想法或者合作机会。
            </p>
            <p className="text-muted-foreground mx-auto max-w-lg text-lg">
              无论您有任何问题，或者仅仅是想打个招呼 — 我的邮箱随时为您敞开！
            </p>
          </div>
          <motion.a
            href="mailto:fanfanfafafa@gmail.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-card inline-flex items-center gap-3 rounded-full border border-[--accent-portfolio]/40 px-8 py-4 text-lg font-semibold text-[--accent-portfolio] shadow-[0_0_20px_oklch(0.6_0.18_265/0.15)] transition-all hover:bg-[--accent-portfolio]/10"
          >
            <Mail className="h-5 w-5" />
            fanfanfafafa@gmail.com
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
