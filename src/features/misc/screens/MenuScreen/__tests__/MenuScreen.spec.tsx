import React from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { t } from 'src/translations';

import { MenuScreen } from '../MenuScreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMockedProps = (): any => ({
  navigation: {
    goBack: jest.fn(),
  },
});

describe('screens/MenuScreen', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링 되었을 때', () => {
    it('스냅샷이 일치해야 한다', () => {
      const tree = render(
        withDripsy(<MenuScreen {...getMockedProps()} />),
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('데이터 초기화 버튼을 눌렀을 때', () => {
    beforeEach(() => {
      const props = getMockedProps();
      render(withDripsy(<MenuScreen {...props} />));
      const resetButton = screen.getByText(t('label.reset_data'));
      fireEvent(resetButton, 'press');
    });

    it('삭제 확인 모달이 노출되어야 한다', () => {
      const deleteConfirmModalContent = screen.getByTestId(
        'delete-confirm-modal',
      );
      expect(deleteConfirmModalContent).not.toBeNull();
    });
  });
});
