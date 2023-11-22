import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://223.130.133.168:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
      '/socket.io': {
        target: 'http://223.130.133.168:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ''),
        secure: false,
        ws: true,
      },
    },
  },
});
