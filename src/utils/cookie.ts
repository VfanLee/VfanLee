import Cookies from 'js-cookie'

interface CookieOptions extends Cookies.CookieAttributes {
  // 可以自定义添加其他属性，如expires等
}

class Cookie {
  /**
   * 设置 Cookie
   * @param key - Cookie 名
   * @param value - Cookie 值
   * @param options - 配置选项
   */
  set(key: string, value: any, options?: CookieOptions) {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : value
    Cookies.set(key, stringValue, options)
  }

  /**
   * 获取 Cookie
   * @param key - Cookie 名
   * @returns 获取的值（自动解析 JSON 格式）
   */
  get<T>(key: string): T | null {
    const value = Cookies.get(key)
    if (value) {
      try {
        return JSON.parse(value) as T
      } catch (error) {
        return value as unknown as T // 返回原始值
      }
    }
    return null
  }

  /**
   * 删除 Cookie
   * @param key - Cookie 名
   * @param options - 配置选项
   */
  remove(key: string, options?: CookieOptions) {
    Cookies.remove(key, options)
  }

  /**
   * 检查是否存在某个 Cookie
   * @param key - Cookie 名
   * @returns 是否存在
   */
  has(key: string): boolean {
    return !!Cookies.get(key)
  }
}

const cookie = new Cookie()

export default cookie
