'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import ToolDescription from '@/components/ui/ToolDescription'
import {
  base58CheckEncode,
  base58CheckDecode,
  base58StringEncode,
  base58StringDecode,
  base58IntEncode,
  base58IntDecode,
  copyToClipboard,
  isValidResult,
} from '@/lib/encode-utils'

type ModeType = 'string' | 'int' | 'check'

const MODE_DESCRIPTIONS: Record<ModeType, { title: string; features: string[] }> = {
  string: {
    title: '关于 Base58 字符串编码：',
    features: [
      '将任意数据编码为可读的 Base58 字符串',
      '适合安全传输和存储，尤其用于需要人工输入或展示的场景',
      '无填充字符，编码结果仅包含数字和大小写字母',
      '常用于邀请码、短链、ID、序列号等',
    ],
  },
  int: {
    title: '关于 Base58 整数编码：',
    features: [
      '将非负整数编码为 Base58 字符串',
      '适合表达大整数（如区块链金额、ID）',
      '不包含易混淆字符，可安全用于 URL、文件名等',
      '应用于区块链、邀请码、用户标识等',
    ],
  },
  check: {
    title: '关于 Base58 带校验码编码：',
    features: [
      '在原始数据后添加 4 字节校验码，编码为 Base58 字符串',
      '可用于检测输入错误，广泛应用于比特币等区块链地址',
      '编码流程：原始数据 + 校验码 → Base58 字符串',
      '解码时自动校验数据有效性',
    ],
  },
}

export default function Base58Page() {
  const [input, setInput] = React.useState('')
  const [output, setOutput] = React.useState('')
  const [mode, setMode] = React.useState<ModeType>('string')
  const [isLoading, setIsLoading] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const validateInput = (val: string, m: ModeType): boolean => {
    if (!val.trim()) return false
    if (m === 'int') {
      try {
        return BigInt(val.trim()) >= 0n
      } catch {
        return false
      }
    }
    return true
  }

  const handleEncode = async () => {
    if (!validateInput(input, mode)) {
      setOutput('输入无效')
      return
    }
    const needsLoading = mode === 'check'
    if (needsLoading) setIsLoading(true)
    try {
      const trimmed = input.trim()
      let result: string
      switch (mode) {
        case 'string':
          result = base58StringEncode(trimmed)
          break
        case 'int':
          result = base58IntEncode(trimmed)
          break
        case 'check':
          result = await base58CheckEncode(new TextEncoder().encode(trimmed))
          break
        default:
          throw new Error('未知的编码模式')
      }
      setOutput(result)
    } catch (error) {
      setOutput(`编码失败: ${error instanceof Error ? error.message : '未知错误'}`)
    } finally {
      if (needsLoading) setIsLoading(false)
    }
  }

  const handleDecode = async () => {
    if (!input.trim()) {
      setOutput('请输入要解码的内容')
      return
    }
    const needsLoading = mode === 'check'
    if (needsLoading) setIsLoading(true)
    try {
      const trimmed = input.trim()
      let result: string
      switch (mode) {
        case 'string':
          result = base58StringDecode(trimmed)
          break
        case 'int':
          result = base58IntDecode(trimmed)
          break
        case 'check':
          result = await base58CheckDecode(trimmed)
          break
        default:
          throw new Error('未知的解码模式')
      }
      setOutput(result)
    } catch (error) {
      setOutput(`解码失败: ${error instanceof Error ? error.message : '未知错误'}`)
    } finally {
      if (needsLoading) setIsLoading(false)
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

  const placeholder =
    mode === 'string'
      ? '请输入要编码/解码的字符串内容'
      : mode === 'int'
        ? '请输入要编码的非负整数，或要解码的 Base58 字符串'
        : '请输入要编码/解码的字符串内容（带校验码）'

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-foreground mb-1 text-xl font-semibold">Base58 编码</h1>
        <p className="text-muted-foreground text-sm">Base58 编码 / 解码工具，支持字符串、整数、带校验码三种模式</p>
      </div>

      {/* Mode Select */}
      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="mode-select" className="text-foreground text-xs font-medium">
          模式
        </label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as ModeType)
            setOutput('')
          }}
          className="border-border/60 bg-background hover:border-border focus:border-border rounded-md border px-2.5 py-1 text-sm transition-colors outline-none"
        >
          <option value="string">BASE58_STRING（字符串编码）</option>
          <option value="int">BASE58_INT（整数编码）</option>
          <option value="check">BASE58_CHECK（带校验码）</option>
        </select>
      </div>

      <ToolDescription title={MODE_DESCRIPTIONS[mode].title} features={MODE_DESCRIPTIONS[mode].features} />

      <div className="mt-4 space-y-5">
        <div>
          <label htmlFor="b58-input" className="text-foreground mb-1.5 block text-xs font-medium">
            输入
          </label>
          <textarea
            id="b58-input"
            rows={7}
            disabled={isLoading}
            className="border-border/60 bg-background placeholder:text-muted-foreground/50 focus:border-border w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm transition-colors outline-none focus:ring-0 disabled:opacity-50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleEncode} disabled={isLoading || !input.trim()}>
            {isLoading && mode === 'check' ? '编码中…' : '编码'}
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDecode} disabled={isLoading || !input.trim()}>
            {isLoading && mode === 'check' ? '解码中…' : '解码'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={isLoading}
            className="text-muted-foreground"
          >
            清空
          </Button>
          {output.trim() && isValidResult(output) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={isLoading}
              className="text-muted-foreground hover:text-foreground ml-auto"
            >
              {copied ? '已复制 ✓' : '复制结果'}
            </Button>
          )}
        </div>

        <div>
          <label htmlFor="b58-output" className="text-foreground mb-1.5 block text-xs font-medium">
            输出
          </label>
          <textarea
            id="b58-output"
            rows={7}
            readOnly
            className="border-border/60 bg-muted/30 placeholder:text-muted-foreground/40 w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm outline-none"
            value={output}
            placeholder="结果将在这里显示..."
          />
        </div>
      </div>
    </div>
  )
}
