var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import pkg from "./package.json" with { type: "json" };
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
var dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [tailwindcss(), react(), tsconfigPaths(), dts({
            tsconfigPath: "./tsconfig.app.json",
            include: ["lib"],
            exclude: ["lib/**/*.stories.tsx", "lib/**/*.stories.ts", "lib/foundations/**"],
            insertTypesEntry: true
        })],
    resolve: {
        alias: [{
                find: "@",
                replacement: path.resolve(__dirname, "lib")
            }]
    },
    build: {
        copyPublicDir: false,
        lib: {
            name: "zsanss-ui",
            fileName: "zsanss-ui",
            entry: path.resolve(__dirname, "./lib/main.ts"),
            formats: ["es", "umd"]
        },
        rollupOptions: {
            // Semua dependencies + peerDependencies dibuat eksternal (termasuk subpath-nya).
            // Kalau React ikut ter-bundle, konsumer bisa kena "Invalid hook call" (dua salinan React);
            // dependency lain akan di-install & di-dedupe oleh package manager konsumer.
            external: __spreadArray(__spreadArray(__spreadArray([], Object.keys((_a = pkg.dependencies) !== null && _a !== void 0 ? _a : {}), true), Object.keys((_b = pkg.peerDependencies) !== null && _b !== void 0 ? _b : {}), true), [
                "react/jsx-runtime",
            ], false).map(function (name) { return new RegExp("^".concat(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "(/.*)?$")); }),
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "react/jsx-runtime": "jsxRuntime"
                }
            }
        }
    },
    test: {
        projects: [{
                extends: true,
                plugins: [
                    // The plugin will run tests for the stories defined in your Storybook config
                    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                    storybookTest({
                        configDir: path.join(dirname, '.storybook')
                    })
                ],
                test: {
                    name: 'storybook',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: 'playwright',
                        instances: [{
                                browser: 'chromium'
                            }]
                    },
                    setupFiles: ['.storybook/vitest.setup.ts']
                }
            }]
    }
});
