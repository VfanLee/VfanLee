import { defineStore } from 'pinia'
import { localStore } from '@/utils/store'

export const useLocaleStore = defineStore('nav', () => {
  const locale = ref(localStore.get('locale') || 'zh')

  function setLocale(value: string) {
    locale.value = value
    localStore.set('locale', value)
  }

  return {
    locale,
    setLocale,
  }
})
