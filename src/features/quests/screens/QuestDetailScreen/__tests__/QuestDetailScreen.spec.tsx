import React from 'react';
import {
  render as testRender,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { withReactQuery, withDripsy } from 'tests/utils';
import { t } from 'src/translations';

import { useQuestDetail } from 'src/features/quests/hooks';
import { QuestDetailScreen } from '../QuestDetailScreen';
import type { Quest, Achieve } from 'src/features/quests/types';

const render = (
  component: React.ReactElement,
): ReturnType<typeof testRender> => {
  return testRender(withReactQuery(withDripsy(component)));
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('src/features/quests/hooks', () => ({
  ...jest.requireActual('src/features/quests/hooks'),
  useQuestDetail: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMockedProps = (): any => ({
  route: {
    params: {
      id: faker.random.alphaNumeric(),
    },
  },
  navigation: {
    goBack: jest.fn(),
  },
});

describe('screens/QuestDetailScreen', () => {
  let mockedProps: ReturnType<typeof getMockedProps>;
  let mockedQuest: Quest;
  let mockedAchieveList: Achieve[];

  beforeEach(() => {
    mockedProps = getMockedProps();
    mockedQuest = {
      id: faker.datatype.number(),
      title: faker.random.word(),
      description: faker.lorem.paragraph(),
      current_streak: faker.datatype.number(),
      max_streak: faker.datatype.number(),
      created_at: faker.datatype.number(),
      updated_at: faker.datatype.number(),
      finished_at: faker.datatype.number(),
    };
    mockedAchieveList = [
      {
        id: faker.datatype.number(),
        qid: faker.datatype.number(),
        exp: faker.datatype.number(),
        created_at: faker.datatype.number(),
      },
    ];

    (useQuestDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        quest: mockedQuest,
        achieveList: mockedAchieveList,
      },
    });

    render(<QuestDetailScreen {...mockedProps} />);
  });

  afterEach(() => {
    cleanup();
  });

  describe('퀘스트 정보가 존재할 때', () => {
    it('퀘스트 제목이 렌더링 되어야 한다', () => {
      const title = screen.getByText(mockedQuest.title);
      expect(title).not.toBeNull();
    });

    it('퀘스트 메모가 렌더링 되어야 한다', () => {
      const description = screen.getByText(mockedQuest.description);
      expect(description).not.toBeNull();
    });
  });

  describe('퀘스트 완료 버튼을 눌렀을 때', () => {
    beforeEach(() => {
      const doneButton = screen.getByText(t('label.quest_done'));
      fireEvent(doneButton, 'press');
    });

    it('퀘스트 완료 안내 모달이 노출되어야 한다', () => {
      const questDoneModalContent = screen.getByTestId('quest-done-modal');
      expect(questDoneModalContent).not.toBeNull();
    });
  });

  describe('닫기 버튼을 눌렀을 때', () => {
    it('navigation.goBack()이 호출되어야 한다', () => {
      const props = getMockedProps();
      render(withDripsy(<QuestDetailScreen {...props} />));
      const appBarBackButton = screen.getByLabelText(t('label.close'));
      fireEvent(appBarBackButton, 'press');
      expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
