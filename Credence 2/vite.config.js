import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const { API_PORT = '3001' } = loadEnv(mode, process.cwd(), 'API_PORT');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': `http://127.0.0.1:${API_PORT}`,
      },
    },
  };
});
