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

  describe('렌더링 되었을 때', () => {
    it('스냅샷이 일치해야 한다', () => {
      const tree = render(
        withDripsy(<MenuScreen {...getMockedProps()} />),
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
