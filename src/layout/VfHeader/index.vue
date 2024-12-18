<script setup lang="ts">
import config from '@/config'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'VfHeader',
})

const route = useRoute()

const isHomePage = computed<boolean>(() => route.name === 'Home')
</script>

<template>
  <div class="vf-header">
    <div class="container">
      <Logo link="/home">
        <template #logo v-if="isHomePage">
          <span>🦄</span>
        </template>
        <template #title v-else>
          <span>{{ config.title }}</span>
        </template>
      </Logo>

      <nav class="nav">
        <ul class="links">
          <li class="link-item">
            <RouterLink :to="{ path: '/home' }">{{ $t('home') }}</RouterLink>
          </li>
          <li class="link-item">
            <RouterLink :to="{ path: '/about' }">{{ $t('about') }}</RouterLink>
          </li>
        </ul>
        <ul class="extra-links">
          <li class="link-item">
            <RouterLink :to="{ path: '/contact' }"><SvgIcon name="mail" /></RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vf-header {
  position: sticky;
  inset-block-start: 0;
  border-bottom-width: 1px;
  color: var(--text-color-regular);
  user-select: none;
  backdrop-filter: blur(4px);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
  }

  .nav {
    display: flex;
    align-items: center;
    height: inherit;
  }

  .links {
    display: flex;
    font-size: 1rem;

    .link-item {
      > a {
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          display: flex;
          width: 0;
          height: 0.2rem;
          border-radius: 0.2rem;
          background-color: #8d65c5;
          transition: 0.2s all ease-in-out;
        }
      }

      .router-link-active {
        &::after {
          width: 66%;
        }
      }
    }
  }

  .extra-links {
    display: flex;
    font-size: 1.125rem;

    .link-item {
      &:hover {
        background-color: var(--bg-color-page);
      }
    }
  }

  .link-item {
    border-radius: 8px;

    > a {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0.75rem;
      white-space: nowrap;
      letter-spacing: 0.0625rem;
      cursor: pointer;
    }
  }
}
</style>
