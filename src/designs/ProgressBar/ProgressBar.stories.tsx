import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { View } from 'dripsy';
import { getColors } from 'src/themes/utils';
import { ProgressBar } from './ProgressBar';
import type { ProgressBarProps } from './ProgressBar';
import type { Meta } from '@storybook/react';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
  args: {
    color: '$blue',
  },
  value: {
    name: 'value',
    type: { name: 'number', required: true },
    description: '프로그레스바 현재값',
    table: {
      type: { summary: 'number' },
    },
    control: { type: 'number' },
  },
  max: {
    name: 'max',
    type: { name: 'number', required: true },
    description: '프로그레스바 최대값',
    table: {
      type: { summary: 'number' },
    },
    control: { type: 'number' },
  },
  color: {
    name: 'color',
    description: '프로그레스바 색상',
    type: { name: 'string', required: true },
    options: getColors(),
    control: { type: 'select' },
  },
} as Meta<typeof ProgressBar>;

const Template = (args: ProgressBarProps) => {
  const [max, setMax] = useState(100);
  const [value, setValue] = useState(50);

  const toNumber = (stringValue: string) => {
    try {
      return parseInt(stringValue, 10) || 0;
    } catch {
      return 0;
    }
  };

  const handleChangeMax = (text: string) => {
    setMax(toNumber(text));
  };

  const handleChangeValue = (text: string) => {
    setValue(toNumber(text));
  };

  return (
    <View sx={{ flex: 1, padding: '$04' }}>
      <ProgressBar {...args} max={max} value={value} />
      <View sx={{ marginTop: '$04' }}>
        <TextInput
          accessibilityHint="Test field"
          accessibilityLabel="Maximum limit field"
          onChangeText={handleChangeMax}
          placeholder="max"
          value={String(max)}
        />
        <TextInput
          accessibilityHint="Test field"
          accessibilityLabel="Value field"
          onChangeText={handleChangeValue}
          placeholder="value"
          value={String(value)}
        />
      </View>
    </View>
  );
};

export const Default = Template.bind({});
// @ts-ignore
Default.args = {};
