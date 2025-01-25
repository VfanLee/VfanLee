<script setup lang="ts">
import config from '@/config'
import { useRouter } from 'vue-router'

const router = useRouter()

const goAboutPage = () => {
  router.push({ name: 'about' })
}

const openCodeUrl = () => {
  window.open(config.github, '_blank')
}
</script>

<template>
  <div class="home-view">
    <div class="container">
      <div class="logo">🦄</div>
      <h2 class="title">{{ config.title }}</h2>
      <p class="details">{{ config.subtitle }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.home-view {
  display: flex;
  min-height: 100vh;
  margin-top: -4rem;
  text-align: center;

  .container {
    margin: auto;
  }

  .logo {
    margin-bottom: 2rem;
    font-size: 6rem;
  }

  .title {
    margin-bottom: 1rem;
    background-clip: text;
    background-size: 300%;
    background-image: linear-gradient(to right, #5092ff, #ff6dc6);
    font-size: 3.5rem;
    color: transparent;
    animation: identifier 10s ease infinite;
    letter-spacing: 0.125rem;
  }

  .details {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    line-height: 2rem;
    letter-spacing: 0.0625rem;
  }

  @keyframes identifier {
    0%,
    to {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }
  }
}
</style>
