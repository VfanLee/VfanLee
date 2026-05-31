'use client'

import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function ToolsNavbar() {
  return (
    <header className="border-border/60 bg-background flex h-12 shrink-0 items-center justify-between border-b px-4">
      <div className="flex items-center gap-3">
        <span className="text-foreground text-sm font-medium">开发者工具</span>
      </div>
      <ThemeToggle />
    </header>
  )
}
