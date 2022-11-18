import React from 'react';
import { DripsyProvider, View } from 'dripsy';
import { themeLight } from 'src/themes';

export function Demo (): JSX.Element {
  return <DripsyProvider theme={themeLight}><View/></DripsyProvider>;
}
