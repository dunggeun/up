import React, { type PropsWithChildren } from 'react';
import {
  render as testRender,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { withDripsy } from 'tests/utils';
import { getColors } from 'src/themes/utils';
import { Button } from '../Button';

import type { colors } from 'src/themes/colors';
import type { ButtonProps } from '../Button';

const render = (
  props: PropsWithChildren<ButtonProps>,
): ReturnType<typeof testRender> =>
  testRender(withDripsy(<Button {...props} />));

describe('atoms/Button', () => {
  let label = '';
  let color: keyof typeof colors;

  beforeEach(() => {
    label = faker.word.noun();
    color = faker.helpers.arrayElement<keyof typeof colors>(getColors());
  });

  afterEach(() => {
    cleanup();
  });

  describe('버튼 자식이 존재할 때', () => {
    beforeEach(() => {
      render({ children: label, color });
    });

    it('자식이 버튼 내에 렌더링 되어야 한다', () => {
      expect(screen.getByText(label)).not.toBeNull();
    });
  });

  describe('버튼을 클릭했을 때', () => {
    let onPress: jest.Mock;

    beforeEach(() => {
      onPress = jest.fn();
      render({ children: label, color, onPress });
      fireEvent(screen.getByText(label), 'press');
    });

    it('onPress 이벤트 핸들러가 호출되어야 한다', () => {
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
