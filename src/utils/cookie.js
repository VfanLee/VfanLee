import $Cookies from 'js-cookie'

class Cookie {
  /**
   * 设置 Cookie
   * @param {string} key - Cookie 名
   * @param {any} value - Cookie 值
   * @param {object} options - 配置参考：https://github.com/js-cookie/js-cookie#cookie-attributes
   */
  set(key, value, options = {}) {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : value
    $Cookies.set(key, stringValue, options)
  }

  /**
   * 获取 Cookie
   * @param {string} key - Cookie 名
   * @returns {any|null} - 获取的值（自动解析 JSON 格式）
   */
  get(key) {
    const value = $Cookies.get(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch (error) {
        return value // 返回原始值
      }
    }
    return null
  }

  /**
   * 删除 Cookie
   * @param {string} key - Cookie 名
   * @param {object} options - 配置选项（路径等，需与设置时一致）
   */
  remove(key, options = {}) {
    $Cookies.remove(key, options)
  }

  /**
   * 检查是否存在某个 Cookie
   * @param {string} key - Cookie 名
   * @returns {boolean} - 是否存在
   */
  has(key) {
    return !!$Cookies.get(key)
  }
}

const cookie = new Cookie()

export default cookie
