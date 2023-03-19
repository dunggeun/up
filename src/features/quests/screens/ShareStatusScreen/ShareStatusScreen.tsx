import React from 'react';
import { useActor } from '@xstate/react';
import { CommonLayout, Button } from 'src/designs';
import { DetailSection, LoadingIndicator } from 'src/components';
import { AnimateSuspense } from 'src/components/AnimateSuspense';
import { useUserThemeColor } from 'src/features/users';
import { UserProfile } from 'src/features/users/components/UserProfile';
import { RecentAchieveList } from 'src/features/quests/components/RecentAchieveList';
import { AppManager } from 'src/modules';
import { replacePlaceholder } from 'src/utils';
import { RECENT_ACHIEVE_LIMIT } from 'src/constants';
import { t } from 'src/translations';

import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type ShareStatusScreenProps = QuestStackProps<'ShareStatus'>;

export function ShareStatusScreen({
  navigation
}: ShareStatusScreenProps): JSX.Element | null {
  const userColor = useUserThemeColor();
  const [state] = useActor(AppManager.getInstance().getService());
  const user = state.context.user;

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  return user ? (
    <CommonLayout>
      <CommonLayout.Header
        onClosePress={handlePressCloseButton}
        title={t('title.my_status')}
      />
      <CommonLayout.Body>
        <UserProfile user={user} />
        <DetailSection
          title={replacePlaceholder(
            t('title.recent_achieved'),
            RECENT_ACHIEVE_LIMIT.toString(),
          )}
        >
          <AnimateSuspense fallback={<LoadingIndicator />}>
            <RecentAchieveList />
          </AnimateSuspense>
        </DetailSection>
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button color={userColor}>
          {t('label.share')}
        </Button>
      </CommonLayout.Footer>
    </CommonLayout>
  ) : null;
};
