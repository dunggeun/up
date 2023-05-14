import React from 'react';
import { CommonLayout } from 'src/designs';
import { AnimateSuspense, FadeInView, LoadingIndicator } from 'src/components';
import { UserMissionList } from '../../components/UserMissionList';
import { UserProfile } from '../../components/UserProfile';
import { useUser } from '../../hooks';
import type { MainTabProps } from 'src/navigators/MainTab/types';

type HomeScreenProps = MainTabProps<'Home'>;

export function HomeScreen(_props: HomeScreenProps): React.ReactElement | null {
  const user = useUser();

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Body scrollEnabled={false}>
          <UserProfile user={user} />
          <AnimateSuspense fallback={<LoadingIndicator full={false} />}>
            <UserMissionList />
          </AnimateSuspense>
        </CommonLayout.Body>
      </CommonLayout>
    </FadeInView>
  );
}
