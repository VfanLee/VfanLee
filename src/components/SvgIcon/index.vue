<script setup lang="ts">
import type { SvgIconProps } from './types'

const props = defineProps<SvgIconProps>()
</script>

<template>
  <svg aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<style scoped>
svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
