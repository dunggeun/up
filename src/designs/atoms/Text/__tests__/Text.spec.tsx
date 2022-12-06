import React from 'react';
import { render as testRender, cleanup } from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { Text } from '../Text';

import type { TextProps } from '../Text';

const render = (props: TextProps): ReturnType<typeof testRender> =>
  testRender(withDripsy(<Text {...props} />));

describe('atoms/Text', () => {
  const LABEL = 'Text';

  afterEach(() => {
    cleanup();
  });

  describe('렌더링 되었을 때', () => {  
    it('스냅샷이 일치해야 한다', () => {
      const tree = render({ children: LABEL }).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
