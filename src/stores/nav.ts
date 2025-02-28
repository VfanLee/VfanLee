import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', () => {
  const isScreenOpen = ref(false)

  function toggleScreen() {
    isScreenOpen.value = !isScreenOpen.value

    if (window.outerWidth >= 768) {
      window.addEventListener('resize', closeScreen)
    } else {
      window.removeEventListener('resize', closeScreen)
    }
  }

  function closeScreen() {
    isScreenOpen.value = false
  }

  return {
    isScreenOpen,
    toggleScreen,
    closeScreen,
  }
})
