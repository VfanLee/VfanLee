'use client'

import React from 'react'
import { Code2, Download, ImageIcon, Upload } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/utils/ui'
import {
  base64ToBlob,
  copyToClipboard,
  extractBase64FromDataUrl,
  formatFileSize,
  getSupportedFormatsText,
  imageToBase64,
  isValidFileSize,
  isValidImageFile,
  MAX_FILE_SIZE,
  SUPPORTED_IMAGE_TYPES,
} from '@/utils'

const EXT_MAP: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/bmp': 'bmp',
  'image/svg+xml': 'svg',
}

type Mode = 'to-base64' | 'to-image'

export default function ImageBase64Page() {
  const [mode, setMode] = React.useState<Mode>('to-base64')
  const [base64Result, setBase64Result] = React.useState('')
  const [pureBase64Result, setPureBase64Result] = React.useState('')
  const [inputBase64, setInputBase64] = React.useState('')
  const [selectedMime, setSelectedMime] = React.useState('image/png')
  const [previewUrl, setPreviewUrl] = React.useState('')
  const [notice, setNotice] = React.useState<{ type: 'error' | 'warn'; message: string } | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [dragActive, setDragActive] = React.useState(false)
  const [copied, setCopied] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const showNotice = (type: 'error' | 'warn', message: string) => {
    setNotice({ type, message })
    window.setTimeout(() => setNotice(null), 3000)
  }

  const handleFileSelect = async (file: File) => {
    setNotice(null)
    if (!isValidImageFile(file)) {
      showNotice('warn', `不支持的文件格式。支持：${getSupportedFormatsText()}`)
      return
    }
    if (!isValidFileSize(file)) {
      showNotice('warn', `文件过大，最大支持 ${formatFileSize(MAX_FILE_SIZE)}`)
      return
    }

    setIsLoading(true)
    try {
      const result = await imageToBase64(file)
      setBase64Result(result)
      setPureBase64Result(extractBase64FromDataUrl(result))
    } catch (error) {
      showNotice('error', `转换失败：${error instanceof Error ? error.message : '未知错误'}`)
      setBase64Result('')
      setPureBase64Result('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBase64Convert = () => {
    const input = inputBase64.trim()
    if (!input) {
      showNotice('warn', '请输入 Base64 字符串')
      return
    }

    try {
      const blob = base64ToBlob(input, selectedMime)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(URL.createObjectURL(blob))
      setNotice(null)
    } catch (error) {
      showNotice('error', `转换失败：${error instanceof Error ? error.message : '未知错误'}`)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl('')
    }
  }

  const handleCopy = async (text: string, key: string) => {
    if (await copyToClipboard(text)) {
      setCopied(key)
      window.setTimeout(() => setCopied(null), 1500)
    }
  }

  const handleImageClear = () => {
    setBase64Result('')
    setPureBase64Result('')
    setNotice(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleBase64Clear = () => {
    setInputBase64('')
    setSelectedMime('image/png')
    setNotice(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl('')
  }

  React.useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    },
    [previewUrl],
  )

  return (
    <div className="w-full px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-7">
        <h1 className="text-foreground text-xl font-semibold tracking-tight">图片 ↔ Base64</h1>
        <p className="text-muted-foreground mt-1 text-sm">在图片文件与 Base64 字符串之间双向转换</p>
      </div>

      <div className="border-border bg-card inline-flex rounded-xl border p-1" role="tablist" aria-label="转换方式">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'to-base64'}
          className={cn(
            'inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm transition-colors',
            mode === 'to-base64'
              ? 'bg-muted text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground',
          )}
          onClick={() => setMode('to-base64')}
        >
          <Upload className="size-4" /> 图片转 Base64
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'to-image'}
          className={cn(
            'inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm transition-colors',
            mode === 'to-image'
              ? 'bg-muted text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground',
          )}
          onClick={() => setMode('to-image')}
        >
          <ImageIcon className="size-4" /> Base64 转图片
        </button>
      </div>

      {notice && (
        <div
          className={cn(
            'mt-5 rounded-lg border px-4 py-3 text-sm',
            notice.type === 'error'
              ? 'border-destructive/50 bg-destructive/10 text-destructive'
              : 'border-yellow-400/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
          )}
        >
          {notice.message}
        </div>
      )}

      {mode === 'to-base64' ? (
        <div className="mt-5 space-y-4">
          <div
            className={cn(
              'border-border/60 hover:border-border rounded-xl border border-dashed p-8 text-center transition-colors sm:p-12',
              dragActive && 'border-foreground/40 bg-muted/40',
            )}
            onDragEnter={(event) => {
              event.preventDefault()
              setDragActive(true)
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setDragActive(false)}
            onDrop={(event) => {
              event.preventDefault()
              setDragActive(false)
              const file = event.dataTransfer.files?.[0]
              if (file) void handleFileSelect(file)
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={SUPPORTED_IMAGE_TYPES.join(',')}
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) void handleFileSelect(file)
              }}
              className="hidden"
            />
            <Upload className="text-muted-foreground mx-auto mb-3 size-6" />
            <p className="text-foreground text-sm font-medium">拖拽图片到这里，或选择文件</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {getSupportedFormatsText()} · 最大 {formatFileSize(MAX_FILE_SIZE)}
            </p>
            <Button
              className="mt-4"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              选择图片
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={!base64Result}
              onClick={() => void handleCopy(base64Result, 'full')}
            >
              {copied === 'full' ? '已复制' : '复制完整 Data URL'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={!pureBase64Result}
              onClick={() => void handleCopy(pureBase64Result, 'pure')}
            >
              {copied === 'pure' ? '已复制' : '复制纯 Base64'}
            </Button>
            <Button variant="ghost" size="sm" disabled={!base64Result || isLoading} onClick={handleImageClear}>
              清空
            </Button>
          </div>

          {isLoading ? (
            <p className="text-muted-foreground text-sm">正在转换图片…</p>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="text-sm font-medium">
                完整 Data URL
                <textarea
                  readOnly
                  rows={8}
                  value={base64Result}
                  placeholder="转换结果将在这里显示"
                  className="border-border/60 bg-muted/30 placeholder:text-muted-foreground/50 mt-2 block w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-xs font-normal outline-none"
                />
              </label>
              <label className="text-sm font-medium">
                纯 Base64 字符串
                <textarea
                  readOnly
                  rows={8}
                  value={pureBase64Result}
                  placeholder="转换结果将在这里显示"
                  className="border-border/60 bg-muted/30 placeholder:text-muted-foreground/50 mt-2 block w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-xs font-normal outline-none"
                />
              </label>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div>
            <label htmlFor="base64-input" className="text-sm font-medium">
              Base64 字符串
            </label>
            <textarea
              id="base64-input"
              value={inputBase64}
              onChange={(event) => setInputBase64(event.target.value)}
              placeholder="粘贴纯 Base64 字符串或完整 Data URL"
              className="border-border/60 bg-muted/30 placeholder:text-muted-foreground/50 mt-2 h-64 w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-xs outline-none"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label htmlFor="image-mime" className="text-muted-foreground text-sm">
                图片类型
              </label>
              <select
                id="image-mime"
                value={selectedMime}
                onChange={(event) => setSelectedMime(event.target.value)}
                className="border-border/60 bg-background rounded-lg border px-2.5 py-1.5 text-sm outline-none"
              >
                {SUPPORTED_IMAGE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={handleBase64Convert}>
                生成预览
              </Button>
              <Button variant="ghost" size="sm" onClick={handleBase64Clear}>
                清空
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium">预览</p>
            <div className="border-border/60 bg-muted/20 mt-2 flex h-64 items-center justify-center overflow-hidden rounded-xl border">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt="转换后的图片预览" className="size-full object-contain" />
              ) : (
                <Code2 className="text-muted-foreground/60 size-6" />
              )}
            </div>
            {previewUrl && (
              <a
                href={previewUrl}
                download={`converted.${EXT_MAP[selectedMime] || 'png'}`}
                className="mt-3 inline-flex"
              >
                <Button variant="secondary" size="sm">
                  <Download /> 下载图片
                </Button>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
