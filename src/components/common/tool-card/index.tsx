'use client'

import Link from 'next/link'
import { ArrowUpRight, Star } from 'lucide-react'
import type { ToolItem } from '@/data/tools'
import { useFavoritesStore } from '@/store/useFavoritesStore'

type ToolCardProps = {
  tool: ToolItem
}

export function ToolCard({ tool }: ToolCardProps) {
  const favorites = useFavoritesStore((s) => s.favorites)
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)
  const favorited = favorites.includes(tool.href)
  const Icon = tool.icon

  return (
    <div className="border-border hover:border-foreground/30 group bg-card hover:bg-muted/50 relative flex min-h-23 items-start rounded-lg border px-4 py-4 transition-colors">
      <Link href={tool.href} className="flex min-w-0 flex-1 items-start gap-3 pr-8">
        <Icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-foreground text-sm leading-snug font-medium">{tool.title}</p>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-5">{tool.desc}</p>
        </div>
        <ArrowUpRight className="text-muted-foreground/40 group-hover:text-muted-foreground mt-0.5 size-3.5 shrink-0 transition-colors" />
      </Link>
      <button
        type="button"
        onClick={() => toggleFavorite(tool.href)}
        className="text-muted-foreground hover:text-foreground absolute top-3 right-3 rounded-md p-1 transition-colors"
        aria-label={favorited ? `取消收藏 ${tool.title}` : `收藏 ${tool.title}`}
        title={favorited ? '取消收藏' : '收藏'}
      >
        <Star className={`size-3.5 ${favorited ? 'text-foreground fill-current' : ''}`} />
      </button>
    </div>
  )
}
