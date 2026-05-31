/**
 * Base58 编码解码工具函数
 */

import basex from 'base-x'
import { sha256 } from './crypto'

// Base58 字符集
export const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
export const bs58 = basex(BASE58)

/**
 * Base58Check 编码
 * 在原始数据后添加校验码，用于检测传输错误
 * @param data 要编码的数据
 * @returns Promise<string> Base58Check编码结果
 */
export async function base58CheckEncode(data: Uint8Array): Promise<string> {
  const hash1 = await sha256(data)
  const hash2 = await sha256(hash1)
  const checksum = hash2.slice(0, 4)

  // 手动合并数组以避免扩展运算符问题
  const payload = new Uint8Array(data.length + 4)
  payload.set(data, 0)
  payload.set(checksum, data.length)

  return bs58.encode(payload)
}

/**
 * Base58Check 解码
 * 解码并验证校验码
 * @param str Base58Check编码的字符串
 * @returns Promise<string> 解码后的原始数据（UTF-8字符串）
 */
export async function base58CheckDecode(str: string): Promise<string> {
  const decoded = bs58.decode(str)
  if (decoded.length < 5) {
    throw new Error('数据长度不足，校验失败')
  }

  const data = decoded.slice(0, -4)
  const checksum = decoded.slice(-4)
  const hash1 = await sha256(data)
  const hash2 = await sha256(hash1)
  const expected = hash2.slice(0, 4)

  // 校验checksum
  for (let i = 0; i < 4; i++) {
    if (checksum[i] !== expected[i]) {
      throw new Error('校验码不匹配，数据可能损坏')
    }
  }

  return new TextDecoder().decode(data)
}

/**
 * Base58 字符串编码
 * @param input 输入字符串
 * @returns string Base58编码结果
 */
export function base58StringEncode(input: string): string {
  return bs58.encode(new TextEncoder().encode(input))
}

/**
 * Base58 字符串解码
 * @param input Base58编码的字符串
 * @returns string 解码后的字符串
 */
export function base58StringDecode(input: string): string {
  const decoded = bs58.decode(input)
  return new TextDecoder().decode(decoded)
}

/**
 * Base58 整数编码
 * @param input 输入整数（字符串形式）
 * @returns string Base58编码结果
 */
export function base58IntEncode(input: string): string {
  const num = BigInt(input)
  const bytes = intToBytes(num)
  return bs58.encode(bytes)
}

/**
 * Base58 整数解码
 * @param input Base58编码的字符串
 * @returns string 解码后的整数（字符串形式）
 */
export function base58IntDecode(input: string): string {
  const decodedBytes = bs58.decode(input)
  return bytesToInt(decodedBytes).toString()
}

// 导入数据转换函数
import { intToBytes, bytesToInt } from './data-conversion'
