<script setup lang="ts">
import config from '@/config'

defineOptions({
  name: 'VfFooter',
})
</script>

<template>
  <footer class="vf-footer">
    <div class="container">
      <p class="remark">{{ config.remark }}</p>
      <ul class="links">
        <li class="link-item">
          <a :href="config.github" target="_blank" rel="noreferrer">
            <SvgIcon name="github-alt" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.vf-footer {
  border-top-width: 1px;
  color: var(--text-color-regular);
  user-select: none;

  .container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .remark {
    margin: 0;
    font-size: 0.75rem;
    letter-spacing: 0.0625rem;
    line-height: 2rem;

    &::before {
      content: open-quote;
    }
    &::after {
      content: close-quote;
    }
  }

  .links {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .link-item {
    > a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 0.75rem;
      border-radius: 8px;
      white-space: nowrap;
      letter-spacing: 0.0625rem;
      color: var(--text-color-regular);
      cursor: pointer;

      &:hover {
        background-color: var(--fill-color-light);
      }
    }
  }

  @media (min-width: 768px) {
    .container {
      flex-direction: row;
      justify-content: space-between;
    }

    .remark {
      max-width: 50%;
    }
  }
}
</style>
