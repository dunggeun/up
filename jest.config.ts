const TRANSFORM_IGNORE_PACKAGES = [
  '@react-native',
  '@dripsy/core',
  '@expo',
  'react-native',
  'dripsy',
] as const;

const config = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/tests/setup.ts',
  ],
  transformIgnorePatterns: [
    `node_modules/(?!${TRANSFORM_IGNORE_PACKAGES.join('|')})`,
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/*.d.ts', '!**/index.ts'],
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
