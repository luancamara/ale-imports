import {
  combine,
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  markdown,
  node,
  stylistic,
  typescript,
  unicorn,
  perfectionist,
} from "@antfu/eslint-config"
import nextPlugin from "@next/eslint-plugin-next"
import jestDom from "eslint-plugin-jest-dom"
import jsxA11y from "eslint-plugin-jsx-a11y"
import playwright from "eslint-plugin-playwright"
import tailwind from "eslint-plugin-tailwindcss"
import testingLibrary from "eslint-plugin-testing-library"

export default combine(
  ignores(["migrations/**/*", "next-env.d.ts", "eslint.config.mjs", "node-modules", ".next", "src/components/ui/*"]),
  javascript(/* Options */),
  comments(),
  node(),
  jsdoc(),
  imports(),
  unicorn(),
  perfectionist(),
  next(),
  typescript({
    overrides: {
      "ts/no-use-before-define": "off",
    },
  }),
  stylistic({
    indent: 2,
    quotes: "single",
    jsx: true,
    semi: false,
    overrides: {
      "style/brace-style": ["error", "1tbs"],
      "style/comma-dangle": "off",
      "style/quote-props": "off",
      "style/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "comma",
            requireLast: false,
          },
          singleline: {
            delimiter: "comma",
            requireLast: false,
          },
        },
      ],
      "style/jsx-quotes": ["error", "prefer-single"], // Enforce single quotes in JSX,
    },
  }),
  markdown(),
  ...tailwind.configs["flat/recommended"],
  jsxA11y.flatConfigs.recommended,
  {
    files: ["**/*.test.ts?(x)"],
    ...testingLibrary.configs["flat/react"],
    ...jestDom.configs["flat/recommended"],
  },
  {
    files: ["**/*.spec.ts", "**/*.e2e.ts"],
    ...playwright.configs["flat/recommended"],
  },
  {
    rules: {
      "import/order": "off", // Avoid conflicts with `simple-import-sort` plugin
      "sort-imports": "off", // Avoid conflicts with `simple-import-sort` plugin
      "node/prefer-global/process": "off", // Allow using `process.env`
      "unused-imports/no-unused-vars": "off",
      // 'testing-library/padding-around-all': 'error', // Add padding in test files
      // 'testing-library/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles,
    },
  }
)

async function next() {
  return [
    {
      name: "antfu/next/setup",
      plugins: {
        "@next/next": nextPlugin,
      },
      rules: {
        ...nextPlugin.configs["core-web-vitals"].rules,
        ...nextPlugin.configs.recommended.rules,
      },
    },
  ]
}
