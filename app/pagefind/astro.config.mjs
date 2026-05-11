import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://example.com',
  build: {
    format: 'directory'
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind-ui.js']
      }
    }
  }
});