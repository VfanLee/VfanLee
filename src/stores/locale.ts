import { defineStore } from 'pinia'
import { localStore } from '@/utils/store'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: localStore.get('locale') || 'zh',
  }),
  getters: {},
  actions: {
    setLocale(locale: string) {
      this.locale = locale
      localStore.set('locale', locale)
    },
  },
})
