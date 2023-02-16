
import React from 'react';
import { useActor } from '@xstate/react';
import { useSx, useDripsyTheme, Container } from 'dripsy';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInView } from 'src/components';
import { navigate } from 'src/navigators/helpers';
import { AppManager } from 'src/modules';
import { Profile } from './Profile';
import { QuestList } from './QuestList';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type HomeProps = MainTabProps<'Home'>;

const dummyQuests = [
  {
    id: 1,
    title: 'A',
    description: '',
    max_streak: 0,
    current_streak: 0,
    created_at: 0,
    finished_at: 0,
  },
  {
    id: 2,
    title: 'D',
    description: '',
    max_streak: 0,
    current_streak: 3,
    created_at: 0,
    finished_at: 0,
  },
  {
    id: 3,
    title: 'C',
    description: '',
    max_streak: 0,
    current_streak: 5,
    created_at: 0,
    finished_at: 0,
  },
  {
    id: 4,
    title: 'E',
    description: '',
    max_streak: 0,
    current_streak: 0,
    created_at: 0,
    finished_at: 0,
  },
  {
    id: 5,
    title: 'F',
    description: '',
    max_streak: 0,
    current_streak: 0,
    created_at: 0,
    finished_at: 0,
  },
  {
    id: 6,
    title: 'G',
    description: '',
    max_streak: 0,
    current_streak: 0,
    created_at: 0,
    finished_at: 0,
  },
  {
    id: 7,
    title: 'K',
    description: '',
    max_streak: 0,
    current_streak: 1,
    created_at: 0,
    finished_at: 0,
  },
  {
    id: 8,
    title: 'B',
    description: '',
    max_streak: 0,
    current_streak: 0,
    created_at: 0,
    finished_at: 0,
  },
  {
    id: 9,
    title: 'Z',
    description: '',
    max_streak: 0,
    current_streak: 0,
    created_at: 0,
    finished_at: 0,
  },
  {
    id: 10,
    title: 'X',
    description: '',
    max_streak: 0,
    current_streak: 0,
    created_at: 0,
    finished_at: 0,
  },
];

export function Home (_props: HomeProps): JSX.Element | null {
  const [state] = useActor(AppManager.getInstance().getService());
  const { top } = useSafeAreaInsets();
  const { theme } = useDripsyTheme();
  const sx = useSx();
  const user = state.context.user;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const containerStyle = sx({
    paddingTop: top + theme.space.$04,
    gap: '$04',
  });

  const handlePressCreateQuestButton = (): void => {
    navigate('Quest', 'CreateQuest');
  };

  if (!user) {
    return null;
  }

  return (
    <FadeInView>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Container style={containerStyle}>
        <Profile user={user} />
        <QuestList
          onCreate={handlePressCreateQuestButton}
          quests={dummyQuests}
        />
      </Container>
    </FadeInView>
  );
}
