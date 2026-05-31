import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tools | Vfan Lee',
  description: '实用在线工具集合 — 编码/解码、加密等开发者工具。',
}

import { toolGroups } from '@/data/tools'

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-foreground mb-1.5 text-2xl font-semibold tracking-tight">在线工具</h1>
        <p className="text-muted-foreground text-sm">常用开发工具，快速完成编码、转换等操作</p>
      </div>

      {/* Tool groups */}
      <div className="space-y-8">
        {toolGroups.map((group) => (
          <section key={group.name}>
            {/* Group header */}
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-foreground text-sm font-semibold">{group.name}</h2>
              <span className="text-muted-foreground/50 text-xs">{group.description}</span>
            </div>

            {/* Tool cards */}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="border-border/60 hover:border-border group hover:bg-foreground/[0.03] flex items-start justify-between rounded-lg border bg-transparent px-4 py-3 transition-all"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm leading-snug font-medium">{tool.title}</p>
                    <p className="text-muted-foreground mt-0.5 truncate text-xs">{tool.desc}</p>
                  </div>
                  <ArrowUpRight className="text-muted-foreground/40 group-hover:text-muted-foreground mt-0.5 ml-2 size-3.5 shrink-0 transition-colors" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
