import { createElement } from 'react';
import { DripsyProvider } from 'dripsy';
import { themeLight } from '../src/themes';

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


