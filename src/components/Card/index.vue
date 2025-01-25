<script setup lang="ts">
defineOptions({
  name: 'Card',
})

defineProps<{
  text: string
  remark: string
  npm?: string
  github?: string
  preview?: string
}>()
</script>

<template>
  <div class="card">
    <div class="card-title">
      <a v-if="preview || npm || github" :href="preview || npm || github" target="_blank" ref="noreference" :title="text">{{ text }}</a>
      <template v-else>{{ text }}</template>
    </div>
    <div class="card-remark" :title="remark">{{ remark }}</div>
    <div class="card-operation">
      <a v-if="preview" :href="preview" target="_blank" ref="noreference">
        <SvgIcon name="eye" />
      </a>
      <a v-if="npm" :href="npm" target="_blank" ref="noreference">
        <SvgIcon name="npm" />
      </a>
      <a v-if="github" :href="github" target="_blank" ref="noreference">
        <SvgIcon name="github" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border-width: 1px;
  padding: 1rem;
  border-radius: 6px;
  overflow: hidden;

  .card-title {
    @include utils-ellipsis;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 2;
    color: var(--color-primary);
    a {
      color: var(--color-primary);
    }
    &:hover {
      text-decoration: underline;
      text-underline-offset: 0.25rem;
    }
  }

  .card-remark {
    @include utils-ellipsis;
    margin-block-start: 0.125rem;
    font-size: 0.825rem;
    line-height: 2;
    color: var(--text-color-secondary);
  }

  .card-operation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    height: 2rem;
    color: var(--text-color-regular);

    .icon-eye {
      font-size: 1.25rem;
    }

    .icon-npm {
      font-size: 2rem;
    }

    .icon-github {
      font-size: 1.25rem;
    }
  }
}
</style>
