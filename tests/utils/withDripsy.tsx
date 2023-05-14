import React from 'react';
import { DripsyProvider } from 'dripsy';
import { themeLight } from 'src/themes';

export const withDripsy = (
  component: React.ReactElement,
): React.ReactElement => (
  <DripsyProvider theme={themeLight}>{component}</DripsyProvider>
);
