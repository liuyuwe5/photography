import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/photography/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        fragments: resolve(__dirname, 'fragments.html'),
        works: resolve(__dirname, 'works.html'),
        project_fish: resolve(__dirname, 'project_fish.html'),
        project_flower: resolve(__dirname, 'project_flower.html'),
      }
    }
  }
})
