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

  return (
    <div className="border-border hover:border-foreground/20 group bg-card hover:bg-muted/60 relative flex min-h-28 rounded-lg border p-4 transition-colors">
      <Link href={tool.href} className="flex min-w-0 flex-1 flex-col gap-3 pr-11">
        <div className="flex min-w-0 items-center">
          <p className="text-foreground truncate text-base leading-snug font-semibold">{tool.title}</p>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-6">{tool.desc}</p>
        <ArrowUpRight className="text-muted-foreground/70 group-hover:text-foreground absolute top-5 right-13 size-4 transition-colors" />
      </Link>
      <button
        type="button"
        onClick={() => toggleFavorite(tool.href)}
        className="text-muted-foreground hover:text-foreground absolute top-3 right-3 rounded-md p-1 transition-colors"
        aria-label={favorited ? `取消收藏 ${tool.title}` : `收藏 ${tool.title}`}
        title={favorited ? '取消收藏' : '收藏'}
      >
        <Star className={`size-5 ${favorited ? 'text-foreground fill-current' : ''}`} />
      </button>
    </div>
  )
}
