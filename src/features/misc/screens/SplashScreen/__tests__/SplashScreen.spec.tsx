import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { SplashScreen } from '../SplashScreen';

describe('screens/SplashScreen', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링 되었을 때', () => {
    it('스냅샷이 일치해야 한다', () => {
      const tree = render(withDripsy(<SplashScreen />)).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
