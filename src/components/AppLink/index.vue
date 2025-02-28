<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router'
import { isExternalLink } from '@/utils/validation'

const props = defineProps<RouterLinkProps>()

const isExternal = computed(() => {
  if (typeof props.to === 'string') {
    return props.to.startsWith('http')
  }

  if (typeof props.to === 'object') {
    return isExternalLink(props.to.path || '')
  }

  return false
})

const href = computed(() => {
  if (typeof props.to === 'string') {
    return props.to
  }

  if (typeof props.to === 'object') {
    return props.to.path
  }

  return ''
})
</script>

<template>
  <a v-if="isExternal" :href="href" target="_blank" rel="noreferrer">
    <slot />
  </a>
  <RouterLink v-else v-bind="$props">
    <slot />
  </RouterLink>
</template>
