import React, { useState, useCallback } from 'react';
import Share from 'react-native-share';
import { useActor } from '@xstate/react';
import { CommonLayout, Button } from 'src/designs';
import { DetailSection } from 'src/components';
import { RecentAchieveList } from 'src/features/quests/components/RecentAchieveList';
import { AppManager } from 'src/modules';
import { noop, replacePlaceholder } from 'src/utils';
import { RECENT_ACHIEVE_LIMIT } from 'src/constants';
import { t } from 'src/translations';
import { useUserThemeColor } from '../../hooks';
import { UserProfile } from '../../components/UserProfile';
import { UserCover } from '../../components/UserCover';

import type { CommonStackProps } from 'src/navigators/CommonStack/types';

type UserStatusProps = CommonStackProps<'UserStatus'>;

export function UserStatusScreen({
  navigation,
}: UserStatusProps): JSX.Element | null {
  const [imageData, setImageData] = useState('');
  const userColor = useUserThemeColor();
  const [state] = useActor(AppManager.getInstance().getService());
  const user = state.context.user;

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handleCoverImageGenerated = (data: string): void => {
    setImageData(data);
  };

  const handlePressShare = useCallback(() => {
    Share.open({ url: imageData }).catch(noop);
  }, [imageData]);

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
          <RecentAchieveList />
        </DetailSection>
        <UserCover onGenerated={handleCoverImageGenerated} user={user} />
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button
          color={userColor}
          disableLongPress
          disabled={!imageData}
          onPress={handlePressShare}
        >
          {t('label.share')}
        </Button>
      </CommonLayout.Footer>
    </CommonLayout>
  ) : null;
}
