import React from 'react';
import { render as testRender, screen, fireEvent, cleanup } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { withDripsy } from 'tests/utils';
import { getColors } from 'src/themes/utils';
import { Button } from '../Button';

import type { colors } from 'src/themes/colors';
import type { ButtonProps } from '../Button';

const render = (props: ButtonProps): ReturnType<typeof testRender> => (
  testRender(
    withDripsy(
      <Button
        accessibilityRole="button"
        {...props}
      />
    )
  )
);

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

  describe('버튼 라벨을 지정했을 때', () => {
    it('라벨이 버튼 텍스트에 표기되어야 한다', () => {
      render({ label, color });
      expect(screen.getByText(label)).not.toBeNull();
    });
  });

  describe('버튼을 클릭했을 때', () => {
    let onPress: jest.Mock;

    beforeEach(() => {
      onPress = jest.fn();
    });

    it('onPress 이벤트 핸들러가 호출되어야 한다', () => {
      render({ label, color, onPress });
  
      fireEvent(screen.getByText(label), 'press');
      expect(onPress).toHaveBeenCalled();
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});
