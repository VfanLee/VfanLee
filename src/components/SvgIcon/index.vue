<script setup lang="ts">
import type { SvgIconProps } from './types'

const { size = '1em' } = defineProps<SvgIconProps>()
</script>

<template>
  <svg class="svg-icon" :class="[`icon-${name}`]" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<style scoped>
svg {
  width: v-bind(size);
  height: v-bind(size);
  fill: currentColor;
}
</style>
