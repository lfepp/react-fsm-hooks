const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  extends: ['react-app', 'plugin:prettier/recommended'],
  plugins: ['react-hooks'],
  env: { browser: true },
  settings: {
    'import/core-modules': ['csstype'],
    'import/ignore': [/node_modules/],
  },
  rules: {
    'arrow-parens': [ERROR, 'as-needed'],
    camelcase: OFF,
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      ERROR,
      {
        packageDir: __dirname,
      },
    ],
    'react/jsx-boolean-value': [ERROR, 'always'],
  },
};
