'use client'

import React from 'react'
import { Button } from '@/components/ui'
import { ToolDescription } from '@/components'
import { base64StringEncode, base64StringDecode, isValidBase64, copyToClipboard, isValidResult } from '@/utils'

export default function Base64Page() {
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')
  const [copied, setCopied] = React.useState(false)

  const handleEncode = () => {
    if (!input.trim()) {
      setOutput('请输入要编码的内容')
      return
    }
    try {
      setOutput(base64StringEncode(input.trim()))
    } catch (error) {
      setOutput(`编码失败: ${error instanceof Error ? error.message : '未知错误'}`)
    }
  }

  const handleDecode = () => {
    if (!input.trim() || !isValidBase64(input.trim())) {
      setOutput('请输入有效的 Base64 编码内容')
      return
    }
    try {
      setOutput(base64StringDecode(input.trim()))
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
    <div className="w-full px-6 py-10">
      <div className="mb-6">
        <h1 className="text-foreground mb-1 text-xl font-semibold">Base64 编码</h1>
        <p className="text-muted-foreground text-sm">Base64 字符串编码 / 解码工具</p>
      </div>

      <ToolDescription
        features={[
          '将任意二进制数据转换为可读的 ASCII 字符串',
          '常用于在文本协议中传输二进制数据（如邮件、网页等）',
          '编码后的数据长度会增加约 33%',
          '支持 UTF-8 编码的中文字符',
        ]}
      />

      <div className="space-y-5">
        <div>
          <label htmlFor="base64-input" className="text-foreground mb-1.5 block text-xs font-medium">
            输入
          </label>
          <textarea
            id="base64-input"
            rows={7}
            className="border-border/60 bg-background placeholder:text-muted-foreground/50 focus:border-border w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm transition-colors outline-none focus:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入要编码的文本或要解码的 Base64 字符串..."
          />
        </div>

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

        <div>
          <label htmlFor="base64-output" className="text-foreground mb-1.5 block text-xs font-medium">
            输出
          </label>
          <textarea
            id="base64-output"
            rows={7}
            readOnly
            className={`border-border/60 bg-muted/30 placeholder:text-muted-foreground/40 w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm outline-none ${hasError ? 'border-destructive/50 text-destructive' : ''}`}
            value={output}
            placeholder="结果将在这里显示..."
          />
        </div>
      </div>
    </div>
  )
}
