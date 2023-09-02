import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'MY_APP',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'plugin.[ext]',
      },
    },
  },
})
