import { transformIgnorePackages } from './shares';

const config = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/tests/setup.ts',
  ],
  transformIgnorePatterns: [
    `node_modules/(?!${transformIgnorePackages.join('|')})`,
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.web.{ts,tsx}',
    '!**/assets/*.{ts,tsx}',
    '!**/index.ts',
    '!**/*.d.ts',
    '!**/*.stories.tsx',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
} as const;

// eslint-disable-next-line import/no-default-export
export default config;
