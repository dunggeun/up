import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { MenuScreen } from '../MenuScreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMockedProps = (): any => ({
  navigation: {
    goBack: jest.fn(),
  },
});

describe('screens/MenuScreen', () => {
  afterEach(() => {
    cleanup();
  });

  it('렌더링이 정상적으로 되어야 한다', () => {
    render(withDripsy(<MenuScreen {...getMockedProps()} />));
  });
});
