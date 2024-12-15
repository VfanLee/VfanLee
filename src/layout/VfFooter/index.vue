<script setup>
import config from '@/config'

defineOptions({
  name: 'VfFooter',
})
</script>

<template>
  <div class="vf-footer">
    <div class="container">
      <p class="remark">无人扶我青云志，我自踏雪至山巅</p>
      <ul class="links">
        <li class="link-item">
          <a :href="config.sourceCodeUrl" target="_blank" rel="noreferrer">
            <SvgIcon name="github" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vf-footer {
  border-top-width: 1px;
  color: var(--text-color-regular);
  user-select: none;

  .container {
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .remark {
    font-size: 0.75rem;
    letter-spacing: 0.0625rem;

    &::before {
      content: open-quote;
    }
    &::after {
      content: close-quote;
    }
  }

  .links {
    display: flex;
  }

  .link-item {
    > a {
      position: relative;
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
        background-color: var(--bg-color-page);
      }
    }
  }
}
</style>
