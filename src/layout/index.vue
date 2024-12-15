<script setup lang="ts">
import VfHeader from './VfHeader/index.vue'
import VfFooter from './VfFooter/index.vue'
import VfMain from './VfMain/index.vue'

defineOptions({
  name: 'VfLayout',
})
</script>

<template>
  <div class="vf-layout">
    <VfHeader />
    <VfMain />
    <VfFooter />
  </div>
</template>
