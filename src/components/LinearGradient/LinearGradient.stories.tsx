import React from 'react';
import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { Text } from 'src/designs';
import { LinearGradient } from './LinearGradient';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'components/LinearGradient',
  component: LinearGradient,
  args: {
    color: '#ffffff',
    direction: 'to-down',
  },
  argTypes: {
    color: {
      name: 'color',
      type: { name: 'string', required: true },
      description: '그라데이션 색상',
      options: ['to-down', 'to-up'],
      control: { type: 'select' },
    },
    direction: {
      name: 'direction',
      description: '그라데이션 방향',
      type: { name: 'number' },
      control: { type: 'number' },
    },
  },
} as Meta<typeof LinearGradient>;

type LinearGradientProps = ComponentProps<typeof LinearGradient>;
type LinearGradientStory = StoryFn<typeof LinearGradient>;

const templateStyle = { width: 300 };

const Template = (args: LinearGradientProps) => (
  <View style={templateStyle}>
    <Text sx={{ position: 'absolute', top: 0, left: 0 }} variant="primary">
      우리 모두의 성장을 위해, Up
    </Text>
    <LinearGradient {...args} />
  </View>
);

export const Default: LinearGradientStory = (args: LinearGradientProps) => {
  return <Template {...args} />;
};

Default.args = {
  style: {
    width: '100%',
    height: 50,
  },
};
