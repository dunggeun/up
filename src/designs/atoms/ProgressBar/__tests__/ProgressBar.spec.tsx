import React from 'react';
import { render as testRender, screen, cleanup } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { withDripsy } from 'tests/utils';
import { getColors } from 'src/themes/utils';
import { ProgressBar } from '../ProgressBar';

import type { ProgressBarProps } from '../ProgressBar';
import type { colors } from 'src/themes/colors';

const render = (props: ProgressBarProps): ReturnType<typeof testRender> =>
  testRender(withDripsy(<ProgressBar {...props} />));

describe('atoms/ProgressBar', () => {
  afterEach(() => {
    cleanup();
  });

  describe('값을 지정했을 때', () => {
    const MIN = 0;
    let value: number;
    let max: number;
    let color: keyof typeof colors;

    beforeEach(() => {
      max = faker.datatype.number({ min: 50, max: 100 });
      value = faker.datatype.number({ min: MIN, max });
      color = faker.helpers.arrayElement<keyof typeof colors>(getColors());
      render({ value, max, color });
    });
  
    it('a11y value 속성이 정상적으로 설정되어야 한다', () => {
      const progressBar = screen.getByRole('progressbar', {
        value: { min: MIN, max, now: value },
      });
      expect(progressBar).not.toBeNull();
    });
  });
});
