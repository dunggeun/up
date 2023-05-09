import React from 'react';
import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { Demo } from './Demo';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'components/Demo',
  component: Demo,
} as Meta<typeof Demo>;

type DemoProps = ComponentProps<typeof Demo>;
type DemoStory = StoryFn<typeof Demo>;

const templateStyle = { flex: 1 };

const Template = (args: DemoProps) => (
  <View style={templateStyle}>
    <Demo {...args} />
  </View>
);

export const A: DemoStory = (args: DemoProps) => {
  return <Template {...args} />;
};

export const B: DemoStory = (args: DemoProps) => {
  return <Template {...args} />;
};

A.args = {
  text: 'Type A',
};

B.args = {
  text: 'Type B',
};
