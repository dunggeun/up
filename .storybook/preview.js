import { createElement } from 'react';
import { DripsyProvider } from 'dripsy';
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import { themeLight } from '../src/themes';

enableExperimentalWebImplementation(true);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    createElement(
      DripsyProvider, { theme: themeLight },
      createElement(Story),
    )
  ),
];


