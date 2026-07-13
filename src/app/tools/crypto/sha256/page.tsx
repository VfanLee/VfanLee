'use client'

import { useState } from 'react'
import { sha256 } from '@/utils/crypto'
import { copyToClipboard, isValidResult } from '@/utils'
import { Button } from '@/components/ui'
import { ToolDescription } from '@/components'

export default function SHA256Page() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleHash = async () => {
    if (!input.trim()) {
      setOutput('请输入要计算哈希的内容')
      return
    }

    setLoading(true)
    try {
      const encoder = new TextEncoder()
      const data = encoder.encode(input)
      const hashArray = await sha256(data)
      const hashHex = Array.from(hashArray)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
      setOutput(hashHex)
    } catch (error) {
      console.error('SHA256 计算失败:', error)
      setOutput(`计算失败: ${error instanceof Error ? error.message : '未知错误'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    const ok = await copyToClipboard(output)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setCopied(false)
  }

  const hasError =
    output.includes('失败') || output.includes('错误') || output.includes('无效') || output.includes('请输入')

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <h1 className="text-foreground mb-1 text-xl font-semibold">SHA256</h1>
        <p className="text-muted-foreground text-sm">SHA256 哈希计算工具</p>
        <ToolDescription
          features={[
            'SHA256 是密码学安全的哈希函数，输出固定 256 位（64个十六进制字符）',
            '哈希过程不可逆，无法从结果反推出原始内容',
            '相同输入总是产生相同输出，微小变化会导致完全不同的结果',
            '广泛用于密码存储、数字签名、区块链、文件完整性校验等场景',
          ]}
        />
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="input-textarea" className="text-foreground mb-1.5 block text-xs font-medium">
            输入
          </label>
          <textarea
            id="input-textarea"
            className="border-border/60 bg-background placeholder:text-muted-foreground/50 focus:border-border w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm transition-colors outline-none focus:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={7}
            placeholder="请输入要进行 SHA256 哈希计算的文本内容..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleHash} disabled={!input.trim() || loading}>
            {loading ? '计算中…' : '生成 SHA256'}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-muted-foreground">
            清空
          </Button>
          {output && isValidResult(output) && (
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
          <label htmlFor="output-textarea" className="text-foreground mb-1.5 block text-xs font-medium">
            SHA256 哈希值
          </label>
          <textarea
            id="output-textarea"
            className={`border-border/60 bg-muted/30 placeholder:text-muted-foreground/40 w-full resize-none rounded-lg border px-3 py-2.5 font-mono text-sm outline-none ${
              hasError ? 'border-destructive/50 text-destructive' : ''
            }`}
            rows={3}
            value={output}
            readOnly
            placeholder="SHA256 哈希值将在这里显示（64位十六进制字符串）..."
          />
        </div>
      </div>
    </div>
  )
}
