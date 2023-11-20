module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended','plugin:prettier/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-props-no-spreading':['off'],
    'import/extensions': [ 'error', 'ignorePackages', { 'js': 'never', 'jsx': 'never', 'ts': 'never', 'tsx': 'never' } ],
    'react/react-in-jsx-scope': 'off',
    'import/extensions': ['error', 'ignorePackages', {
      'js': 'never',
      'jsx': 'never',
      'ts': 'never',
      'tsx': 'never'
    }],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies':'off',
    'prettier/prettier':[
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'no-use-before-define': [
      'error',
      {
          'functions': false,
          'classes': false,
          'variables': false
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 'off'
  },
}
