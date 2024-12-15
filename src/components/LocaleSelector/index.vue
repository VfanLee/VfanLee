<script setup>
import { useLocaleStore } from '@/stores/locale'

const localeStore = useLocaleStore()

defineOptions({
  name: 'LocaleSelector',
})

const localeMap = {
  zh: {
    mini: '简',
    full: 'zh 简体中文',
  },
  en: {
    mini: 'EN',
    full: 'en English',
  },
}

const handleCommand = c => {
  localeStore.setLocale(c)
}
</script>

<template>
  <div>LocaleSelector</div>
  <!-- <el-dropdown class="locale-selector" popper-class="locale-selector__popper" trigger="click" @command="handleCommand" :show-arrow="false">
    <span class="locale-selector__trigger">{{ localeMap[localeStore.locale].mini }}</span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(value, key) of localeMap" :key="key" :command="key" :class="{ 'is-active': localeStore.locale === key }">
          {{ value.full }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown> -->
</template>

<style lang="scss" scoped>
.locale-selector {
  .locale-selector__trigger {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: #cbcbd1;
    color: #fff;
    cursor: pointer;
  }
}
</style>
