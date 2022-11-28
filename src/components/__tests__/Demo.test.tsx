import React from 'react';
import { render as testRender } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { withDripsy } from 'tests/utils';
import { Demo } from '../Demo';

import type { DemoProps } from '../Demo';

const render = (props: DemoProps): ReturnType<typeof testRender> => (
  testRender(withDripsy(<Demo {...props} />))
);

describe('components/Demo', () => {
  let text: string;

  beforeEach(() => {
    text = faker.word.noun();
  });

  it('renders correctly', () => {
    const view = render({ text });
    expect(view.toJSON()).not.toBeNull();
  });
});
