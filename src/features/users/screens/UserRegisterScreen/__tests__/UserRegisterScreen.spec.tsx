import React from 'react';
import { faker } from '@faker-js/faker';
import {
  render as testRender,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react-native';
import * as AppHelpers from 'src/modules/app/helpers';
import { withReactQuery, withDripsy } from 'tests/utils';
import { t } from 'src/translations';
import { UserRegisterScreen } from '../UserRegisterScreen';

const render = (
  component: React.ReactElement,
): ReturnType<typeof testRender> => {
  return testRender(withReactQuery(withDripsy(component)));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMockedProps = (): any => ({
  navigation: {
    goBack: jest.fn(),
  },
});

describe('screens/UserRegisterScreen', () => {
  let mockedProps: ReturnType<typeof getMockedProps>;

  beforeEach(() => {
    mockedProps = getMockedProps();
    render(<UserRegisterScreen {...mockedProps} />);
  });

  afterEach(() => {
    cleanup();
  });

  describe('렌더링 되었을 때', () => {
    it('스냅샷이 일치해야 한다', () => {
      const tree = screen.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('사용자 이름이 이름이 2글자 미만일 때', () => {
    beforeEach(() => {
      const titlePlaceholder = screen.getByPlaceholderText(
        t('placeholder.enter_name'),
      );
      fireEvent.changeText(
        titlePlaceholder,
        faker.helpers.arrayElement(['', faker.random.alpha(1)]),
      );
    });

    it('레벨업 하러가기 버튼이 비활성화 되어있어야 한다', () => {
      const nextButton = screen.getByRole('button', { disabled: true });
      expect(nextButton).not.toBeNull();
    });
  });

  describe('임무 이름이 2글자 이상일 때', () => {
    beforeEach(() => {
      const titlePlaceholder = screen.getByPlaceholderText(
        t('placeholder.enter_name'),
      );
      fireEvent.changeText(titlePlaceholder, faker.random.alpha(5));
    });

    it('레벨업 하러가기 버튼이 활성화 되어있어야 한다', () => {
      const nextButton = screen.getByRole('button');
      expect(nextButton.props).toHaveProperty('accessibilityState', {
        disabled: false,
      });
    });

    describe('사용자 이름 입력 화면에서 레벨업 하러가기 버튼을 누르면', () => {
      let createUserDataSpy: jest.SpyInstance;

      beforeEach(() => {
        createUserDataSpy = jest.spyOn(AppHelpers, 'createUserData');
        const nextButton = screen.getByText(t('label.go_level_up'));
        fireEvent(nextButton, 'press');
      });

      afterEach(() => {
        createUserDataSpy.mockRestore();
      });

      it('신규 사용자 데이터를 생성해야 한다', () => {
        expect(createUserDataSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('뒤로가기 버튼을 눌렀을 때', () => {
    beforeEach(() => {
      render(<UserRegisterScreen {...mockedProps} />);
      const closeButton = screen.getByLabelText(t('label.go_back'));
      fireEvent(closeButton, 'press');
    });

    it('navigation.goBack()이 호출되어야 한다', () => {
      expect(mockedProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
