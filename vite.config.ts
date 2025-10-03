import react from "@vitejs/plugin-react";
import path from "node:path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({ tsconfigPath: './tsconfig.app.json' , include : ["lib"], insertTypesEntry: true})
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "lib") }],
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      name: "zsanss-ui",
      fileName: "zsanss-ui",
      entry: path.resolve(__dirname, "./lib/main.ts"),
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-router-dom",
        "react/jsx-runtime",
        "tailwindcss",
      ],
    },
  },
});
