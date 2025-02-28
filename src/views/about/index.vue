<script setup lang="ts">
import { marked } from 'marked'
import content from './content.md?raw'

const parsedContent = ref<string | Promise<string>>(marked.parse(content))
</script>

<template>
  <div class="about-view">
    <div class="container">
      <div class="md-content" v-html="parsedContent"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
