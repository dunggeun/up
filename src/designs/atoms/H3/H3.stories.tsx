import React from 'react';
import { View } from 'dripsy';
import { H3 } from './H3';

import type { ComponentProps } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'components/H3',
  component: H3,
} as ComponentMeta<typeof H3>;

type H3Props = ComponentProps<typeof H3>;
type H3Story = ComponentStory<typeof H3>;

const Template = (args: H3Props) => (
  <View sx={{ flex: 1, padding: '$04' }}>
    <H3 {...args} />
  </View>
);

export const Default: H3Story = (args: H3Props) => {
  return <Template {...args} />;
};

Default.args = {
  children: 'Heading 3',
};
