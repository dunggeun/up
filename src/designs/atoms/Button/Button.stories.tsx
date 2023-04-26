import React from 'react';
import { View } from 'dripsy';
import { getColors } from 'src/themes/utils';
import { Button } from './Button';

import type { Meta } from '@storybook/react';
import type { ButtonProps } from './Button';

export default {
  title: 'atoms/Button',
  component: Button,
  args: {
    label: 'Button!',
    color: '$blue',
  },
  argTypes: {
    color: {
      name: 'color',
      description: '버튼 색상',
      type: { name: 'string', required: true },
      options: getColors(),
      control: { type: 'select' },
    },
    disabled: {
      name: 'disabled',
      description: '비활성화 여부',
      type: { name: 'boolean' },
      control: { type: 'boolean' },
    },
  },
} as Meta<typeof Button>;

const Template = (args: ButtonProps) => (
  <View sx={{ flex: 1, padding: '$04' }}>
    <Button {...args} />
  </View>
);

const DummyAdornment = () => (
  <View sx={{ width: 24, height: 24, backgroundColor: 'gray' }} />
);

export const $Default = Template.bind({});
// @ts-ignore
$Default.args = {
  children: 'Button',
};

export const $Disabled = Template.bind({});
// @ts-ignore
$Disabled.args = {
  children: 'Disabled',
  disabled: true,
};

export const $WithLeftAdornment = Template.bind({});
// @ts-ignore
$WithLeftAdornment.args = {
  children: 'Left',
  leftAdornment: <DummyAdornment />,
};

export const $WithRightAdornment = Template.bind({});
// @ts-ignore
$WithRightAdornment.args = {
  children: 'Right',
  rightAdornment: <DummyAdornment />,
};

export const $WithAdornments = Template.bind({});
// @ts-ignore
$WithAdornments.args = {
  children: 'Both',
  leftAdornment: <DummyAdornment />,
  rightAdornment: <DummyAdornment />,
};
