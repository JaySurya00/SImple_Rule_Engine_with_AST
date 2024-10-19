import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables from the parent directory of the 'client' folder
  const env = loadEnv(mode, path.resolve(__dirname, '..'), '');

  return {
    // Define custom environment variables for Vite
    define: {
      'import.meta.env.BACKEND_PORT': JSON.stringify(env.PORT),
    },
  };
});
