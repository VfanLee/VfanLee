<script setup lang="ts">
import VfNav from './VfNav/index.vue'
import VfFooter from './VfFooter/index.vue'
import VfContent from './VfContent/index.vue'

defineOptions({
  name: 'VfLayout',
})
</script>

<template>
  <div class="vf-layout">
    <VfNav />
    <VfContent />
    <VfFooter />
  </div>
</template>
