import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/big-earls/',
  plugins: [react()],
  server: { open: true },
})
