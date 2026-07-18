'use client'

import { useState } from 'react'
import { ToolsNavbar } from '@/components/layout/tools-navbar'
import { ToolsNavigation, ToolsSidebar } from '@/components/layout/tools-sidebar'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui'

export function ToolsShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)

  return (
    <div className="tools-theme dark bg-background text-foreground flex h-dvh flex-col overflow-hidden">
      <ToolsNavbar onMenuClick={() => setMobileNavigationOpen(true)} />
      <div className="flex min-h-0 flex-1">
        <ToolsSidebar />
        <main data-lenis-prevent className="min-w-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth">
          {children}
        </main>
      </div>

      <Sheet open={mobileNavigationOpen} onOpenChange={setMobileNavigationOpen}>
        <SheetContent
          side="left"
          className="tools-theme dark bg-sidebar w-72 p-0"
          aria-describedby="tools-navigation-description"
        >
          <SheetHeader className="border-sidebar-border border-b px-5 py-4 text-left">
            <SheetTitle>开发工具箱</SheetTitle>
            <SheetDescription id="tools-navigation-description">选择一个工具开始使用</SheetDescription>
          </SheetHeader>
          <ToolsNavigation onNavigate={() => setMobileNavigationOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
