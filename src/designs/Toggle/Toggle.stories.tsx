import React from 'react';
import { View } from 'dripsy';
import { Toggle, type ToggleProps } from './Toggle';
import type { Meta } from '@storybook/react';

export default {
  title: 'Toggle',
  component: Toggle,
  args: {
    color: '$blue',
  },
} as Meta<typeof Toggle>;

const Template = (args: ToggleProps) => (
  <View sx={{ flex: 1, padding: '$04' }}>
    <Toggle {...args} />
  </View>
);

export const Default = Template.bind({});
// @ts-ignore
Default.args = {};
