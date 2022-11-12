module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.ios.tsx', '.android.tsx', '.json'],
        alias: {
          src: './src',
        },
      },
    ],
  ],
};
