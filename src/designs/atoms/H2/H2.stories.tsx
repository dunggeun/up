import React from 'react';
import { View } from 'dripsy';
import { H2 } from './H2';

import type { ComponentProps } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'components/H2',
  component: H2,
} as ComponentMeta<typeof H2>;

type H2Props = ComponentProps<typeof H2>;
type H2Story = ComponentStory<typeof H2>;

const Template = (args: H2Props) => (
  <View sx={{ flex: 1, padding: '$04' }}>
    <H2 {...args} />
  </View>
);

export const Default: H2Story = (args: H2Props) => {
  return <Template {...args} />;
};

Default.args = {
  children: 'Heading 2',
};
