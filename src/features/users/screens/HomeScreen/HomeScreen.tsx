import React from 'react';
import { CommonLayout } from 'src/designs';
import { AnimateSuspense, FadeInView, LoadingIndicator } from 'src/components';
import { navigate } from 'src/navigators/helpers';
import { useUser } from '../../hooks';
import { UserProfile } from '../../components/UserProfile';
import { UserQuestList } from '../../components/UserQuestList';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type HomeScreenProps = MainTabProps<'Home'>;

export function HomeScreen(_props: HomeScreenProps): JSX.Element | null {
  const user = useUser();

  const handlePressCreateQuest = (): void => {
    navigate('Quest', 'QuestCreate');
  };

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Body scrollEnabled={false}>
          <UserProfile user={user} />
          <AnimateSuspense fallback={<LoadingIndicator full={false} />}>
            <UserQuestList onCreate={handlePressCreateQuest} />
          </AnimateSuspense>
        </CommonLayout.Body>
      </CommonLayout>
    </FadeInView>
  );
}
