/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // O único chunk acima de 500 kB é o Three.js (132 kB gzip), isolado e carregado sob demanda pela hero.
    chunkSizeWarningLimit: 560,
    rollupOptions: {
      output: {
        // Three.js vive num chunk próprio: só é baixado quando a hero 3D é montada.
        manualChunks: (id) => (id.includes('node_modules/three') ? 'three' : undefined),
      },
    },
  },
  test: {
    environment: 'jsdom',
    // Workers "forks" expiram em caminhos com acentos/OneDrive no Windows; threads funcionam.
    pool: 'threads',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
