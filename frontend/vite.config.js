import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@react-google-maps/api': '@react-google-maps/api/dist/index.js'
    }
  }
})
