import React from 'react';
import { render as testRender, cleanup } from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { H3 } from '../H3';
import type { H3Props } from '../H3';

const render = (props: H3Props): ReturnType<typeof testRender> =>
  testRender(withDripsy(<H3 {...props} />));

describe('H3', () => {
  const LABEL = 'Heading 3';

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
