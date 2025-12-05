import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
    host: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/mixins/mixins.scss" as *;
        `,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: Infinity,
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      dts: './types/auto-imports.d.ts',
      imports: ['vue'],
    }),
    Components({
      dts: './types/components.d.ts',
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
    }),
  ],
})
