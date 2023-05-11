import React from 'react';
import { faker } from '@faker-js/faker';
import {
  render as testRender,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react-native';
import { useMissionDetail } from 'src/features/missions/hooks';
import { withReactQuery, withDripsy } from 'tests/utils';
import { t } from 'src/translations';
import { MissionFinishedScreen } from '../MissionFinishedScreen';
import type { Mission, Achieve } from 'src/features/missions/types';

const render = (
  component: React.ReactElement,
): ReturnType<typeof testRender> => {
  return testRender(withReactQuery(withDripsy(component)));
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('src/features/missions/hooks', () => ({
  ...jest.requireActual('src/features/missions/hooks'),
  useMissionDetail: jest.fn(),
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

describe('screens/MissionFinishedScreen', () => {
  let mockedProps: ReturnType<typeof getMockedProps>;
  let mockedMission: Mission;
  let mockedAchieveList: Achieve[];

  beforeEach(() => {
    mockedProps = getMockedProps();
    mockedMission = {
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
        mid: faker.datatype.number(),
        exp: faker.datatype.number(),
        created_at: faker.datatype.number(),
      },
    ];

    (useMissionDetail as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        mission: mockedMission,
        achieveList: mockedAchieveList,
      },
    });

    render(<MissionFinishedScreen {...mockedProps} />);
  });

  afterEach(() => {
    cleanup();
  });

  describe('임무 정보가 존재할 때', () => {
    it('임무 제목이 렌더링 되어야 한다', () => {
      const title = screen.getByText(mockedMission.title);
      expect(title).not.toBeNull();
    });

    it('임무 메모가 렌더링 되어야 한다', () => {
      const description = screen.getByText(mockedMission.description);
      expect(description).not.toBeNull();
    });
  });

  describe('임무 삭제 버튼을 눌렀을 때', () => {
    beforeEach(() => {
      const doneButton = screen.getByText(t('label.mission_delete'));
      fireEvent(doneButton, 'press');
    });

    it('임무 삭제 안내 모달이 노출되어야 한다', () => {
      const missionDoneModalContent = screen.getByTestId(
        'mission-delete-modal',
      );
      expect(missionDoneModalContent).not.toBeNull();
    });
  });

  describe('닫기 버튼을 눌렀을 때', () => {
    it('navigation.goBack()이 호출되어야 한다', () => {
      const props = getMockedProps();
      render(withDripsy(<MissionFinishedScreen {...props} />));
      const appBarBackButton = screen.getByLabelText(t('label.close'));
      fireEvent(appBarBackButton, 'press');
      expect(props.navigation.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
