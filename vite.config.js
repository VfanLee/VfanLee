import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      dts: true,
      imports: ['vue'],
      resolvers: [],
    }),
    Components({
      dts: true,
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      resolvers: [],
    }),
    createSvgIconsPlugin({
      iconDirs: [fileURLToPath(new URL('./src/icons', import.meta.url))],
      symbolId: 'icon-[name]',
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    host: true,
    port: '5137',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    chunkSizeWarningLimit: Infinity,
  },
})
