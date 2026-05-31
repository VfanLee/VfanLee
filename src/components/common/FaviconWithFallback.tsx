'use client'

import React, { useState, useEffect } from 'react'

interface FaviconWithFallbackProps {
  faviconUrl?: string | null
  alt: string
  className?: string
}

const DefaultIcon = () => (
  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-600">
    <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
      <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
    </svg>
  </div>
)

const FaviconWithFallback: React.FC<FaviconWithFallbackProps> = ({ faviconUrl, alt, className = 'rounded' }) => {
  const [showFavicon, setShowFavicon] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (!faviconUrl) {
      setShowFavicon(false)
      return
    }

    // 预加载图片
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
      setShowFavicon(true)
    }
    img.onerror = () => {
      setImageLoaded(false)
      setShowFavicon(false)
    }
    img.src = faviconUrl
  }, [faviconUrl])

  // 服务端渲染和客户端初始状态都显示默认图标
  if (!faviconUrl || !showFavicon || !imageLoaded) {
    return <DefaultIcon />
  }

  return (
    <img
      src={faviconUrl}
      alt={alt}
      width={24}
      height={24}
      className={className}
      style={{ width: '24px', height: '24px' }}
      onError={() => setShowFavicon(false)}
    />
  )
}

export default FaviconWithFallback
