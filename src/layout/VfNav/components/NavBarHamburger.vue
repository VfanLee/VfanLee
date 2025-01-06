<script setup lang="ts">
import { useNavStore } from '@/stores/nav'

defineOptions({
  name: 'NavBarHamburger',
})

const navStore = useNavStore()
</script>

<template>
  <button type="button" class="nav-bar-hamburger" :class="{ active: navStore.isScreenOpen }" @click="navStore.toggleScreen">
    <span class="container">
      <span class="top" />
      <span class="middle" />
      <span class="bottom" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.nav-bar-hamburger {
  display: inline-flex;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.25rem;

  .container {
    position: relative;
    width: 16px;
    height: 14px;
    max-width: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .top,
  .middle,
  .bottom {
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: var(--text-color-primary);
    transition: top 0.25s, background-color 0.5s, transform 0.25s;
  }

  .top {
    top: 0;
    left: 0;
    transform: translateX(0);
  }

  .middle {
    top: 6px;
    left: 0;
    transform: translateX(8px);
  }

  .bottom {
    top: 12px;
    left: 0;
    transform: translateX(4px);
  }

  &:hover {
    .top {
      top: 0;
      left: 0;
      transform: translateX(4px);
    }

    .middle {
      top: 6px;
      left: 0;
      transform: translateX(0);
    }

    .bottom {
      top: 12px;
      left: 0;
      transform: translateX(8px);
    }
  }

  &.active {
    .top {
      top: 6px;
      transform: translateX(0) rotate(225deg);
    }

    .middle {
      top: 6px;
      transform: translateX(16px);
    }

    .bottom {
      top: 6px;
      transform: translateX(0) rotate(135deg);
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
}
</style>
