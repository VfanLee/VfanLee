/**
 * 编码/解码相关工具函数
 * 迁移自 vfan-tools 项目
 */

import basex from 'base-x'

// ─── Base64 ────────────────────────────────────────────────────────────────

/**
 * Base64 字符串编码（标准，支持 UTF-8 / 中文）
 */
export function base64StringEncode(input: string): string {
  const bytes = new TextEncoder().encode(input)
  const binaryString = String.fromCharCode(...bytes)
  return btoa(binaryString)
}

/**
 * Base64 字符串解码（标准，支持 UTF-8 / 中文）
 */
export function base64StringDecode(input: string): string {
  const binaryString = atob(input)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

/**
 * 验证 Base64 格式是否合法
 */
export function isValidBase64(input: string): boolean {
  try {
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
    if (!base64Regex.test(input)) return false
    atob(input)
    return true
  } catch {
    return false
  }
}

// ─── Image Base64 ──────────────────────────────────────────────────────────

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/svg+xml',
] as const

/** 最大文件大小 2MB */
export const MAX_FILE_SIZE = 2 * 1024 * 1024

export function getSupportedFormatsText(): string {
  const formatMap: Record<string, string> = {
    'image/jpeg': 'JPEG',
    'image/jpg': 'JPG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'image/webp': 'WebP',
    'image/bmp': 'BMP',
    'image/svg+xml': 'SVG',
  }
  const uniqueFormats = Array.from(new Set(SUPPORTED_IMAGE_TYPES.map((t) => formatMap[t] || t)))
  return uniqueFormats.join(', ')
}

export function isValidImageFile(file: File): boolean {
  return SUPPORTED_IMAGE_TYPES.includes(file.type as (typeof SUPPORTED_IMAGE_TYPES)[number])
}

export function isValidFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isValidImageFile(file)) {
      reject(new Error(`不支持的文件格式。支持的格式：${getSupportedFormatsText()}`))
      return
    }
    if (!isValidFileSize(file)) {
      reject(new Error(`文件过大。最大支持 ${formatFileSize(MAX_FILE_SIZE)}`))
      return
    }
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result === 'string') resolve(result)
      else reject(new Error('文件读取失败'))
    }
    reader.onerror = () => reject(new Error('文件读取出错'))
    reader.readAsDataURL(file)
  })
}

export function extractBase64FromDataUrl(dataUrl: string): string {
  const idx = dataUrl.indexOf('base64,')
  if (idx === -1) throw new Error('无效的 Data URL 格式')
  return dataUrl.substring(idx + 7)
}

export function base64ToBlob(base64OrDataUrl: string, mimeType?: string): Blob {
  let rawBase64 = base64OrDataUrl
  let finalMime = mimeType || 'image/png'
  const match = base64OrDataUrl.match(/^data:([^;]+);base64,(.*)$/s)
  if (match) {
    finalMime = match[1]
    rawBase64 = match[2]
  }
  try {
    const binaryString = atob(rawBase64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i)
    return new Blob([bytes], { type: finalMime })
  } catch {
    throw new Error('无效的 Base64 字符串')
  }
}

// ─── Crypto ────────────────────────────────────────────────────────────────

export async function sha256(data: Uint8Array): Promise<Uint8Array> {
  const buffer = new Uint8Array(data)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer)
  return new Uint8Array(hashBuffer)
}

// ─── Data Conversion ───────────────────────────────────────────────────────

export function intToBytes(num: bigint): Uint8Array {
  if (num === 0n) return new Uint8Array([0])
  if (num < 0n) throw new Error('不支持负数')
  const bytes: number[] = []
  let temp = num
  while (temp > 0n) {
    bytes.unshift(Number(temp & 0xffn))
    temp >>= 8n
  }
  return new Uint8Array(bytes)
}

export function bytesToInt(bytes: Uint8Array): bigint {
  let result = 0n
  for (const byte of bytes) result = (result << 8n) + BigInt(byte)
  return result
}

// ─── Base58 ────────────────────────────────────────────────────────────────

const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const bs58 = basex(BASE58)

export async function base58CheckEncode(data: Uint8Array): Promise<string> {
  const hash1 = await sha256(data)
  const hash2 = await sha256(hash1)
  const checksum = hash2.slice(0, 4)
  const payload = new Uint8Array(data.length + 4)
  payload.set(data, 0)
  payload.set(checksum, data.length)
  return bs58.encode(payload)
}

export async function base58CheckDecode(str: string): Promise<string> {
  const decoded = bs58.decode(str)
  if (decoded.length < 5) throw new Error('数据长度不足，校验失败')
  const data = decoded.slice(0, -4)
  const checksum = decoded.slice(-4)
  const hash1 = await sha256(data)
  const hash2 = await sha256(hash1)
  const expected = hash2.slice(0, 4)
  for (let i = 0; i < 4; i++) {
    if (checksum[i] !== expected[i]) throw new Error('校验码不匹配，数据可能损坏')
  }
  return new TextDecoder().decode(data)
}

export function base58StringEncode(input: string): string {
  return bs58.encode(new TextEncoder().encode(input))
}

export function base58StringDecode(input: string): string {
  return new TextDecoder().decode(bs58.decode(input))
}

export function base58IntEncode(input: string): string {
  return bs58.encode(intToBytes(BigInt(input)))
}

export function base58IntDecode(input: string): string {
  return bytesToInt(bs58.decode(input)).toString()
}

// ─── Validation ────────────────────────────────────────────────────────────

/**
 * 检查输出是否为有效结果（不含错误关键字）
 */
export function isValidResult(text: string): boolean {
  if (!text.trim()) return false
  const errorKeywords = ['失败', '错误', '无效', '请输入']
  return !errorKeywords.some((kw) => text.includes(kw))
}

// ─── Clipboard ─────────────────────────────────────────────────────────────

/**
 * 复制文本到剪贴板，返回是否成功
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text.trim()) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}
