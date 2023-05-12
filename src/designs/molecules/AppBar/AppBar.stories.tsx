import React from 'react';
import { View } from 'dripsy';
import { AppBar, type AppBarProps } from './AppBar';
import type { Meta } from '@storybook/react';

export default {
  title: 'molecules/AppBar',
  component: AppBar,
  args: {
    title: 'Screen Title',
    onBackPress: undefined,
    onClosePress: undefined,
  },
  argTypes: {
    title: {
      name: 'title',
      type: { name: 'string' },
      description: '앱바 제목',
      table: {
        type: { summary: 'string' },
      },
      control: { type: 'text' },
    },
  },
} as Meta<typeof AppBar>;

const Template = (args: AppBarProps) => (
  <View sx={{ flex: 1, padding: '$04', backgroundColor: 'gray' }}>
    <AppBar {...args} />
  </View>
);

export const $Default = Template.bind({});

export const $BackButton = Template.bind({});
// @ts-ignore
$BackButton.args = {
  onBackPress: () => undefined,
};

export const $CloseButton = Template.bind({});
// @ts-ignore
$CloseButton.args = {
  onClosePress: () => undefined,
};
