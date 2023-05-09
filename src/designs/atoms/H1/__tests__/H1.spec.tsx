import React from 'react';
import { render as testRender, cleanup } from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { H1 } from '../H1';
import type { H1Props } from '../H1';

const render = (props: H1Props): ReturnType<typeof testRender> =>
  testRender(withDripsy(<H1 {...props} />));

describe('atoms/H1', () => {
  const LABEL = 'Heading 1';

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
