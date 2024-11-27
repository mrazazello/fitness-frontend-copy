import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  define: {
    // Some libraries use the global object, even though it doesn't exist in the browser.
    // Alternatively, we could add `<script>window.global = window;</script>` to index.html.
    // https://github.com/vitejs/vite/discussions/5912
    global: {}
  },
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, "./src"),
      "@app": "/src/app",
      "@pages": "/src/pages",
      "@shared": "/src/shared",
      "@features": "/src/features",
      "@entities": "/src/entities"
    }
  }
});
