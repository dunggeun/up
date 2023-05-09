import React from 'react';
import { faker } from '@faker-js/faker';
import {
  render as testRender,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { t } from 'src/translations';
import { AppBar } from '../AppBar';
import type { AppBarProps } from '../AppBar';

const render = (props: AppBarProps): ReturnType<typeof testRender> =>
  testRender(withDripsy(<AppBar {...props} />));

describe('molecules/AppBar', () => {
  describe('앱바 제목을 지정했을 때', () => {
    let title = '';

    beforeEach(() => {
      title = faker.word.noun();
    });

    afterEach(() => {
      cleanup();
    });

    it('제목이 앱바에 노출되어야 한다', () => {
      render({ title });
      expect(screen.getByLabelText(title)).not.toBeNull();
    });
  });

  describe('앱바 제어 버튼', () => {
    describe('뒤로가기 버튼', () => {
      const A11Y_HINT = t('label.go_back');

      describe('뒤로가기 버튼 이벤트 핸들러가 존재하는 경우', () => {
        let onBackPress: jest.Mock;

        beforeEach(() => {
          onBackPress = jest.fn();
        });

        it('onBackPress 이벤트 핸들러가 호출되어야 한다', () => {
          render({ onBackPress });

          fireEvent(screen.getByA11yHint(A11Y_HINT), 'press');
          expect(onBackPress).toHaveBeenCalled();
          expect(onBackPress).toHaveBeenCalledTimes(1);
        });
      });

      describe('뒤로가기 버튼 이벤트 핸들러가 존재하지 않는 경우', () => {
        it('뒤로가기 버튼이 렌더링 되지 않아야 한다', () => {
          render({});

          expect(screen.queryByA11yHint(A11Y_HINT)).toBeNull();
        });
      });
    });

    describe('닫기 버튼', () => {
      const A11Y_HINT = t('label.close');

      describe('닫기 버튼 이벤트 핸들러가 존재하는 경우', () => {
        let onClosePress: jest.Mock;

        beforeEach(() => {
          onClosePress = jest.fn();
        });

        it('onClosePress 이벤트 핸들러가 호출되어야 한다', () => {
          render({ onClosePress });

          fireEvent(screen.getByA11yHint(A11Y_HINT), 'press');
          expect(onClosePress).toHaveBeenCalled();
          expect(onClosePress).toHaveBeenCalledTimes(1);
        });
      });

      describe('닫기 버튼 이벤트 핸들러가 존재하지 않는 경우', () => {
        it('닫기 버튼이 렌더링 되지 않아야 한다', () => {
          render({});

          expect(screen.queryByA11yHint(A11Y_HINT)).toBeNull();
        });
      });
    });
  });
});
