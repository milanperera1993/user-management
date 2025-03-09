import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string): string | undefined {
          if (id.includes("node_modules")) {
            try {
              const cleanPath = id.split("?")[0];

              const sanitizedPath = cleanPath.replace(/\0/g, "");

              const filePath = path.normalize(sanitizedPath);

              const stats = fs.statSync(filePath);
              const sizeInKB = stats.size / 1024;
              if (sizeInKB > 300) return "large-vendors";
              if (sizeInKB > 50) return "medium-vendors";
              return "small-vendors";
            } catch (e) {
              console.error(`Error reading file: ${id}`, e);
              return "vendors";
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
