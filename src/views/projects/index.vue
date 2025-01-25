<script setup lang="ts">
import data from './data.json'
import type { Project } from './types'

const projects = data as Project[]
</script>

<template>
  <div class="projects-view">
    <div class="container">
      <section class="title">
        <h2>项目</h2>
      </section>

      <section class="project" v-for="(p, i) of projects" :key="i">
        <h3 class="project-title">{{ p.title }}</h3>
        <p class="project-subtitle">{{ p.subTitle }}</p>
        <div class="items-grid">
          <Card 
            v-for="(item, i) of p.items" 
            :key="i" 
            :text="item.text" 
            :remark="item.remark" 
            :preview="item.preview" 
            :npm="item.npm" 
            :github="item.github" 
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.projects-view {
  @media (min-width: 768px) {
    .items-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .title {
    margin-block-end: 0;

    h2 {
      margin: 0;
    }
  }

  .project {
    margin-block-start: 3rem;

    .project-title {
      margin: 0;
      line-height: 2;
    }

    .project-subtitle {
      margin: 0;
      text-align: end;
      font-size: 0.825rem;
      line-height: 2;
    }
  }

  .items-grid {
    margin-block-start: 1rem;
    display: grid;
    grid-template-columns: repeat(1fr);
    gap: 2rem;
  }
}
</style>
