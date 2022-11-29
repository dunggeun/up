import React from 'react';
import { View } from 'dripsy';
import { Input } from './Input';

import type { ComponentMeta } from '@storybook/react';
import type { InputProps } from './Input';

export default {
  title: 'atoms/Input',
  component: Input,
  args: {},
} as ComponentMeta<typeof Input>;

const Template = (args: InputProps) => (
  <View sx={{ flex: 1, padding: '$04' }}>
    <Input {...args} />
  </View>
);

export const $Default = Template.bind({});
// @ts-ignore
$Default.args = {
  placeholder: 'Input',
};

export const $Multiline = Template.bind({});
// @ts-ignore
$Multiline.args = {
  placeholder: 'Input',
  multiline: true,
  numberOfLines: 5,
};
