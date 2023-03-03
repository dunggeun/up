import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { styled, Text, View } from 'dripsy';
import { CommonLayout, Input } from 'src/designs';
import { Section } from 'src/components';
import * as Toast from 'src/components/Toast';
import { useMainTabBarInset, useDebounce } from 'src/hooks';
import { t } from 'src/translations';
import { BadgeSection, ThemeSection } from './components';

import type { User } from 'src/types';

interface ProfileProps {
  user: User;
  onEditUser: (user: EditableUser) => void;
}

type EditableUser = Partial<Pick<User, 'name' | 'badge' | 'theme'>>;

const Main = styled(ScrollView)({
  gap: '$02',
});

const EditedToastContent = <Text>{t('message.user_edited')}</Text>;

export function Profile ({ user, onEditUser }: ProfileProps): JSX.Element {
  const [userName, setUserName] = useState('');
  const { bottomInset } = useMainTabBarInset();

  const { trigger: lazyEditUser } = useDebounce((value: Partial<Pick<User, 'theme' | 'name' | 'badge'>>) => {
    onEditUser(value);
    Toast.show(EditedToastContent);
  }, 500);

  const handleChangeUserName = (value: string): void => {
    lazyEditUser({ name: value });
    setUserName(value);
  };

  const handlePressBadge = useCallback((id: number): void => {
    onEditUser({ badge: id });
  }, [onEditUser]);

  const handleLongPressBadge = useCallback((_id: number): void => {
    // @todo
  }, []);

  const handlePressTheme = useCallback((id: number): void => {
    onEditUser({ theme: id });
  }, [onEditUser]);

  useEffect(() => {
    setUserName(user.name);
  }, [user.name]);

  return (
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
  );
}
