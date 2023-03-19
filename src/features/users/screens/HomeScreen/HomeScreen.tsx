
import React from 'react';
import { useActor } from '@xstate/react';
import { CommonLayout } from 'src/designs';
import { AnimateSuspense, FadeInView, LoadingIndicator } from 'src/components';
import { navigate } from 'src/navigators/helpers';
import { AppManager } from 'src/modules';

import { UserProfile } from '../../components/UserProfile';
import { UserQuestList } from '../../components/UserQuestList';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type HomeScreenProps = MainTabProps<'Home'>;


export function HomeScreen(_props: HomeScreenProps): JSX.Element | null {
  const [state] = useActor(AppManager.getInstance().getService());
  const user = state.context.user;

  const handlePressProfile = (): void => {
    navigate('Quest', 'ShareStatus');
  };

  const handlePressCreateQuest = (): void => {
    navigate('Quest', 'QuestCreate');
  };

  if (!user) {
    return null;
  }

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Body scrollEnabled={false}>
          <UserProfile onPress={handlePressProfile} user={user} />
          <AnimateSuspense fallback={<LoadingIndicator full={false} />}>
            <UserQuestList onCreate={handlePressCreateQuest} />
          </AnimateSuspense>
        </CommonLayout.Body>
      </CommonLayout>
    </FadeInView>
  );
}
