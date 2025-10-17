import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API calls in development (optional)
    proxy: {
      '/api': {
        target: 'https://staging-api.kyvra.xyz',
        changeOrigin: true,
      },
    },
  },
})