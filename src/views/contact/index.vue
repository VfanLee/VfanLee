<script setup lang="ts"></script>

<template>
  <div class="contact-view">
    <div class="container">
      <h2 class="title">{{ $t('contactPage.title') }} Vfan Lee</h2>
      <p>
        <a class="email" href="mailto:fanfanfafafa@gmail.com">fanfanfafafa@gmail.com</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-view {
  display: flex;
  min-height: calc(100vh - 4rem);

  .container {
    margin: 4rem auto;
  }

  .title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  p {
    margin: 1rem 0;
    line-height: 1.6;
  }

  .email {
    font-size: 1.8rem;
    background-clip: text;
    background-image: linear-gradient(to right, #5092ff, #ff6dc6);
    color: transparent;
    padding-bottom: 0.25rem;

    &:hover {
      border-bottom: 0.25rem solid var(--text-color-primary);
    }
  }

  @media (min-width: 1200px) {
    .title {
      font-size: 3rem;
    }
  }
}
</style>
