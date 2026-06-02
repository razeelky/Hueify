import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const browserGlobals = {
  Blob: "readonly",
  console: "readonly",
  document: "readonly",
  fetch: "readonly",
  FileReader: "readonly",
  FormData: "readonly",
  localStorage: "readonly",
  navigator: "readonly",
  setTimeout: "readonly",
  URL: "readonly",
  window: "readonly",
};

const nodeGlobals = {
  __dirname: "readonly",
  module: "readonly",
  require: "readonly",
};

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: browserGlobals,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/no-unknown-property": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    files: ["*.config.js"],
    languageOptions: {
      globals: nodeGlobals,
    },
  },
];
