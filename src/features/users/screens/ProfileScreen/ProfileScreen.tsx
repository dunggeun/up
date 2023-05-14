import React, { useState, useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Share from 'react-native-share';
import { useActor } from '@xstate/react';
import { View } from 'dripsy';
import { AppManager } from 'src/modules/app';
import * as AppHelpers from 'src/modules/app/helpers';
import { AppEventChannel } from 'src/modules/event';
import { Logger } from 'src/modules/logger';
import { navigate } from 'src/navigators/helpers';
import { globalMachineService } from 'src/stores/machines';
import { useMainTabBarInset } from 'src/hooks';
import { runAfterModalDismissed } from 'src/utils';
import { CommonLayout, Button } from 'src/designs';
import { FadeInView } from 'src/components';
import { t } from 'src/translations';
import { BadgeModal } from '../../components/BadgeModal';
import { BadgeSection } from '../../components/BadgeSection';
import { ShareModal } from '../../components/ShareModal';
import { ThemeSection } from '../../components/ThemeSection';
import { UserSection } from '../../components/UserSection';
import { useUser } from '../../hooks';
import type { User } from 'src/features/users';
import type { MainTabProps } from 'src/navigators/MainTab/types';

type ProfileScreenProps = MainTabProps<'Profile'>;

const TAG = 'ProfileScreen';

const ACCESSIBILITY = {
  share: t('label.share'),
};

export function ProfileScreen(_props: ProfileScreenProps): JSX.Element | null {
  const user = useUser();
  const { bottomInset } = useMainTabBarInset();
  const [_, send] = useActor(globalMachineService);
  const [shareModalVisibility, setShareModalVisibility] = useState(false);
  const [badgeModalVisibility, setBadgeModalVisibility] = useState(false);
  const [badgeId, setBadgeId] = useState(0);

  const selectedBadge = useMemo(() => AppHelpers.getBadge(badgeId), [badgeId]);

  const handleEditUser = useCallback(
    (modifyData: Partial<Pick<User, 'name' | 'badge' | 'theme'>>) => {
      send({ type: 'EDIT_USER', user: modifyData });
    },
    [send],
  );

  const handlePressEdit = useCallback((): void => {
    navigate('User', 'UserEdit');
  }, []);

  const handlePressShare = (): void => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      setShareModalVisibility(true);
    } else {
      AppManager.showToast(t('message.error.unsupported_platform'));
    }
  };

  const handlePressClose = useCallback((): void => {
    setShareModalVisibility(false);
    setBadgeModalVisibility(false);
  }, []);

  const handleReadyToShare = useCallback((imageData: string): void => {
    Share.open({ url: imageData })
      .catch((error: Error) => {
        Logger.warn(TAG, `handleReadyToShare - ${error.message}`);
      })
      .finally(() => {
        setShareModalVisibility(false);
        runAfterModalDismissed(() => {
          AppEventChannel.getInstance().dispatch('shareProfile', undefined);
        });
      });
  }, []);

  const handlePressBadge = useCallback(
    (id: number): void => {
      handleEditUser({ badge: id });
    },
    [handleEditUser],
  );

  const handleLongPressBadge = useCallback((id: number): void => {
    setBadgeId(id);
    setBadgeModalVisibility(true);
  }, []);

  const handlePressTheme = useCallback(
    (id: number): void => {
      handleEditUser({ theme: id });
      AppEventChannel.getInstance().dispatch('changeTheme', {
        themeId: id,
      });
    },
    [handleEditUser],
  );

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Header title={t('title.profile')} />
        <CommonLayout.Body>
          <UserSection onPressEdit={handlePressEdit} user={user} />
          <Button
            accessibilityHint={ACCESSIBILITY.share}
            accessibilityLabel={ACCESSIBILITY.share}
            color="$white"
            disableLongPress
            onPress={handlePressShare}
          >
            {t('label.share')}
          </Button>
          <Animated.View entering={FadeInDown}>
            <BadgeSection
              onLongPressBadge={handleLongPressBadge}
              onPressBadge={handlePressBadge}
              unlockedBadges={user.unlockedBadges}
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)}>
            <ThemeSection onPressBadge={handlePressTheme} />
          </Animated.View>
          <View sx={{ height: bottomInset }} />
        </CommonLayout.Body>
      </CommonLayout>
      <ShareModal
        onClose={handlePressClose}
        onReady={handleReadyToShare}
        user={user}
        visible={shareModalVisibility}
      />
      <BadgeModal
        badge={selectedBadge}
        onClose={handlePressClose}
        visible={badgeModalVisibility}
      />
    </FadeInView>
  );
}
