import React from 'react';
import { DripsyProvider } from 'dripsy';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';
import { themeLight } from '../src/themes';

export const decorators = [
  (Story) => (
    <DripsyProvider theme={themeLight}>
      <Story />
    </DripsyProvider>
  ),
  withBackgrounds,
];

export const parameters = {
  backgrounds: [
    { name: 'plain', value: 'white', default: true },
    { name: 'warm', value: 'hotpink' },
    { name: 'cool', value: 'deepskyblue' },
  ],
};
