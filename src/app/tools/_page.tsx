'use client'

import { Wrench } from 'lucide-react'
import { ToolCard } from '@/components'
import { toolGroups } from '@/data/tools'

export default function ToolsPage() {
  const toolCount = toolGroups.reduce((count, group) => count + group.tools.length, 0)

  return (
    <div className="mx-auto w-full max-w-[100rem] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="border-border mb-10 flex items-end justify-between border-b pb-5">
        <div>
          <div className="text-muted-foreground mb-3 flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase">
            <Wrench className="size-3.5" /> Toolbox
          </div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight">开发工具箱</h1>
          <p className="text-muted-foreground mt-2 text-sm">常用编码、转换与开发辅助工具</p>
        </div>
        <p className="text-muted-foreground hidden font-mono text-xs lg:block">{toolCount} tools available</p>
      </div>

      <div className="grid gap-x-10 gap-y-9 xl:grid-cols-2">
        {toolGroups.map((group) => (
          <section key={group.name}>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-foreground text-sm font-semibold">{group.name}</h2>
              <span className="text-muted-foreground text-xs">{group.description}</span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {group.tools.map((tool) => (
                <ToolCard key={tool.href} tool={tool} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
