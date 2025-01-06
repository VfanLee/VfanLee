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
      <div class="btn-wrap">
        <button type="button" class="btn btn-primary" @click="goAboutPage">关于我</button>
        <button type="button" class="btn btn-black" @click="openCodeUrl">
          <SvgIcon name="github" />
          主页
        </button>
      </div>
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

  .btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 2rem;
      border-radius: 10rem;
      font-size: 1rem;
      cursor: pointer;
      letter-spacing: 0.0625rem;
      white-space: nowrap;

      svg {
        font-size: 1.125rem;
      }

      &.btn-primary {
        background-color: var(--color-primary);
        border: 0.1rem solid var(--color-primary);
        color: #fff;
        transition: 0.3s all ease-in-out;

        &:hover {
          background-color: var(--color-primary-light-3);
          border-color: var(--color-primary-light-3);
        }

        &:active {
          background-color: var(--color-primary-dark-3);
          border-color: var(--color-primary-dark-3);
        }
      }

      &.btn-black {
        background-color: var(--btn-black-bg-color);
        border: 0.1rem solid var(--btn-black-border-color);
        color: var(--btn-black-text-color);
        transition: 0.3s all ease-in-out;

        &:hover {
          background-color: var(--btn-black-bg-color--hover);
          border-color: var(--btn-black-border-color--hover);
          color: var(--btn-black-text-color--hover);
        }
      }
    }
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
