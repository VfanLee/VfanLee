'use client'

import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ToolCard } from '@/components'
import { Button, Input } from '@/components/ui'
import { toolGroups, type ToolGroup, type ToolItem } from '@/data/tools'

function matchesSearch(group: ToolGroup, tool: ToolItem, query: string) {
  return [group.name, group.description, tool.title, tool.desc].some((value) =>
    value.toLocaleLowerCase().includes(query),
  )
}

export default function ToolsPage() {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const filteredGroups = useMemo(
    () =>
      toolGroups
        .map((group) => ({
          ...group,
          tools: group.tools.filter((tool) => matchesSearch(group, tool, normalizedQuery)),
        }))
        .filter((group) => group.tools.length > 0),
    [normalizedQuery],
  )

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-background/95 sticky top-0 z-10 -mx-4 flex h-24 items-center border-b px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <label className="sr-only" htmlFor="tool-search">
          搜索工具
        </label>
        <div className="relative w-full">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
          <Input
            id="tool-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索工具、分类或功能"
            className="border-border bg-card h-11 rounded-lg pr-10 pl-10 shadow-none"
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

      {filteredGroups.length > 0 ? (
        <div className="space-y-9 pt-7">
          {filteredGroups.map((group) => (
            <section key={group.name}>
              <div className="mb-4">
                <h2 className="text-foreground text-lg font-semibold tracking-tight">{group.name}</h2>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-3">
                {group.tools.map((tool) => (
                  <ToolCard key={tool.href} tool={tool} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="flex min-h-72 flex-col items-center justify-center text-center">
          <Search className="text-muted-foreground/70 mb-3 size-5" />
          <p className="text-foreground text-sm font-medium">未找到匹配的工具</p>
          <p className="text-muted-foreground mt-1 text-sm">换个关键词，或清空搜索后查看全部工具。</p>
        </div>
      )}
    </div>
  )
}
