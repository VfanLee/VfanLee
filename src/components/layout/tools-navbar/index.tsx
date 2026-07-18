'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui'

type ToolsNavbarProps = {
  onMenuClick: () => void
}

export function ToolsNavbar({ onMenuClick }: ToolsNavbarProps) {
  return (
    <header className="border-sidebar-border bg-sidebar flex h-16 shrink-0 items-center justify-between border-b px-5 sm:h-[4.5rem] sm:px-6">
      <Link href="/tools" className="text-foreground text-base font-semibold tracking-tight">
        开发工具箱
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-10 md:hidden"
        onClick={onMenuClick}
        aria-label="打开工具导航"
      >
        <Menu />
      </Button>
    </header>
  )
}
