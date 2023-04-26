import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useActor } from '@xstate/react';
import { styled, View } from 'dripsy';
import { CommonLayout, Input, Text } from 'src/designs';
import { FadeInView, Section } from 'src/components';
import { AppManager } from 'src/modules';
import { useDebounce, useMainTabBarInset } from 'src/hooks';
import { t } from 'src/translations';

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
  const [state, send] = useActor(AppManager.getInstance().getService());
  const [userName, setUserName] = useState('');
  const user = state.context.user;

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

  useEffect(() => {
    if (!user) return;
    setUserName(user.name);
  }, [user]);

  return user ? (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Header title={t('title.profile')} />
        <CommonLayout.Body>
          <Main>
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
          </Main>
        </CommonLayout.Body>
      </CommonLayout>
    </FadeInView>
  ) : null;
}
