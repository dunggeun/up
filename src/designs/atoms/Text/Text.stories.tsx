import React, { type ComponentProps } from 'react';
import { View } from 'dripsy';
import { Text } from './Text';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'components/Text',
  component: Text,
} as Meta<typeof Text>;

type TextProps = ComponentProps<typeof Text>;
type TextStory = StoryFn<typeof Text>;

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
