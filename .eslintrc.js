module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "airbnb-typescript/base",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "no-control-regex": "off",
    "import/no-cycle": "off",
    "default-case": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: 'default',
        format: ["camelCase", 'snake_case'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        format: ['snake_case', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: "enumMember",
        format: ["PascalCase"]
      },
      {
        selector: "function",
        format: ["PascalCase", "snake_case",]
      },
      {
        selector: ["objectLiteralProperty"],
        format: ["PascalCase", "snake_case", "camelCase", "UPPER_CASE"],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      }
    ],
    "no-await-in-loop": "off",
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "no-restricted-syntax": ["off", "BinaryExpression[operator='of']"],
    // This should be turned on as there is no reason to use dangling underscores in typescript
    // as it supports truly private members and whatnot. The only reason this is turned of is because
    // Prisma uses dangling underscores in their aggregation methods
    "no-underscore-dangle": ["off"],
    // Not a problem for node environments
    "no-multi-str": "off"
  },
  ignorePatterns: [".eslintrc.js"],
};
