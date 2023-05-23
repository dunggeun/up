import React from 'react';
import { faker } from '@faker-js/faker';
import {
  render as testRender,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { Input, type InputProps } from '../Input';

const render = (props: InputProps): ReturnType<typeof testRender> =>
  testRender(withDripsy(<Input {...props} />));

describe('Input', () => {
  afterEach(() => {
    cleanup();
  });

  describe('문자를 입력했을 때', () => {
    let placeholder = '';
    let onChange: jest.Mock;

    beforeEach(() => {
      placeholder = faker.word.verb();
      onChange = jest.fn();
      render({ accessibilityHint: placeholder, onChange });
      fireEvent(screen.getByHintText(placeholder), 'change');
    });

    it('onChange 이벤트 핸들러가 호출되어야 한다', () => {
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
