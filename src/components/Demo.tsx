import React from 'react';
import { ScrollView } from 'react-native';
import { H1, H2, H3, P } from 'dripsy';
import { colors } from 'src/themes/colors';

export interface DemoProps { text: string }

export function Demo ({ text }: DemoProps): JSX.Element {
  return (
    <ScrollView>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <P>Default: {text}</P>
      {Object.keys(colors).map((color) => {
        return <P key={color} sx={{ color }}>{`${color}: ${text}`}</P>;
      })}
    </ScrollView>
  );
}
