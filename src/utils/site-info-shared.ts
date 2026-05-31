export interface SiteInfo {
  title?: string
  description?: string
  favicon?: string | null
  url: string
}

/**
 * 共享的站点信息获取逻辑
 * 可以在 API 路由和服务端组件中复用
 */
export async function fetchSiteInfo(url: string): Promise<SiteInfo> {
  try {
    // 验证 URL 格式
    const validUrl = new URL(url)

    // 获取网页内容
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      // 设置超时
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const html = await response.text()

    // 解析 meta 信息
    const siteInfo: SiteInfo = {
      url,
      title: extractMetaContent(html, 'title'),
      description: extractMetaContent(html, 'description'),
      favicon: extractFavicon(html, validUrl.origin),
    }

    return siteInfo
  } catch (error) {
    console.error('Error fetching site info:', error)

    // 返回默认信息，不设置 favicon，让组件显示默认图标
    const getDefaultTitle = (url: string) => {
      try {
        return new URL(url).hostname.replace('www.', '')
      } catch {
        return url
      }
    }

    return {
      title: getDefaultTitle(url),
      description: `访问 ${getDefaultTitle(url)}`,
      favicon: null, // 不设置 favicon，使用默认图标
      url,
    }
  }
}

function extractMetaContent(html: string, type: 'title' | 'description'): string {
  if (type === 'title') {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch) return titleMatch[1].trim()

    // 尝试 og:title
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    if (ogTitleMatch) return ogTitleMatch[1].trim()

    return ''
  }

  if (type === 'description') {
    // 尝试 meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    if (descMatch) return descMatch[1].trim()

    // 尝试 og:description
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    if (ogDescMatch) return ogDescMatch[1].trim()

    return ''
  }

  return ''
}

function extractFavicon(html: string, origin: string): string {
  // 尝试找到 favicon 链接
  const faviconPatterns = [
    /<link[^>]*rel=["']icon["'][^>]*href=["']([^"']+)["'][^>]*>/i,
    /<link[^>]*rel=["']shortcut icon["'][^>]*href=["']([^"']+)["'][^>]*>/i,
    /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']icon["'][^>]*>/i,
    /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']shortcut icon["'][^>]*>/i,
  ]

  for (const pattern of faviconPatterns) {
    const match = html.match(pattern)
    if (match) {
      const href = match[1]
      // 如果是相对路径，转换为绝对路径
      if (href.startsWith('//')) {
        return `https:${href}`
      } else if (href.startsWith('/')) {
        return `${origin}${href}`
      } else if (href.startsWith('http')) {
        return href
      } else {
        return `${origin}/${href}`
      }
    }
  }

  // 默认 favicon 位置
  return `${origin}/favicon.ico`
}
