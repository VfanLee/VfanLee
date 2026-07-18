'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Star } from 'lucide-react'
import { toolGroups } from '@/data/tools'
import { cn } from '@/utils/ui'

type ToolsNavigationProps = {
  onNavigate?: () => void
}

function NavigationLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  href: string
  label: string
  icon: typeof House
  active: boolean
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'flex h-9 items-center gap-2.5 rounded-lg px-3 text-sm transition-colors',
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
          : 'text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  )
}

export function ToolsNavigation({ onNavigate }: ToolsNavigationProps) {
  const pathname = usePathname()

  return (
    <nav
      data-lenis-prevent
      className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-3 py-4"
      aria-label="工具导航"
    >
      <div className="space-y-1">
        <NavigationLink
          href="/tools"
          label="首页"
          icon={House}
          active={pathname === '/tools'}
          onNavigate={onNavigate}
        />
        <NavigationLink
          href="/tools/favorites"
          label="我的收藏"
          icon={Star}
          active={pathname === '/tools/favorites'}
          onNavigate={onNavigate}
        />
      </div>

      <div className="bg-sidebar-border my-4 h-px shrink-0" />

      <div className="space-y-5">
        {toolGroups.map((group) => (
          <section key={group.name}>
            <p className="text-sidebar-foreground/55 mb-1.5 px-3 text-xs font-medium">{group.name}</p>
            <div className="space-y-1">
              {group.tools.map((tool) => (
                <NavigationLink
                  key={tool.href}
                  href={tool.href}
                  label={tool.title}
                  icon={tool.icon}
                  active={pathname === tool.href}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </nav>
  )
}

export function ToolsSidebar() {
  return (
    <aside className="border-border/60 bg-sidebar hidden h-full w-64 shrink-0 flex-col border-r md:flex">
      <ToolsNavigation />
    </aside>
  )
}
