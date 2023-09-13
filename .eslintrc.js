module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint'
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
      // ... any other presets you use
    ],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: [
        './tsconfig.json'
      ]
    },
    ignorePatterns: [
    ],
    rules: {
      // ... your custom rules here
      'indent': 'off',
      '@typescript-eslint/indent': 'off',
    }
  }