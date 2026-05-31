'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import ToolDescription from '@/components/ui/ToolDescription'
import { copyToClipboard, isValidResult } from '@/lib/encode-utils'

export default function UrlEncodePage() {
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')
  const [copied, setCopied] = React.useState(false)

  const handleEncode = () => {
    if (!input.trim()) {
      setOutput('请输入要编码的内容')
      return
    }
    try {
      setOutput(encodeURIComponent(input.trim()))
    } catch (error) {
      setOutput(`编码失败: ${error instanceof Error ? error.message : '未知错误'}`)
    }
  }

  const handleDecode = () => {
    if (!input.trim() || !input.includes('%')) {
      setOutput('请输入有效的 URL 编码内容（应包含 % 编码字符）')
      return
    }
    try {
      setOutput(decodeURIComponent(input.trim()))
    } catch (error) {
      setOutput(`解码失败: ${error instanceof Error ? error.message : '未知错误'}`)
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setCopied(false)
  }

  const handleCopy = async () => {
    const ok = await copyToClipboard(output)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const hasError =
    output.includes('失败') || output.includes('错误') || output.includes('无效') || output.includes('请输入')

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-foreground mb-1 text-xl font-semibold">URL 编码</h1>
        <p className="text-muted-foreground text-sm">URL 编码 / 解码工具</p>
        <ToolDescription
          features={[
            '将特殊字符转换为 %XX 格式（如空格变成 %20）',
            '适用于 URL 参数值、查询字符串等场景',
            '确保特殊字符在 URL 传输中不会被误解析',
          ]}
        />
      </div>

      {/* Input */}
      <div className="space-y-5">
        <div>
          <label htmlFor="url-input" className="text-foreground mb-1.5 block text-xs font-medium">
            输入
          </label>
          <textarea
            id="url-input"
            rows={7}
            className="border-border/60 bg-background placeholder:text-muted-foreground/50 focus:border-border w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm transition-colors outline-none focus:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入要编码的文本或要解码的 URL 编码字符串..."
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleEncode} disabled={!input.trim()}>
            编码
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDecode} disabled={!input.trim()}>
            解码
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground">
            清空
          </Button>
          {output.trim() && isValidResult(output) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground ml-auto"
            >
              {copied ? '已复制 ✓' : '复制结果'}
            </Button>
          )}
        </div>

        {/* Output */}
        <div>
          <label htmlFor="url-output" className="text-foreground mb-1.5 block text-xs font-medium">
            输出
          </label>
          <textarea
            id="url-output"
            rows={7}
            readOnly
            className={`border-border/60 bg-muted/30 placeholder:text-muted-foreground/40 w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm outline-none ${
              hasError ? 'border-destructive/50 text-destructive' : ''
            }`}
            value={output}
            placeholder="结果将在这里显示..."
          />
        </div>
      </div>
    </div>
  )
}
