'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components'

export function ToolsNavbar() {
  return (
    <header className="border-border/60 bg-background flex h-12 shrink-0 items-center justify-between border-b px-4">
      <Link href="/tools" className="text-foreground text-sm font-medium">
        开发工具箱
      </Link>
      <ThemeToggle />
    </header>
  )
}
