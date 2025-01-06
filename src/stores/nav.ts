import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

export const useNavStore = defineStore('nav', () => {
  const isScreenOpen = ref(false)

  function toggleScreen() {
    isScreenOpen.value = !isScreenOpen.value

    if (window.outerWidth >= 768) {
      window.addEventListener('resize', closeScreenOnTabletWindow)
    } else {
      window.removeEventListener('resize', closeScreenOnTabletWindow)
    }
  }

  function closeScreenOnTabletWindow() {
    isScreenOpen.value = false
  }

  const route = useRoute()

  watch(
    () => route.path,
    () => {
      isScreenOpen.value = false
    },
  )

  return {
    isScreenOpen,
    toggleScreen,
  }
})
