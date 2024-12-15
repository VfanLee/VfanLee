import { createI18n } from 'vue-i18n'
import cookie from '@/utils/cookie'
import zh from './locales/zh'
import en from './locales/en'

const messages = {
  zh,
  en,
}

function getDefaultLocale() {
  const cacheLocale = cookie.get('locale')
  if (cacheLocale) {
    return cacheLocale
  }

  return 'zh'
}

const i18n = createI18n({
  legacy: false, // composition require
  locale: getDefaultLocale(),
  fallbackLocale: 'zh',
  messages,
  globalInjection: true,
})

export default i18n
