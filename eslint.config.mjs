import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const baseConfig = compat.extends(
  "next/core-web-vitals",
  "next/typescript"
);

const typescriptConfig = {
  files: ["**/*.ts", "**/*.tsx"],
  ...compat.extends("plugin:@typescript-eslint/recommended-requiring-type-checking")[0],
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ["./tsconfig.json"],
    },
  },
  rules: {
    // TypeScript specific rules
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" }
    ],
  },
};

const commonConfig = {
  rules: {
    // React specific rules
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" }
    ],

    // General rules
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-unused-vars": "off", // Using TypeScript's no-unused-vars instead
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-template": "error",
    "quotes": ["error", "double", { avoidEscape: true }],
  },
};

const eslintConfig = [
  ...baseConfig,
  typescriptConfig,
  commonConfig,
];

export default eslintConfig;
