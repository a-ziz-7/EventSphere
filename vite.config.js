import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure Vite outputs to 'dist' directory
    // If you have assets like images or fonts, you might want to add:
    assetsDir: 'assets',
  }
})

