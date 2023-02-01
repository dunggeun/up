import React from 'react';
import { View } from 'react-native';
import { Text } from 'src/designs';
import { LinearGradient } from './LinearGradient';

import type { ComponentProps } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'components/LinearGradient',
  component: LinearGradient,
  args: {
    color: '#ffffff',
    rotate: 0,
  },
  argTypes: {
    color: {
      name: 'color',
      type: { name: 'string', required: true },
      description: '그라데이션 색상',
      table: {
        type: { summary: 'string' },
      },
      control: { type: 'text' },
    },
    rotate: {
      name: 'rotate',
      description: '그라데이션 방향',
      type: { name: 'number' },
      control: { type: 'number' },
    },
    fromOpacity: {
      name: 'fromOpacity',
      description: '그라데이션 시작 투명도',
      type: { name: 'number' },
      control: { type: 'number' },
    },
    toOpacity: {
      name: 'toOpacity',
      description: '그라데이션 종료 투명도',
      type: { name: 'number' },
      control: { type: 'number' },
    },
  },
} as ComponentMeta<typeof LinearGradient>;

type LinearGradientProps = ComponentProps<typeof LinearGradient>;
type LinearGradientStory = ComponentStory<typeof LinearGradient>;

const templateStyle = { width: 300 };

const Template = (args: LinearGradientProps) => (
  <View style={templateStyle}>
    <Text
      sx={{ position: 'absolute', top: 0, left: 0 }}
      variant="primary"
    >
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
  fromOpacity: 1,
  toOpacity: 0,
};
