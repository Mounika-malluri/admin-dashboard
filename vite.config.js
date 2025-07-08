import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // This is useful locally only
  },
  build: {
    outDir: 'dist', // This tells Vercel where to find built files
  },
  base: '/', // Ensures routing works on Vercel (especially for /dashboard, /form)
});


