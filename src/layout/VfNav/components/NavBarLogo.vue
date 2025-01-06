<script setup lang="ts">
import config from '@/config'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'NavBarLogo',
})

const route = useRoute()

const isHomePage = computed<boolean>(() => route.name === 'home')
</script>

<template>
  <div class="nav-bar-logo">
    <Logo link="/home">
      <template #logo v-if="isHomePage">
        <span>🦄</span>
      </template>
      <template #title v-else>
        <span>{{ config.title }}</span>
      </template>
    </Logo>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar-logo {
  margin-inline-end: auto;
}
</style>
