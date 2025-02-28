class WebStorage {
  constructor(type: 'localStorage' | 'sessionStorage') {
    this.storage = type === 'localStorage' ? window.localStorage : window.sessionStorage
  }

  private storage: Storage

  /**
   * 设置存储
   * @param key - 存储的键
   * @param value - 存储的值
   */
  set(key: string, value: any) {
    const stringValue = JSON.stringify(value)
    this.storage.setItem(key, stringValue)
  }

  /**
   * 获取存储
   * @param key - 存储的键
   * @returns 获取的值
   */
  get<T>(key: string): T | null {
    const value = this.storage.getItem(key)
    if (value !== null) {
      try {
        return JSON.parse(value) as T
      } catch (error) {
        console.warn(`[WebStorage] Failed to parse value for key "${key}".`)
      }
    }
    return null
  }

  /**
   * 获取所有键值对
   * @returns 所有存储内容的键值对
   */
  getAll(): Record<string, any> {
    const entries: Record<string, any> = {}
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key) {
        const value = this.get(key)
        entries[key] = value
      }
    }
    return entries
  }

  /**
   * 删除指定键
   * @param key - 存储的键
   */
  remove(key: string) {
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
   * @param key - 存储的键
   * @returns 是否存在
   */
  has(key: string): boolean {
    return this.storage.getItem(key) !== null
  }
}

const localStore = new WebStorage('localStorage')
const sessionStore = new WebStorage('sessionStorage')

export { localStore, sessionStore }
