<script setup lang="ts">
import routes from '../routes.json'

defineOptions({
  name: 'NavBarMenu',
})
</script>

<template>
  <nav class="nav-bar-menu">
    <ul class="links">
      <li class="link-item" :class="{ 'is-icon': r.icon }" v-for="(r, i) of routes" :key="i">
        <AppLink :to="{ path: r.link }">
          <template v-if="r.icon"><SvgIcon :name="r.icon" /></template>
          <template v-else>{{ r.text }}</template>
        </AppLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav-bar-menu {
  display: none;
  align-items: center;
  height: inherit;

  .links {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 1rem;

    .link-item:not(.is-icon) {
      &:hover {
        > a {
          &::after {
            width: 66%;
            background-color: #c790f1;
          }
        }
      }

      > a {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          display: flex;
          width: 0;
          height: 0.2rem;
          border-radius: 0.2rem;
          transition: 0.2s all ease-in-out;
        }

        &.router-link-active::after {
          width: 66%;
          background-color: #8d65c5;
        }
      }
    }

    .link-item:is(.is-icon) {
      font-size: 1.125rem;

      > a {
        &:hover,
        &:focus {
          background-color: var(--fill-color);
        }
      }
    }
  }

  .link-item {
    > a {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0.75rem;
      border-radius: 8px;
      white-space: nowrap;
      letter-spacing: 0.0625rem;
      cursor: pointer;
    }
  }

  @media (min-width: 768px) {
    display: flex;
  }
}
</style>
