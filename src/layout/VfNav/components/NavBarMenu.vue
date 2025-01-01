<script setup lang="ts">
defineOptions({
  name: 'NavBarMenu',
})
</script>

<template>
  <nav class="nav-bar-menu">
    <ul class="links">
      <li class="link-item">
        <RouterLink :to="{ path: '/home' }">首页</RouterLink>
      </li>
      <li class="link-item">
        <RouterLink :to="{ path: '/about' }">关于我</RouterLink>
      </li>
    </ul>
    <ul class="extra-links">
      <li class="link-item">
        <RouterLink :to="{ path: '/contact' }"><SvgIcon name="mail" /></RouterLink>
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

    .link-item {
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
  }

  .extra-links {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 1.125rem;

    .link-item {
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
