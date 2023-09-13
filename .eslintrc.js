module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
    // ... any other presets you use
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json'
    ]
  },
  ignorePatterns: [
    './knexfile.ts', './migrations'
  ],
  rules: {
    // ... your custom rules here
  }
}
