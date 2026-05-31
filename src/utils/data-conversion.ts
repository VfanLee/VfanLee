/**
 * 数据转换工具函数
 */

/**
 * 整数转字节数组（大端序）
 * @param num 要转换的大整数
 * @returns Uint8Array 字节数组
 */
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

/**
 * 字节数组转整数（大端序）
 * @param bytes 字节数组
 * @returns bigint 大整数
 */
export function bytesToInt(bytes: Uint8Array): bigint {
  let result = 0n
  for (const byte of bytes) {
    result = (result << 8n) + BigInt(byte)
  }
  return result
}
