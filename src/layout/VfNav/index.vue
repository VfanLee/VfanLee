<script setup lang="ts">
import NavBarLogo from './components/NavBarLogo.vue'
import NavBarMenu from './components/NavBarMenu.vue'
import NavBarHamburger from './components/NavBarHamburger.vue'
import NavScreen from './components/NavScreen.vue'

import { useNavStore } from '@/stores/nav'

defineOptions({
  name: 'VfNav',
})

const navStore = useNavStore()
</script>

<template>
  <header class="vf-nav">
    <div class="container">
      <NavBarLogo />
      <NavBarMenu />
      <NavBarHamburger />
      <ThemeSwitcher />
    </div>

    <NavScreen :open="navStore.isScreenOpen"></NavScreen>
  </header>
</template>

<style lang="scss" scoped>
.vf-nav {
  position: sticky;
  inset-block-start: 0;
  border-bottom-width: 1px;
  color: var(--text-color-regular);
  background-color: var(--vf-nav-bg-color);
  user-select: none;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
  }

  @media (min-width: 768px) {
    .nav-bar-hamburger {
      display: none;
    }

    .nav-screen {
      display: none;
    }
  }

  @media (min-width: 1200px) {
  }
}
</style>
