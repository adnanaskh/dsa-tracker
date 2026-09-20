import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api/runners': {
        target: 'https://api.paiza.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/runners/, '/runners')
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1200,
  }
})
