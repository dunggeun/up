import React, { useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useActor } from '@xstate/react';
import { styled, View } from 'dripsy';
import { CommonLayout, Input, Text } from 'src/designs';
import { FadeInView, Section } from 'src/components';
import { AppManager } from 'src/modules/app';
import { globalMachineService } from 'src/stores/machines';
import { useDebounce, useMainTabBarInset } from 'src/hooks';
import { t } from 'src/translations';

import { useUser } from '../../hooks';
import { BadgeSection } from '../../components/BadgeSection';
import { ThemeSection } from '../../components/ThemeSection';

import type { User } from 'src/features/users';
import type { MainTabProps } from 'src/navigators/MainTab/types';

type ProfileScreenProps = MainTabProps<'Profile'>;

const Main = styled(ScrollView)({
  gap: '$02',
});

const EditedToastContent = <Text>{t('message.user_edited')}</Text>;

export function ProfileScreen(_props: ProfileScreenProps): JSX.Element | null {
  const { bottomInset } = useMainTabBarInset();
  const [_, send] = useActor(globalMachineService);
  const [userName, setUserName] = useState('');
  const user = useUser();

  const handleEditUser = useCallback(
    (modifyData: Partial<Pick<User, 'name' | 'badge' | 'theme'>>) => {
      send({ type: 'EDIT_USER', user: modifyData });
    },
    [send],
  );

  const { trigger: lazyEditUser } = useDebounce(
    (value: Partial<Pick<User, 'theme' | 'name' | 'badge'>>) => {
      handleEditUser(value);
      AppManager.showToast(EditedToastContent);
    },
    500,
  );

  const handleChangeUserName = (value: string): void => {
    lazyEditUser({ name: value });
    setUserName(value);
  };

  const handlePressBadge = useCallback(
    (id: number): void => {
      handleEditUser({ badge: id });
    },
    [handleEditUser],
  );

  const handleLongPressBadge = useCallback((_id: number): void => {
    // @todo
  }, []);

  const handlePressTheme = useCallback(
    (id: number): void => {
      handleEditUser({ theme: id });
    },
    [handleEditUser],
  );

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Header title={t('title.profile')} />
        <CommonLayout.Body>
          <Section title={t('label.name')}>
            <Input
              onChangeText={handleChangeUserName}
              placeholder={t('placeholder.enter_name')}
              value={userName}
            />
          </Section>
          <BadgeSection
            onLongPressBadge={handleLongPressBadge}
            onPressBadge={handlePressBadge}
            unlockedBadges={user.unlockedBadges}
          />
          <ThemeSection onPressBadge={handlePressTheme} />
          <View sx={{ height: bottomInset }} />
        </CommonLayout.Body>
      </CommonLayout>
    </FadeInView>
  );
}
