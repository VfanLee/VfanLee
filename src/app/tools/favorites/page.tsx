'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { ToolCard } from '@/components'
import { getToolByHref } from '@/data/tools'
import { useFavoritesStore } from '@/store/useFavoritesStore'

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  const favoriteTools = hydrated
    ? favorites.map((href) => getToolByHref(href)).filter((tool): tool is NonNullable<typeof tool> => Boolean(tool))
    : []

  return (
    <div className="mx-auto w-full max-w-[100rem] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="border-border mb-10 border-b pb-5">
        <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase">
          <Star className="size-3.5" /> Favorites
        </div>
        <h1 className="text-foreground text-3xl font-bold tracking-tight">收藏</h1>
        <p className="text-muted-foreground mt-2 text-sm">本地缓存的常用工具快捷入口</p>
      </div>

      {!hydrated ? null : favoriteTools.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-start gap-3 text-sm">
          <p>暂无收藏。可在工具卡片上点击星标加入。</p>
          <Link href="/tools" className="text-foreground underline-offset-4 hover:underline">
            返回首页浏览工具
          </Link>
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {favoriteTools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
