import React from 'react';
import { DripsyProvider, Text } from 'dripsy';
import { themeLight } from 'src/themes';

export interface DemoProps { text: string }

const style = { fontFamily: 'BMJUA' };

export function Demo ({ text }: DemoProps): JSX.Element {
  return (
    <DripsyProvider theme={themeLight}>
      <Text style={style}>{text}</Text>
    </DripsyProvider>
  );
}
