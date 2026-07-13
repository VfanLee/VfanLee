'use client'

import { motion } from 'framer-motion'
import { ArrowDownRight, GitBranch } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] overflow-hidden px-5 pt-24 pb-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-border text-muted-foreground flex items-center justify-between border-y py-3 text-[0.65rem] font-medium tracking-[0.16em] uppercase"
        >
          <span>Portfolio / 2026</span>
          <span>Based on the web</span>
        </motion.div>

        <div className="py-12 sm:py-16 lg:py-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-muted-foreground mb-5 text-sm font-medium"
          >
            前端工程师 · Web Builder
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="text-foreground -ml-1 text-[clamp(4.5rem,22vw,15rem)] leading-[0.78] font-black tracking-[-0.09em]"
          >
            VFAN
            <br />
            LEE<span className="text-muted-foreground">.</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="border-border grid gap-8 border-t pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
        >
          <p className="text-muted-foreground max-w-md text-base leading-7 sm:text-lg">
            构建快速、清晰并经得起使用的 Web 体验。专注于产品界面、工程细节与恰到好处的交互。
          </p>
          <div className="flex sm:justify-end">
            <a
              href="https://github.com/VfanLee"
              target="_blank"
              rel="noreferrer"
              className="border-border text-muted-foreground hover:border-foreground hover:text-foreground flex items-center gap-2 border px-4 py-3 text-sm transition-colors"
            >
              <GitBranch className="size-4" /> 访问 GitHub
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="border-border text-foreground hover:bg-foreground hover:text-background absolute right-5 bottom-7 flex size-10 items-center justify-center rounded-full border transition-colors sm:right-8 lg:right-12"
        aria-label="查看简介"
      >
        <ArrowDownRight className="size-4" />
      </motion.a>
    </section>
  )
}
