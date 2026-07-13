'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  favorites: string[]
  toggleFavorite: (href: string) => void
  isFavorite: (href: string) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (href) =>
        set((state) => ({
          favorites: state.favorites.includes(href)
            ? state.favorites.filter((item) => item !== href)
            : [...state.favorites, href],
        })),
      isFavorite: (href) => get().favorites.includes(href),
    }),
    {
      name: 'vfanlee-tool-favorites',
    },
  ),
)
