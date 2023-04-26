import React from 'react';
import { ScrollView } from 'react-native';
import { colors } from 'src/themes/colors';
import { H1, H2, H3, Text } from 'src/designs';

export interface DemoProps {
  text: string;
}

export function Demo({ text }: DemoProps): JSX.Element {
  return (
    <ScrollView>
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <Text>Default: {text}</Text>
      {Object.keys(colors).map((color) => {
        return <Text key={color} sx={{ color }}>{`${color}: ${text}`}</Text>;
      })}
    </ScrollView>
  );
}
