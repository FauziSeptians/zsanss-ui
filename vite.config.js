/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
var dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [tailwindcss(), react(), tsconfigPaths(), dts({
            tsconfigPath: "./tsconfig.app.json",
            include: ["lib"],
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
