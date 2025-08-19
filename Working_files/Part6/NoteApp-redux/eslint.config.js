import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,  // browser globals
        ...pluginJest.environments.globals.globals, // jest globals
      },
    },
    plugins: {
      js,
      react: pluginReact,
      jest: pluginJest,
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended,
    ],
    rules: {
      // add any custom rules if needed
    },
  },
]);
