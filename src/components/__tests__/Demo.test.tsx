import React from 'react';
import { render } from '@testing-library/react-native';
import { Demo } from '../Demo';

describe('demo', () => {
  it('renders correctly', () => {
    const view = render(<Demo />);
    expect(view.toJSON()).not.toBeNull();
  });
});
