const js = require("@eslint/js")
const tsParser = require("@typescript-eslint/parser")
const tsPlugin = require("@typescript-eslint/eslint-plugin")
const prettier = require("eslint-config-prettier")
const globals = require("globals")

// Lints the TypeScript around the bot's code. The ForgeScript inside the code templates is text to ESLint:
// the compile check covers it
module.exports = [
  {
    ignores: ["dist", "database", "node_modules", "res"]
  },

  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node
      }
    }
  },

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "no-dupe-class-members": "off",
      // Overloads declare a function more than once
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "error",
      "no-empty": ["error", { allowEmptyCatch: true }]
    }
  },

  prettier
]
