import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
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
