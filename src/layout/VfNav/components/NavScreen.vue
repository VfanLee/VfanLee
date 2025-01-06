<script setup lang="ts">
import routes from './routes.json'

defineOptions({
  name: 'NavScreen',
})

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
</script>

<template>
  <div class="nav-screen" v-if="open">
    <ul class="links">
      <li class="link-item" v-for="(r, i) of routes" :key="i" @click="$router.replace({ path: r.link })">
        <RouterLink :to="{ path: r.link }">{{ r.text }}</RouterLink>
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

    .link-item {
      padding: 1rem 3rem;
      font-size: 1.25rem;
      cursor: pointer;

      &:hover {
        > a::after {
          width: 100%;
          background-color: #c790f1;
        }
      }

      > a {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          inset-block-end: -0.5rem;
          inset-inline-start: 50%;
          display: flex;
          width: 0;
          height: 0.2rem;
          border-radius: 0.2rem;
          transition: 0.2s width ease-in-out;
          transform: translateX(-50%);
        }

        &.router-link-active::after {
          inset-block-end: -0.5rem;
          width: 100%;
          background-color: #8d65c5;
        }
      }
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
}
</style>
