'use client'

import React from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/utils/ui'
import {
  imageToBase64,
  isValidImageFile,
  isValidFileSize,
  formatFileSize,
  extractBase64FromDataUrl,
  getSupportedFormatsText,
  SUPPORTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  copyToClipboard,
} from '@/utils'

export default function ImageBase64Page() {
  const [base64Result, setBase64Result] = React.useState('')
  const [pureBase64Result, setPureBase64Result] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [dragActive, setDragActive] = React.useState(false)
  const [notice, setNotice] = React.useState<{ type: 'error' | 'warn'; msg: string } | null>(null)
  const [copied, setCopied] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const showNotice = (type: 'error' | 'warn', msg: string) => {
    setNotice({ type, msg })
    setTimeout(() => setNotice(null), 3000)
  }

  const handleFileSelect = async (file: File) => {
    if (!file) return
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
      showNotice('error', `转换失败: ${error instanceof Error ? error.message : '未知错误'}`)
      setBase64Result('')
      setPureBase64Result('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleClear = () => {
    setBase64Result('')
    setPureBase64Result('')
    setNotice(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleCopy = async (text: string, key: string) => {
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-foreground mb-1 text-xl font-semibold">图片 → Base64</h1>
        <p className="text-muted-foreground text-sm">将图片文件转换为 Base64 编码字符串，便于在网页中嵌入使用</p>
      </div>

      {/* Notice */}
      {notice && (
        <div
          className={cn(
            'mb-4 rounded-lg border px-4 py-3 text-sm',
            notice.type === 'error'
              ? 'border-destructive/50 bg-destructive/10 text-destructive'
              : 'border-yellow-400/50 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
          )}
        >
          {notice.msg}
        </div>
      )}

      {/* Drop Zone */}
      <div
        className={cn(
          'rounded-xl border-2 border-dashed p-10 text-center transition-colors',
          dragActive ? 'border-border bg-foreground/5' : 'border-border/50 hover:border-border/70',
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={SUPPORTED_IMAGE_TYPES.join(',')}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="space-y-3">
          <div className="text-4xl">📁</div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground">拖拽图片到这里，或</span>
            <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
              选择文件
            </Button>
          </div>
          <p className="text-muted-foreground text-xs">
            支持格式：{getSupportedFormatsText()}　·　最大 {formatFileSize(MAX_FILE_SIZE)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" disabled={!base64Result} onClick={() => handleCopy(base64Result, 'full')}>
          {copied === 'full' ? '已复制 ✓' : '复制完整 Data URL'}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={!pureBase64Result}
          onClick={() => handleCopy(pureBase64Result, 'pure')}
        >
          {copied === 'pure' ? '已复制 ✓' : '复制纯 Base64'}
        </Button>
        <Button variant="ghost" size="sm" onClick={handleClear} disabled={isLoading}>
          清空
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-6 text-center">
          <div className="border-primary mx-auto size-6 animate-spin rounded-full border-2 border-t-transparent" />
          <p className="text-muted-foreground mt-2 text-sm">正在转换图片...</p>
        </div>
      )}

      {/* Results */}
      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="data-url-output" className="mb-1.5 block text-sm font-medium">
            完整 Data URL（可直接用于 HTML img src）
          </label>
          <textarea
            id="data-url-output"
            rows={5}
            readOnly
            className="border-border/60 bg-muted/30 placeholder:text-muted-foreground/40 w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-xs outline-none"
            value={base64Result}
            placeholder="Data URL 结果将在这里显示..."
          />
        </div>

        <div>
          <label htmlFor="pure-base64-output" className="mb-1.5 block text-sm font-medium">
            纯 Base64 字符串
          </label>
          <textarea
            id="pure-base64-output"
            rows={7}
            readOnly
            className="border-border/60 bg-muted/30 placeholder:text-muted-foreground/40 w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-xs outline-none"
            value={pureBase64Result}
            placeholder="纯 Base64 结果将在这里显示..."
          />
        </div>
      </div>
    </div>
  )
}
