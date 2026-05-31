/**
 * 图片转 Base64 工具函数
 */

/**
 * 支持的图片格式
 */
export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/svg+xml',
] as const

/**
 * 获取支持格式的显示文本
 * @returns string 格式化后的支持格式列表
 */
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

  // 去重并转换为显示名称
  const uniqueFormats = Array.from(new Set(SUPPORTED_IMAGE_TYPES.map((type) => formatMap[type] || type)))

  return uniqueFormats.join(', ')
}

/**
 * 最大文件大小 (2MB)
 * Base64 编码后会增加约 33% 的大小，2MB 编码后约 2.7MB
 * 适合小图标、Logo、头像等场景的 Base64 嵌入
 */
export const MAX_FILE_SIZE = 2 * 1024 * 1024

/**
 * 验证文件是否为支持的图片格式
 * @param file 文件对象
 * @returns boolean 是否为支持的图片格式
 */
export function isValidImageFile(file: File): boolean {
  return SUPPORTED_IMAGE_TYPES.includes(file.type as (typeof SUPPORTED_IMAGE_TYPES)[number])
}

/**
 * 验证文件大小是否在允许范围内
 * @param file 文件对象
 * @returns boolean 文件大小是否合适
 */
export function isValidFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @returns string 格式化后的大小字符串
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * 将图片文件转换为 Base64
 * @param file 图片文件
 * @returns Promise<string> Base64 编码字符串（包含 data URL 前缀）
 */
export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // 验证文件类型
    if (!isValidImageFile(file)) {
      reject(new Error(`不支持的文件格式。支持的格式：${getSupportedFormatsText()}`))
      return
    }

    // 验证文件大小
    if (!isValidFileSize(file)) {
      reject(new Error(`文件过大。最大支持 ${formatFileSize(MAX_FILE_SIZE)}`))
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result === 'string') {
        resolve(result)
      } else {
        reject(new Error('文件读取失败'))
      }
    }

    reader.onerror = () => {
      reject(new Error('文件读取出错'))
    }

    reader.readAsDataURL(file)
  })
}

/**
 * 从 Base64 字符串中提取纯 Base64 数据（移除 data URL 前缀）
 * @param dataUrl 包含 data URL 前缀的 Base64 字符串
 * @returns string 纯 Base64 字符串
 */
export function extractBase64FromDataUrl(dataUrl: string): string {
  const base64Index = dataUrl.indexOf('base64,')
  if (base64Index === -1) {
    throw new Error('无效的 Data URL 格式')
  }
  return dataUrl.substring(base64Index + 7)
}

/**
 * 将 Base64（含或不含 Data URL 前缀）转换为 Blob
 * @param base64OrDataUrl Base64 字符串或完整的 data URL
 * @param mimeType 覆盖 MIME 类型（当传入的是纯 Base64 时可指定）
 * @returns Blob
 */
export function base64ToBlob(base64OrDataUrl: string, mimeType?: string): Blob {
  let rawBase64 = base64OrDataUrl
  let finalMime = mimeType || 'image/png'

  // 如果是 data URL，解析出 mime 与纯 base64
  const match = base64OrDataUrl.match(/^data:([^;]+);base64,(.*)$/s)
  if (match) {
    finalMime = match[1]
    rawBase64 = match[2]
  }

  try {
    const binaryString = atob(rawBase64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    return new Blob([bytes], { type: finalMime })
  } catch (_err) {
    throw new Error('无效的 Base64 字符串')
  }
}

/**
 * 将 Base64（或纯 Base64）转换为标准 data URL（data:<mime>;base64,...）
 * @param base64OrDataUrl Base64 字符串或 data URL
 * @param mimeType 当传入的是纯 Base64 时，指定 MIME 类型（默认 image/png）
 * @returns string 完整的 data URL
 */
export function base64ToDataUrl(base64OrDataUrl: string, mimeType = 'image/png'): string {
  // 已经是 data URL，直接返回
  if (base64OrDataUrl.startsWith('data:')) return base64OrDataUrl

  // 否则认为是纯 Base64，拼接 data URL
  return `data:${mimeType};base64,${base64OrDataUrl}`
}

/**
 * 根据 Base64 内容创建一个 File（用于下载）
 * @param base64OrDataUrl Base64 字符串或 data URL
 * @param filename 文件名
 * @param mimeType 当传入的是纯 Base64 时，可以指定 mime
 */
export function createFileFromBase64(base64OrDataUrl: string, filename = 'image.png', mimeType?: string): File {
  const blob = base64ToBlob(base64OrDataUrl, mimeType)
  return new File([blob], filename, { type: blob.type })
}
