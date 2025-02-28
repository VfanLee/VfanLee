<script setup lang="ts">
import { localStore } from '@/utils/store'

defineOptions({
  name: 'ThemeSwitcher',
})

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const isDark = ref(localStore.get('theme') === 'dark' || (localStore.get('theme') === null && prefersDark))

const toggleTheme = () => {
  const newTheme = !isDark.value
  document.documentElement.classList.toggle('dark', newTheme)
  isDark.value = newTheme
}

watchEffect(() => {
  localStore.set('theme', isDark.value ? 'dark' : 'light')
})

onMounted(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>

<template>
  <button type="button" class="theme-switcher" @click="toggleTheme">
    <SvgIcon v-show="!isDark" name="sun" />
    <SvgIcon v-show="isDark" name="moon" />
  </button>
</template>

<style lang="scss" scoped>
.theme-switcher {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.125rem;
}
</style>
