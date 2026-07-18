'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui'
import { copyToClipboard } from '@/utils'

type CssCodeOutputProps = {
  code: string
}

export function CssCodeOutput({ code }: CssCodeOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const succeeded = await copyToClipboard(code)

    if (succeeded) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <section className="border-border bg-card overflow-hidden rounded-lg border">
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-foreground text-sm font-medium">CSS</h2>
        <Button type="button" variant="ghost" size="sm" onClick={handleCopy} className="text-muted-foreground">
          {copied ? <Check /> : <Copy />}
          {copied ? '已复制' : '复制 CSS'}
        </Button>
      </div>
      <pre className="text-foreground overflow-x-auto px-4 py-4 font-mono text-xs leading-6 whitespace-pre-wrap">
        {code}
      </pre>
    </section>
  )
}
