import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls to the backend during local development, so the
    // frontend can call same-origin "/api/..." paths (see chatbotConfig.js)
    // without CORS issues. Point BACKEND_URL at wherever backend/ runs.
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
