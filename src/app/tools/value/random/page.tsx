'use client'

import React, { useState } from 'react'
import { copyToClipboard } from '@/utils'
import { Button } from '@/components/ui'
import { Copy } from 'lucide-react'

function CopyButton({ text, disabled }: { text: string; disabled?: boolean }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    if (!text) return
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      disabled={disabled || !text}
      className="text-muted-foreground hover:text-foreground px-2"
    >
      {copied ? <span className="text-xs">✓</span> : <Copy className="size-3.5" />}
    </Button>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground w-16 shrink-0 text-xs">{label}</span>
      <div className="border-border/50 bg-muted/20 flex flex-1 items-center justify-between rounded-md border px-3 py-1.5">
        <span className="font-mono text-sm">{value || '—'}</span>
        <CopyButton text={value} disabled={!value} />
      </div>
    </div>
  )
}

export default function RandomValuePage() {
  // UUID
  const [uuid, setUuid] = useState('')
  const handleGenerateUuid = () => setUuid(crypto.randomUUID())

  // Timestamp
  const [timestampMs, setTimestampMs] = useState<number>(0)
  const handleGenerateTimestamp = () => setTimestampMs(Date.now())

  // Random Number
  const [minNum, setMinNum] = useState<string>('1')
  const [maxNum, setMaxNum] = useState<string>('100')
  const [randomNum, setRandomNum] = useState<number | null>(null)
  const handleGenerateRandomNumber = () => {
    const min = parseInt(minNum)
    const max = parseInt(maxNum)
    if (isNaN(min) || isNaN(max) || min > max) return
    setRandomNum(Math.floor(Math.random() * (max - min + 1)) + min)
  }

  // Colors
  const [rgbColor, setRgbColor] = useState('')
  const [hexColor, setHexColor] = useState('')
  const handleGenerateColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    setRgbColor(`rgb(${r}, ${g}, ${b})`)
    const toHex = (n: number) => n.toString(16).padStart(2, '0')
    setHexColor(`#${toHex(r)}${toHex(g)}${toHex(b)}`)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-foreground mb-1 text-xl font-semibold">随机数</h1>
        <p className="text-muted-foreground text-sm">生成随机 UUID、时间戳、数字和颜色</p>
      </div>

      <div className="space-y-8">
        {/* UUID */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-foreground text-sm font-medium">UUID</h2>
            <Button variant="secondary" size="sm" onClick={handleGenerateUuid}>
              生成
            </Button>
          </div>
          <ResultRow label="UUID v4" value={uuid} />
        </section>

        <div className="border-border/40 border-t" />

        {/* Timestamp */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-foreground text-sm font-medium">时间戳</h2>
            <Button variant="secondary" size="sm" onClick={handleGenerateTimestamp}>
              获取当前时间
            </Button>
          </div>
          <div className="space-y-2">
            <ResultRow label="毫秒 (ms)" value={timestampMs ? String(timestampMs) : ''} />
            <ResultRow label="秒 (s)" value={timestampMs ? String(Math.floor(timestampMs / 1000)) : ''} />
          </div>
        </section>

        <div className="border-border/40 border-t" />

        {/* Random Number */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-foreground text-sm font-medium">随机数字</h2>
            <Button variant="secondary" size="sm" onClick={handleGenerateRandomNumber}>
              生成
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-1 items-center gap-2">
                <label className="text-muted-foreground text-xs">最小值</label>
                <input
                  type="number"
                  className="border-border/60 bg-background focus:border-border w-full rounded-md border px-2.5 py-1.5 font-mono text-sm outline-none"
                  value={minNum}
                  onChange={(e) => setMinNum(e.target.value)}
                />
              </div>
              <span className="text-muted-foreground text-xs">—</span>
              <div className="flex flex-1 items-center gap-2">
                <label className="text-muted-foreground text-xs">最大值</label>
                <input
                  type="number"
                  className="border-border/60 bg-background focus:border-border w-full rounded-md border px-2.5 py-1.5 font-mono text-sm outline-none"
                  value={maxNum}
                  onChange={(e) => setMaxNum(e.target.value)}
                />
              </div>
            </div>
            <ResultRow label="结果" value={randomNum !== null ? String(randomNum) : ''} />
          </div>
        </section>

        <div className="border-border/40 border-t" />

        {/* Random Color */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-foreground text-sm font-medium">随机颜色</h2>
            <Button variant="secondary" size="sm" onClick={handleGenerateColor}>
              生成
            </Button>
          </div>
          <div className="space-y-3">
            {/* Color preview swatch */}
            <div
              className="border-border/40 h-16 w-full rounded-lg border transition-colors duration-300"
              style={{ backgroundColor: hexColor || 'transparent' }}
            >
              {!hexColor && (
                <div className="flex h-full items-center justify-center">
                  <span className="text-muted-foreground/40 text-xs">颜色预览</span>
                </div>
              )}
            </div>
            <ResultRow label="HEX" value={hexColor} />
            <ResultRow label="RGB" value={rgbColor} />
          </div>
        </section>
      </div>
    </div>
  )
}
