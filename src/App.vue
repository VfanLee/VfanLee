<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()

document.documentElement.lang = unref(localeStore.locale)
</script>

<template>
  <RouterView />
</template>
