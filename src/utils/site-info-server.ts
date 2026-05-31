import { cache } from 'react'
import { fetchSiteInfo, SiteInfo } from './site-info-shared'

// 重新导出类型
export type { SiteInfo }

/**
 * 服务端获取站点信息
 * 使用 React cache 进行请求去重
 */
export const fetchSiteInfoServer = cache(async (url: string): Promise<SiteInfo> => {
  // 直接调用共享的站点信息获取函数，无需 HTTP 请求
  return await fetchSiteInfo(url)
})

/**
 * 批量获取多个站点信息
 */
export const fetchMultipleSiteInfo = async (urls: string[]): Promise<Record<string, SiteInfo>> => {
  // 并发获取，但限制并发数量避免服务端压力过大
  const BATCH_SIZE = 10
  const result: Record<string, SiteInfo> = {}

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE)
    const batchPromises = batch.map(async (url) => {
      const info = await fetchSiteInfoServer(url)
      return { url, info }
    })

    const batchResults = await Promise.all(batchPromises)

    batchResults.forEach(({ url, info }) => {
      result[url] = info
    })
  }

  return result
}
