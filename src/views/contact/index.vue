<script setup lang="ts"></script>

<template>
  <div class="contact-view">
    <div class="container">
      <div class="md-content">
        <h2>联系 Vfan Lee</h2>
        <p>
          <a class="email" href="mailto:fanfanfafafa@gmail.com">fanfanfafafa@gmail.com</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-view {
  .email {
    font-size: 1.75rem;
    background-clip: text;
    background-image: linear-gradient(to right, #5092ff, #ff6dc6);
    color: transparent;
    padding-bottom: 0.25rem;

    &:hover {
      border-bottom: 0.25rem solid var(--text-color-primary);
    }
  }
}
</style>
