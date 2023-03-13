module.exports = (api) => {
  api.cache.using(() => process.env.STORYBOOK);
  const appComponent = process.env.STORYBOOK === '1' ? './App.storybook' : './App';

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ts', '.tsx', '.ios.tsx', '.android.tsx', '.json'],
          alias: {
            '@/App': appComponent,
            src: './src',
            tests: './tests',
          },
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  };
};
