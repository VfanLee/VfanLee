import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '我的收藏 | VfanLee',
}

export default function FavoritesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
