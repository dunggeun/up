import React, { useState } from 'react';
import { View } from 'dripsy';
import { Text } from '../Text';
import { Select } from './Select';

import type { Meta } from '@storybook/react';

export default {
  title: 'atoms/Select',
  component: Select.Root,
} as Meta<typeof Select.Root>;

const ITEMS = [
  { label: 'Apple', value: 'value_apple' },
  { label: 'Banana', value: 'value_banana' },
] as const;

const Template = () => {
  const [value, setValue] = useState<string>(ITEMS[0].value);

  return (
    <View sx={{ flex: 1, padding: '$04', gap: '$04' }}>
      <View>
        <Text>value: {value}</Text>
      </View>
      <Select.Root initialValue={ITEMS[0]} onChange={setValue}>
        <Select.Trigger />
        <Select.Content>
          {ITEMS.map((item) => (
            <Select.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Select.Content>
      </Select.Root>
    </View>
  );
};

export const $Default = Template.bind({});
// @ts-ignore
$Default.args = {};
