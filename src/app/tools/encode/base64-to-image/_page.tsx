'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { base64ToBlob, SUPPORTED_IMAGE_TYPES } from '@/lib/encode-utils'

const EXT_MAP: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/bmp': 'bmp',
  'image/svg+xml': 'svg',
}

export default function Base64ToImagePage() {
  const [inputBase64, setInputBase64] = React.useState('')
  const [selectedMime, setSelectedMime] = React.useState('image/png')
  const [previewUrl, setPreviewUrl] = React.useState('')
  const [downloadFileName, setDownloadFileName] = React.useState('converted.png')
  const [error, setError] = React.useState('')

  const handleConvert = () => {
    const input = inputBase64.trim()
    setError('')
    if (!input) {
      setError('请输入 Base64 字符串')
      return
    }
    try {
      const blob = base64ToBlob(input, selectedMime)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
      const ext = EXT_MAP[selectedMime] || 'png'
      setDownloadFileName(`converted.${ext}`)
    } catch (err) {
      setError(`转换失败: ${err instanceof Error ? err.message : '未知错误'}`)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl('')
      }
    }
  }

  const handleClear = () => {
    setInputBase64('')
    setSelectedMime('image/png')
    setError('')
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl('')
    }
    setDownloadFileName('converted.png')
  }

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-foreground mb-1 text-xl font-semibold">Base64 → 图片</h1>
        <p className="text-muted-foreground text-sm">将 Base64 字符串还原为图片，支持预览和下载</p>
      </div>

      {error && (
        <div className="border-destructive/50 bg-destructive/10 text-destructive mb-4 rounded-lg border px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left: Input */}
        <div className="space-y-3">
          <div>
            <label htmlFor="b64-input" className="mb-1.5 block text-sm font-medium">
              输入 Base64 字符串
            </label>
            <textarea
              id="b64-input"
              className="border-border/60 bg-background placeholder:text-muted-foreground/50 focus:border-border h-60 w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm transition-colors outline-none focus:ring-0"
              value={inputBase64}
              onChange={(e) => setInputBase64(e.target.value)}
              placeholder="粘贴纯 Base64 字符串（不含 data:image/… 前缀）"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="mime-select" className="text-sm font-medium">
              图片类型
            </label>
            <select
              id="mime-select"
              value={selectedMime}
              onChange={(e) => setSelectedMime(e.target.value)}
              className="border-border/60 bg-background hover:border-border focus:border-border rounded-md border px-2.5 py-1 text-sm transition-colors outline-none"
            >
              {SUPPORTED_IMAGE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleConvert}>
              生成预览
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              清空
            </Button>
          </div>
        </div>

        {/* Right: Preview */}
        <div>
          <p className="mb-1.5 text-sm font-medium">预览</p>
          <div className="border-border/50 bg-muted/20 flex h-64 items-center justify-center rounded-xl border">
            {previewUrl ? (
              <div className="relative h-full w-full">
                <Image src={previewUrl} alt="预览图片" fill className="object-contain" unoptimized />
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">图片预览将在这里显示</p>
            )}
          </div>
          {previewUrl && (
            <a href={previewUrl} download={downloadFileName} className="mt-3 inline-flex">
              <Button variant="secondary" size="sm">
                下载图片
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
