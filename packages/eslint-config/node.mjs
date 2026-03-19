import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const nodeConfig = defineConfig([
  globalIgnores(["dist", "build", "coverage"]),
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
      },
      sourceType: "module",
    },
    rules: {
      "no-console": "off",
      "no-undef": "error",
      "no-unused-expressions": "error",
      "no-unused-vars": "off",
      "prefer-const": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
]);

export default nodeConfig;
