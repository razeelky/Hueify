import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/colors": {
        target: "https://csscolorsapi.com",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api\/colors/, "/api/colors"),
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
