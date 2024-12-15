class WebStorage {
  constructor(type) {
    this.storage = type === 'localStorage' ? window.localStorage : window.sessionStorage
  }

  /**
   * 设置存储
   * @param {string} key - 存储的键
   * @param {any} value - 存储的值
   */
  set(key, value) {
    const stringValue = JSON.stringify(value)
    this.storage.setItem(key, stringValue)
  }

  /**
   * 获取存储
   * @param {string} key - 存储的键
   * @returns {any|null} - 获取的值
   */
  get(key) {
    const value = this.storage.getItem(key)
    if (value !== null) {
      try {
        return JSON.parse(value)
      } catch (error) {
        console.warn(`[WebStorage] Failed to parse value for key "${key}".`)
      }
    }
    return null
  }

  /**
   * 删除指定键
   * @param {string} key - 存储的键
   */
  remove(key) {
    this.storage.removeItem(key)
  }

  /**
   * 清空存储
   */
  clear() {
    this.storage.clear()
  }

  /**
   * 检查是否存在某个键
   * @param {string} key - 存储的键
   * @returns {boolean} - 是否存在
   */
  has(key) {
    return this.storage.getItem(key) !== null
  }
}

const localStore = new WebStorage('localStorage')
const sessionStore = new WebStorage('sessionStorage')

export { localStore, sessionStore }
