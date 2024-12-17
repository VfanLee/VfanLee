<script setup lang="ts"></script>

<template>
  <div class="contact-view">
    <div class="container">
      <h2>联系我</h2>
      <p>
        <a class="email" href="mailto:fanfanfafafa@gmail.com">fanfanfafafa@gmail.com</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.contact-view {
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

  .email {
    font-size: 2rem;
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
