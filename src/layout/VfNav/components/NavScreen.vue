<script setup lang="ts">
import routes from '../routes.json'

import { onBeforeRouteLeave } from 'vue-router'
import { useNavStore } from '@/stores/nav'

defineOptions({
  name: 'NavScreen',
})

const navStore = useNavStore()

const { open = false } = defineProps<{
  open: boolean
}>()

watch(
  () => open,
  open => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onBeforeRouteLeave(() => {
  navStore.closeScreen()
})
</script>

<template>
  <div class="nav-screen" v-if="open">
    <ul class="links">
      <li class="link-item" v-for="(r, i) of routes" :key="i">
        <AppLink :to="{ path: r.link }">{{ r.text }}</AppLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.nav-screen {
  position: fixed;
  top: calc(4rem + 1px);
  right: 0;
  left: 0;
  bottom: 0;
  padding-top: 2rem;
  background-color: var(--bg-color);
  overflow: auto;

  .links {
    margin: 0;
    list-style: none;
    padding: 0;

    .link-item > a {
      display: flex;
      padding: 1rem 3rem;
      font-size: 1.25rem;
      cursor: pointer;

      &.router-link-exact-active {
        color: transparent;
        background-color: #8d65c5;
        background-clip: text;
      }
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
}
</style>
