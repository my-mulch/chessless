module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-return-assign': [0],
    'object-curly-newline': [0],
    'no-unused-expressions': [0],
    'no-restricted-syntax': [0],
    'no-restricted-globals': [0],
    'import/extensions': [0],
    'no-undef': [0],
    'no-param-reassign': [0],
    'no-plusplus': [0],
    'one-var': [0],
    'no-bitwise': [0],
    'newline-per-chained-call': [0],
    'no-console': [0],
    'one-var-declaration-per-line': [0],
    'import/prefer-default-export': [0],
  },
};
