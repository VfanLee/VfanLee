<script setup>
import config from '@/config'
import { useRouter } from 'vue-router'

const router = useRouter()

const goAboutPage = () => {
  router.push({ name: 'About' })
}

const openCodeUrl = () => {
  window.open(config.homePage, '_blank')
}
</script>

<template>
  <div class="home-view">
    <div class="container">
      <div class="logo">🦄</div>
      <h2 class="title">{{ config.title }}</h2>
      <p class="detail">{{ $t('homeView.detail') }}</p>
      <div class="btn-wrap">
        <button type="button" class="btn btn-primary" @click="goAboutPage">{{ $t('about') }}</button>
        <button type="button" class="btn btn-black" @click="openCodeUrl">
          <SvgIcon name="github" />
          {{ $t('homeView.code') }}
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
  }

  .detail {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    line-height: 2rem;
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
        background-color: #3a72ed;
        color: #fff;
        transition: 0.3s background-color ease;

        &:hover {
          background-color: #1e40af;
        }
      }

      &.btn-black {
        background-color: #111827;
        color: #fff;
        transition: 0.3s background-color ease;

        &:hover {
          background-color: #374151;
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
