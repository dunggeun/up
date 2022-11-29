import React from 'react';
import { render as testRender, screen, fireEvent, cleanup } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { withDripsy } from 'tests/utils';
import { Input } from '../Input';

import type { InputProps } from '../Input';

const render = (props: InputProps): ReturnType<typeof testRender> =>
  testRender(withDripsy(<Input {...props} />));

describe('atoms/Input', () => {
  afterEach(() => {
    cleanup();
  });

  describe('문자를 입력했을 때', () => {
    let placeholder = '';
    let onChange: jest.Mock;

    beforeEach(() => {
      placeholder = faker.word.verb();
      onChange = jest.fn();
    });
  
    it('onChange 이벤트 핸들러가 호출되어야 한다', () => {
      render({ accessibilityHint: placeholder, onChange });
  
      fireEvent(screen.getByHintText(placeholder), 'change');
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
