<script setup lang="ts"></script>

<template>
  <div class="about-view">
    <div class="container">
      <h2>关于 Vfan Lee</h2>
      <p>👋 我是一名 Web 开发者。目前就职于一家在线教育公司，担任一名 Web 前端开发。</p>
      <p>我目前的重点是使用 Vue.js、Node.js 的包和 CLI 工具进行 Web 网页进行开发。</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-view {
  display: flex;
  min-height: calc(100vh - 4rem);

  .container {
    max-width: 900px;
    margin: 4rem auto;
  }

  h2 {
    font-size: 3rem;
    margin-bottom: 3rem;
  }

  p {
    margin: 1rem 0;
    line-height: 1.6;
  }
}
</style>
