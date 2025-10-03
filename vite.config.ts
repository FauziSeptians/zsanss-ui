import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      include: ["lib"],
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "lib") }],
  },
  build: {
    copyPublicDir: false,
    lib: {
      name: "zsanss-ui",
      fileName: "zsanss-ui",
      entry: path.resolve(__dirname, "./lib/main.ts"),
      formats: ["es", "umd"],
    },
  },
});
