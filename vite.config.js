import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/chatifyapp",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5173",
        changeOrigin: true,
      },
    },
  },
})
