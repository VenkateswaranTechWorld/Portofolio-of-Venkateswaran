
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', 
  
  // ✅ ADD THIS BLOCK
  server: {
    // This tells Vite to run on port 3000 instead of 5173
    port: 3000, 
  },
});

// After adding this, you must save the vite.config.js file.