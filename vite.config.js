import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/DEV007-burger-queen-api-client/",
  plugins: [react()],
})
