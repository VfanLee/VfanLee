<script setup lang="ts">
defineOptions({
  name: 'Card',
})

defineProps<{
  text: string
  remark: string
  preview: string
  source: string
}>()
</script>

<template>
  <div class="card">
    <div class="card-title">{{ text }}</div>
    <div class="card-remark">{{ remark }}</div>
    <div class="card-operation">
      <a v-if="preview" :href="preview" target="_blank" ref="noreference">预览</a>
      <a v-if="source" :href="source" target="_blank" ref="noreference">源码</a>
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
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 2;
    color: var(--color-primary);
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
    justify-content: flex-end;
    gap: 0.5rem;
    margin-block-start: 0.125rem;
    font-size: 0.825rem;
    font-weight: bold;
    line-height: 1.5;
    color: var(--text-color-regular);

    a:hover,
    a:active {
      text-decoration: underline;
      text-underline-offset: 0.25rem;
    }
  }
}
</style>
