'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn, copyToClipboard } from '@/utils'

type CssCodeOutputProps = {
  code: string
  className?: string
  codeClassName?: string
}

export function CssCodeOutput({ code, className, codeClassName }: CssCodeOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const succeeded = await copyToClipboard(code)

    if (succeeded) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <section className={cn('border-border bg-card flex h-full flex-col overflow-hidden rounded-lg border', className)}>
      <div className="border-border flex shrink-0 items-center justify-between border-b px-4 py-3">
        <h2 className="text-foreground text-sm font-medium">CSS</h2>
        <Button type="button" variant="ghost" size="sm" onClick={handleCopy} className="text-muted-foreground">
          {copied ? <Check /> : <Copy />}
          {copied ? '已复制' : '复制'}
        </Button>
      </div>
      <pre
        className={cn(
          'text-foreground min-h-0 flex-1 overflow-x-auto px-4 py-4 font-mono text-xs leading-6 whitespace-pre-wrap',
          codeClassName,
        )}
      >
        {code}
      </pre>
    </section>
  )
}
