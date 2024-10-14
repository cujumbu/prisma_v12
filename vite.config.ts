import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: {
      '@prisma/client': path.resolve(__dirname, './src/lib/mockDataService.ts'),
    },
  },
})