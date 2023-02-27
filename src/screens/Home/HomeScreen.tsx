
import React from 'react';
import { useActor } from '@xstate/react';
import { useRecoilValue } from 'recoil';
import { FadeInView } from 'src/components';
import { navigate } from 'src/navigators/helpers';
import { AppManager } from 'src/modules';
import { activeQuestList } from 'src/stores';
import { Home } from './Home';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type HomeProps = MainTabProps<'Home'>;

export function HomeScreen(_props: HomeProps): JSX.Element | null {
  const [state] = useActor(AppManager.getInstance().getService());
  const quests = useRecoilValue(activeQuestList);
  const user = state.context.user;

  const handlePressCreateQuest = (): void => {
    navigate('Quest', 'CreateQuest');
  };

  const handlePressQuest = (questId: number): void => {
    navigate('Quest', 'QuestDetail', { id: questId });
  };

  if (!user) {
    return null;
  }

  return (
    <FadeInView>
      <Home
        onPressCreateQuest={handlePressCreateQuest}
        onPressQuest={handlePressQuest}
        questList={quests}
        user={user}
      />
    </FadeInView>
  );
}
