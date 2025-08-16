import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Uncomment the next line if deploying to a subpath
  // base: '/zuto-geotech-solutions/',
});