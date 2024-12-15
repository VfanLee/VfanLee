import { defineStore } from 'pinia'
import cookie from '@/utils/cookie'
import i18n from '@/i18n'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: cookie.get('locale') || 'zh',
  }),
  getters: {
    dir: state => (state === 'ar' ? 'rtl' : 'ltr'),
  },
  actions: {
    setLocale(locale: string) {
      this.locale = locale

      i18n.global.locale.value = locale
      document.documentElement.lang = locale
      cookie.set('locale', locale)
    },
  },
})
