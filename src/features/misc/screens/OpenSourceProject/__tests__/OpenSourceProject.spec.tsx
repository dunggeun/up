import React from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react-native';
import { withDripsy } from 'tests/utils';
import { t } from 'src/translations';
import { OpenSourceProjectScreen } from '../OpenSourceProjectScreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMockedProps = (): any => ({
  navigation: {
    goBack: jest.fn(),
  },
});

describe('screens/OpenSourceProjectScreen', () => {
  afterEach(() => {
    cleanup();
  });

  describe('렌더링 되었을 때', () => {
    it('스냅샷이 일치해야 한다', () => {
      const tree = render(
        withDripsy(<OpenSourceProjectScreen {...getMockedProps()} />),
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('뒤로가기 버튼을 눌렀을 때', () => {
    it('navigation.goBack()이 호출되어야 한다', () => {
      const props = getMockedProps();
      render(withDripsy(<OpenSourceProjectScreen {...props} />));
      const appBarBackButton = screen.getByLabelText(t('label.go_back'));
      fireEvent(appBarBackButton, 'press');
      expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
