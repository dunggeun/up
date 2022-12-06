import React from 'react';
import { render as testRender, cleanup } from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { H2 } from '../H2';

import type { H2Props } from '../H2';

const render = (props: H2Props): ReturnType<typeof testRender> =>
  testRender(withDripsy(<H2 {...props} />));

describe('atoms/H2', () => {
  const LABEL = 'Heading 2';

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
