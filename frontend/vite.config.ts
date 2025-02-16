import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import history from 'connect-history-api-fallback'
import type { Connect } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'custom-middleware',
      configureServer(server) {
        server.middlewares.use(
          history({
            verbose: true,
          }) as Connect.NextHandleFunction // Type assertion
        )
      },
    },
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
