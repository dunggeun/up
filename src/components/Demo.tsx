import React from 'react';
import { DripsyProvider, Text } from 'dripsy';
import { themeLight } from 'src/themes';

export interface DemoProps { text: string }

export function Demo ({ text }: DemoProps): JSX.Element {
  return (
    <DripsyProvider theme={themeLight}>
      <Text>{text}</Text>
    </DripsyProvider>
  );
}
