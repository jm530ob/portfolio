import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      "/res": 'http://localhost:3000',
      "/auth": 'http://localhost:3000',
    }
  }
});
