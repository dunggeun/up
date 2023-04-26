import React from 'react';
import {
  render as testRender,
  screen,
  cleanup,
} from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { withDripsy } from 'tests/utils';
import { getColors } from 'src/themes/utils';
import { Tag } from '../Tag';

import type { colors } from 'src/themes/colors';
import type { TagProps } from '../Tag';

const render = (props: TagProps): ReturnType<typeof testRender> =>
  testRender(withDripsy(<Tag {...props} />));

describe('atoms/Tag', () => {
  afterEach(() => {
    cleanup();
  });

  describe('태그 라벨을 지정했을 때', () => {
    let label = '';
    let color: keyof typeof colors;

    beforeEach(() => {
      label = faker.word.noun();
      color = faker.helpers.arrayElement<keyof typeof colors>(getColors());
    });

    it('라벨이 렌더링 되어야 한다', () => {
      render({ label, color });

      expect(screen.getByText(label)).not.toBeNull();
    });
  });
});
