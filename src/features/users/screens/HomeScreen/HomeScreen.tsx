import React from 'react';
import { Platform } from 'react-native';
import { useActor } from '@xstate/react';
import { CommonLayout, Text } from 'src/designs';
import { AnimateSuspense, FadeInView, LoadingIndicator } from 'src/components';
import { navigate } from 'src/navigators/helpers';
import { AppManager } from 'src/modules';
import { t } from 'src/translations';

import { UserProfile } from '../../components/UserProfile';
import { UserQuestList } from '../../components/UserQuestList';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type HomeScreenProps = MainTabProps<'Home'>;

const UnsupportedToastContent = (
  <Text variant="primary">{t('message.error.unsupported_platform')}</Text>
);

export function HomeScreen(_props: HomeScreenProps): JSX.Element | null {
  const [state] = useActor(AppManager.getInstance().getService());
  const user = state.context.user;

  const handlePressProfile = (): void => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      navigate('Common', 'UserStatus');
    } else {
      AppManager.showToast(UnsupportedToastContent);
    }
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
