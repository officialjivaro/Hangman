import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'docs',
    assetsDir: '',
    rollupOptions: {
      output: {
        entryFileNames: 'Hangman/assets/[name]-[hash].js',
        chunkFileNames: 'Hangman/assets/[name]-[hash].js',
        assetFileNames: 'Hangman/assets/[name]-[hash].[ext]'
      }
    }
  }
})
