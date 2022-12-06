import React from 'react';
import { View } from 'dripsy';
import { Text } from './Text';

import type { ComponentProps } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'components/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

type TextProps = ComponentProps<typeof Text>;
type TextStory = ComponentStory<typeof Text>;

const Template = (args: TextProps) => (
  <View sx={{ flex: 1, padding: '$04' }}>
    <Text {...args} />
  </View>
);

export const Default: TextStory = (args: TextProps) => {
  return <Template {...args} />;
};

Default.args = {
  children: 'Text',
};
