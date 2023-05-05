const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

/**
 * @todo 추후 커스텀 touchable 컴포넌트 구현시 해당 컴포넌트 이름으로 설정
 */
const CUSTOM_TOUCHABLE_COMPONENTS = ['CustomButton'];

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@react-native',
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    'plugin:react-native-a11y/all',
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)'],
      rules: {
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'object-curly-spacing': ['error', 'always'],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'type',
            ],
          },
        ],
        'no-void': 'off',
        'no-bitwise': 'off',
        'array-bracket-spacing': 'off',
        'unicorn/filename-case': 'off',
        'react-native-a11y/has-accessibility-props': [
          'error',
          {
            touchables: CUSTOM_TOUCHABLE_COMPONENTS,
          },
        ],
        'react-native-a11y/has-valid-accessibility-descriptors': [
          'error',
          {
            touchables: CUSTOM_TOUCHABLE_COMPONENTS,
          },
        ],
        '@typescript-eslint/prefer-reduce-type-parameter': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-default-export': 'off',
        '@typescript-eslint/consistent-type-imports': 'off'
      },
    },
    {
      files: ['src/stores/machines/**/*.ts'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
      },
    },
    {
      files: ['**/?(*.)+(spec|test).ts?(x)'],
      rules: {
        'testing-library/no-render-in-setup': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
    {
      files: ['**/assets/icons/*.tsx', '**/assets/symbols/*.tsx'],
      rules: {
        'import/no-named-as-default': 'off',
      },
    },
    {
      files: ['**/*.stories.tsx', '**/*.storybook.tsx'],
      rules: {
        'camelcase': 'off',
        'import/no-default-export': 'off',
        'react/function-component-definition': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
};
