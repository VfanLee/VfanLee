'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui'

type ToolsNavbarProps = {
  onMenuClick: () => void
}

export function ToolsNavbar({ onMenuClick }: ToolsNavbarProps) {
  return (
    <header className="border-border/60 bg-background flex h-14 shrink-0 items-center justify-between border-b px-4 sm:px-5">
      <Link href="/tools" className="text-foreground text-sm font-semibold tracking-tight">
        开发工具箱
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onMenuClick}
        aria-label="打开工具导航"
      >
        <Menu />
      </Button>
    </header>
  )
}
