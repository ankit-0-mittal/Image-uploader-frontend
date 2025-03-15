import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // Your Flask backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: rewrite path if needed
      },
    },
  },
});
