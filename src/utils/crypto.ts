/**
 * 加密相关工具函数
 */

/**
 * SHA256 哈希计算
 * @param data 要计算哈希的数据
 * @returns Promise<Uint8Array> 哈希结果
 */
export async function sha256(data: Uint8Array): Promise<Uint8Array> {
  try {
    // 创建一个新的 Uint8Array 以确保正确的类型
    const buffer = new Uint8Array(data)
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer)
    return new Uint8Array(hashBuffer)
  } catch {
    throw new Error('SHA256 计算失败')
  }
}
