import React from 'react'
import { SiteInfo } from '@/utils/site-info-server'
import FaviconWithFallback from './FaviconWithFallback'

interface SiteInfoCardServerProps {
  siteInfo: SiteInfo
}

const SiteInfoCardServer: React.FC<SiteInfoCardServerProps> = ({ siteInfo }) => {
  const { title, description, favicon, url } = siteInfo

  // 从 URL 提取域名作为默认标题
  const getDefaultTitle = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  return (
    <div className="border-border/60 bg-card text-card-foreground flex h-full w-full flex-col rounded-xl border shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col space-y-1.5 p-4 pb-3">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
            <FaviconWithFallback faviconUrl={favicon} alt={`${title || '网站'} favicon`} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-1 text-sm leading-tight font-medium text-gray-900">
              {title || getDefaultTitle(url)}
            </h3>
          </div>
        </div>
        <div className="flex-1">
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">{description || '暂无描述'}</p>
        </div>
      </div>
    </div>
  )
}

export default SiteInfoCardServer
