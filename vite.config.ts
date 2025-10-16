import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API calls in development (optional)
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4622',
        changeOrigin: true,
      },
    },
  },
})