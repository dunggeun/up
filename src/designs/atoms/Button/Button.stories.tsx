import React from 'react';
import { View } from 'dripsy';
import { getColors } from 'src/themes/utils';
import { Button } from './Button';

import type { ComponentMeta } from '@storybook/react';
import type { ButtonProps } from './Button';

export default {
  title: 'atoms/Button',
  component: Button,
  args: {
    label: 'Button!',
    color: '$blue',
  },
  argTypes: {
    label: {
      name: 'label',
      type: { name: 'string', required: true },
      description: '버튼 라벨',
      table: {
        type: { summary: 'string' },
      },
      control: { type: 'text' },
    },
    color: {
      name: 'color',
      description: '버튼 색상',
      type: { name: 'string', required: true },
      options: getColors(),
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template = (args: ButtonProps) => (
  <View sx={{ flex: 1, padding: '$04' }}>
    <Button {...args} />
  </View>
);

const DummyAdornment = () => (<View sx={{ width: 24, height: 24, backgroundColor: 'gray' } } />);

export const $Default = Template.bind({});
// @ts-ignore
$Default.args = {
  label: 'Button',
};

export const $WithLeftAdornment = Template.bind({});
// @ts-ignore
$WithLeftAdornment.args = {
  label: 'Left',
  leftAdornment: <DummyAdornment />
};

export const $WithRightAdornment = Template.bind({});
// @ts-ignore
$WithRightAdornment.args = {
  label: 'Right',
  rightAdornment: <DummyAdornment />
};

export const $WithAdornments = Template.bind({});
// @ts-ignore
$WithAdornments.args = {
  label: 'Both',
  leftAdornment: <DummyAdornment />,
  rightAdornment: <DummyAdornment />
};
