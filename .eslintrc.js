const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

/**
 * @todo 추후 커스텀 touchable 컴포넌트 구현시 해당 컴포넌트 이름으로 설정
 */
const CUSTOM_TOUCHABLE_COMPONENTS = ['CustomButton'];

module.exports = {
  root: true,
  extends: [
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
      },
    },
    {
      files: ['**/?(*.)+(spec|test).ts?(x)'],
      extends: [require.resolve('@vercel/style-guide/eslint/jest')],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
    {
      files: ['**/*.stories.tsx', '**/*.storybook.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'react/function-component-definition': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
