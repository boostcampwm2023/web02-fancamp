import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

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
  resolve: {
    alias: [
      {
        find: '@API',
        replacement: path.resolve(__dirname, 'src/API'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
      {
        find: '@contexts',
        replacement: path.resolve(__dirname, 'src/contexts'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: '@type',
        replacement: path.resolve(__dirname, 'src/type'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
    ],
  },
});
