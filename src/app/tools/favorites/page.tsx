'use client'

import Link from 'next/link'
import { Search, Star, X } from 'lucide-react'
import { useMemo, useState, useSyncExternalStore } from 'react'
import { ToolCard } from '@/components'
import { Button, Input } from '@/components/ui'
import { toolGroups, type ToolGroup, type ToolItem } from '@/data/tools'
import { useFavoritesStore } from '@/store/useFavoritesStore'

function matchesSearch(group: ToolGroup, tool: ToolItem, query: string) {
  return [group.name, group.description, tool.title, tool.desc].some((value) =>
    value.toLocaleLowerCase().includes(query),
  )
}

function useFavoritesHydrated() {
  return useSyncExternalStore(
    (onStoreChange) => useFavoritesStore.persist.onFinishHydration(onStoreChange),
    () => useFavoritesStore.persist.hasHydrated(),
    () => false,
  )
}

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const hydrated = useFavoritesHydrated()
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const favoriteTools = useMemo(
    () =>
      toolGroups
        .flatMap((group) => group.tools.map((tool) => ({ group, tool })))
        .filter(({ group, tool }) => favorites.includes(tool.href) && matchesSearch(group, tool, normalizedQuery))
        .map(({ tool }) => tool),
    [favorites, normalizedQuery],
  )

  return (
    <div className="mx-auto w-full max-w-[120rem] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
      <div className="bg-background/95 sticky top-0 z-10 -mx-4 border-b px-4 pt-1 pb-5 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <label className="sr-only" htmlFor="favorite-tool-search">
          搜索收藏工具
        </label>
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
          <Input
            id="favorite-tool-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索收藏的工具、分类或功能"
            className="border-border bg-card h-11 pr-10 pl-10 shadow-sm"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute top-1/2 right-1 -translate-y-1/2"
              onClick={() => setQuery('')}
              aria-label="清空搜索"
            >
              <X />
            </Button>
          )}
        </div>
      </div>

      {!hydrated ? null : favoriteTools.length > 0 ? (
        <div className="grid gap-3 pt-7 sm:grid-cols-2 lg:grid-cols-4">
          {favoriteTools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-72 flex-col items-center justify-center text-center">
          <Star className="text-muted-foreground/70 mb-3 size-5" />
          <p className="text-foreground text-sm font-medium">{query ? '未找到匹配的收藏工具' : '暂无收藏工具'}</p>
          <p className="text-muted-foreground mt-1 text-sm">
            {query ? '换个关键词，或清空搜索后查看全部收藏。' : '可在工具卡片上点击星标加入收藏。'}
          </p>
          {!query && (
            <Link href="/tools" className="text-foreground mt-4 text-sm underline-offset-4 hover:underline">
              返回首页浏览工具
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
