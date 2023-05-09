import React from 'react';
import { faker } from '@faker-js/faker';
import {
  render as testRender,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react-native';
import { withReactQuery, withDripsy } from 'tests/utils';
import { t } from 'src/translations';
import { QuestCreateScreen } from '../QuestCreateScreen';

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

describe('screens/QuestCreateScreen', () => {
  let mockedProps: ReturnType<typeof getMockedProps>;

  beforeEach(() => {
    mockedProps = getMockedProps();
    render(<QuestCreateScreen {...mockedProps} />);
  });

  afterEach(() => {
    cleanup();
  });

  describe('렌더링 되었을 때', () => {
    it('스냅샷이 일치해야 한다', () => {
      const tree = screen.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('임무 이름 입력 화면이 렌더링 되어야 한다', () => {
      const title = screen.getByText(t('title.new_quest_title'));
      expect(title).not.toBeNull();
    });
  });

  describe('임무 이름이 2글자 미만일 때', () => {
    beforeEach(() => {
      const titlePlaceholder = screen.getByPlaceholderText(
        t('placeholder.enter_name'),
      );
      fireEvent.changeText(
        titlePlaceholder,
        faker.helpers.arrayElement(['', faker.random.alpha(1)]),
      );
    });

    it('다음 버튼이 비활성화 되어있어야 한다', () => {
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

    it('다음 버튼이 활성화 되어있어야 한다', () => {
      const nextButton = screen.getByRole('button');
      expect(nextButton.props).toHaveProperty('accessibilityState', {
        disabled: false,
      });
    });

    describe('임무 이름 입력 화면에서 다음 버튼을 누르면', () => {
      beforeEach(() => {
        const nextButton = screen.getByText(t('label.next'));
        fireEvent(nextButton, 'press');
      });

      it('임무 메모 화면이 렌더링 되어야 한다', () => {
        const title = screen.getByText(t('title.new_quest_memo'));
        expect(title).not.toBeNull();
      });

      // eslint-disable-next-line jest/no-disabled-tests
      describe.skip('임무 메모 화면에서 수락하기 버튼을 길게 누르면', () => {
        beforeEach(() => {
          const nextButton = screen.getByText(t('label.accept_quest'));
          fireEvent(nextButton, 'longPress');
        });

        it('임무 수락 화면이 렌더링 되어야 한다', () => {
          // TODO
        });
      });
    });
  });

  describe('닫기 버튼을 눌렀을 때', () => {
    beforeEach(() => {
      render(<QuestCreateScreen {...mockedProps} />);
      const closeButton = screen.getByLabelText(t('label.close'));
      fireEvent(closeButton, 'press');
    });

    it('navigation.goBack()이 호출되어야 한다', () => {
      expect(mockedProps.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
