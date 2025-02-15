import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rewriteAll from 'vite-plugin-rewrite-all'

export default defineConfig({
  plugins: [react(), rewriteAll()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})