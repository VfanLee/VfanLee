/**
 * Base64 编码解码工具函数
 */

/**
 * Base64 字符串编码（标准）
 * @param input 输入字符串
 * @returns string Base64编码结果
 */
export function base64StringEncode(input: string): string {
  try {
    // 使用 TextEncoder 将字符串转换为 UTF-8 字节数组，然后转换为二进制字符串
    const bytes = new TextEncoder().encode(input)
    const binaryString = String.fromCharCode(...bytes)
    return btoa(binaryString)
  } catch (error) {
    throw new Error(`Base64编码失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }
}

/**
 * Base64 字符串解码（标准）
 * @param input Base64编码的字符串
 * @returns string 解码后的字符串
 */
export function base64StringDecode(input: string): string {
  try {
    // 解码 Base64 为二进制字符串，然后转换为 UTF-8 字节数组，最后解码为字符串
    const binaryString = atob(input)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return new TextDecoder().decode(bytes)
  } catch (error) {
    throw new Error(`Base64解码失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }
}

/**
 * 验证 Base64 格式
 * @param input 待验证的字符串
 * @returns boolean 是否为有效的Base64格式
 */
export function isValidBase64(input: string): boolean {
  try {
    // 标准 Base64 正则
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
    if (!base64Regex.test(input)) {
      return false
    }

    // 尝试解码验证
    atob(input)
    return true
  } catch {
    return false
  }
}
