import react from "@vitejs/plugin-react";
import { exec } from "child_process";
import { resolve } from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "zip-dist",
      closeBundle: () => {
        const version = pkg.version;
        exec(
          `cd dist && zip -r ../staging-traffic-light-v${version}.zip ./*`,
          (error) => {
            if (error) {
              console.error("Error creating zip:", error);
            } else {
              console.log(
                `staging-traffic-light-v${version}.zip created successfully`
              );
            }
          }
        );
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "src/background/background.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === "background" ? "background.js" : "[name].js";
        },
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[ext]",
      },
    },
    outDir: "dist",
    sourcemap: true,
  },
});
