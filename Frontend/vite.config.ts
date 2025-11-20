import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, 
    port: 5173,
    proxy: {
      
      
      // Proxy calls starting with /api to OpenWeatherMap API
      '/api': {
        target: 'https://api.openweathermap.org', // Your API base URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
      //local backend for reports:
      '/backend': {
        target: 'http://localhost:5000', // Local Node/Express server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ''), // Remove /backend prefix
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setupTests.ts',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'lcov'],
    },
  },
}));
