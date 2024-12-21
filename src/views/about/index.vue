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
.about-view {
  display: flex;
  min-height: calc(100vh - 4rem);

  .container {
    margin: 4rem auto;
  }

  @media (min-width: 1200px) {
    .title {
      font-size: 3rem;
    }
  }
}
</style>
