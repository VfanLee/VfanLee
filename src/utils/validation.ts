/**
 * 检查文本是否为有效的成功结果（不包含错误信息）
 * @param text 要检查的文本
 * @returns 是否为有效结果
 */
export const isValidResult = (text: string): boolean => {
  if (!text.trim()) return false

  const errorKeywords = ['失败', '错误', '无效', '请输入']
  return !errorKeywords.some((keyword) => text.includes(keyword))
}
