import React from 'react';
import {
  screen,
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { t } from 'src/translations';
import { DataManagementScreen } from '../DataManagementScreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMockedProps = (): any => ({
  navigation: {
    goBack: jest.fn(),
  },
});

describe('screens/DataManagementScreen', () => {
  afterEach(() => {
    cleanup();
  });

  describe('데이터 초기화 버튼을 눌렀을 때', () => {
    beforeEach(() => {
      const props = getMockedProps();
      render(withDripsy(<DataManagementScreen {...props} />));
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
