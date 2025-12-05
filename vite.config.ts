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
    port: 5173,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: Infinity,
  },
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      dts: 'auto-imports.d.ts',
      imports: ['vue'],
    }),
    Components({
      dts: 'components.d.ts',
      dirs: [],
    }),
  ],
})
