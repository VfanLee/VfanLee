<script setup lang="ts">
import type { LogoProps } from './types'

defineOptions({
  name: 'Logo',
})

const props = defineProps<LogoProps>()

const is = computed(() => {
  return props.link ? (props.external ? 'a' : 'RouterLink') : 'span'
})

const attr = props.link ? (props.external ? { href: props.link } : { to: props.link }) : {}
</script>

<template>
  <h1 class="logo">
    <component :is="is" v-bind="attr">
      <slot name="logo"></slot>
      <slot name="title"></slot>
    </component>
  </h1>
</template>

<style lang="scss" scoped>
.logo {
  display: inline-flex;
  align-items: center;
  height: 100%;
  font-size: 1rem;
  color: var(--text-color-primary);

  > span,
  > a {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.5rem;
  }
}
</style>
