import React from 'react';
import { View } from 'dripsy';
import { H1 } from './H1';

import type { ComponentProps } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'components/H1',
  component: H1,
} as ComponentMeta<typeof H1>;

type H1Props = ComponentProps<typeof H1>;
type H1Story = ComponentStory<typeof H1>;

const Template = (args: H1Props) => (
  <View sx={{ flex: 1, padding: '$04' }}>
    <H1 {...args} />
  </View>
);

export const Default: H1Story = (args: H1Props) => {
  return <Template {...args} />;
};

Default.args = {
  children: 'Heading 1',
};
