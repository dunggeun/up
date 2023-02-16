import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { styled, useDripsyTheme, Container, View } from 'dripsy';
import { useActor } from '@xstate/react';
import { H1, Input } from 'src/designs';
import {
  SafeAreaView,
  FadeInView,
  Section
} from 'src/components';
import { LinearGradient } from 'src/components/LinearGradient';
import { AppManager } from 'src/modules';
import { useMainTabBarInset, useDebounce } from 'src/hooks';
import { t } from 'src/translations';
import { BadgeSection } from './BadgeSection';
import { ThemeSection } from './ThemeSection';

import type { User } from 'src/types';
import type { MainTabProps } from 'src/navigators/MainTab/types';

type ProfileProps = MainTabProps<'Profile'>;

const SHADOW_HEIGHT = 16;

const Header = styled(View)({
  position: 'relative',
  width: '100%',
  paddingY: '$04',
  zIndex: 3,
  elevation: 3,
});

const Main = styled(ScrollView)({
  gap: '$02',
});

const ListShadow = styled(LinearGradient)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: SHADOW_HEIGHT,
  marginBottom: -SHADOW_HEIGHT,
});

export function Profile (_props: ProfileProps): JSX.Element {
  const [userName, setUserName] = useState('');
  const [state, send] = useActor(AppManager.getInstance().getService());
  const { bottomInset } = useMainTabBarInset();
  const { theme } = useDripsyTheme();
  const user = state.context.user;

  const editUser = useCallback((
    modifyData: Partial<Pick<User, 'name' | 'badge' | 'theme'>>,
  ) => {
    send({ type: 'EDIT_USER', user: modifyData });
  }, [send]);

  const { trigger: lazyEditUser } = useDebounce(editUser, 500);

  const handleChangeUserName = (value: string): void => {
    lazyEditUser({ name: value });
    setUserName(value);
  };

  const handlePressBadge = useCallback((id: number): void => {
    editUser({ badge: id });
  }, [editUser]);

  const handleLongPressBadge = useCallback((_id: number): void => {
    // @todo
  }, []);

  const handlePressTheme = useCallback((id: number): void => {
    editUser({ theme: id });
  }, [editUser]);

  useEffect(() => {
    setUserName(user?.name ?? '');
  }, [user?.name]);

  return (
    <FadeInView>
      <SafeAreaView insetBottom={false}>
        <Container>
          <Header>
            <H1 variant="primary">{t('title.profile')}</H1>
            <ListShadow color={theme.colors.$white} rotate={90} toOpacity={0} />
          </Header>
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
            />
            <ThemeSection onPressBadge={handlePressTheme} />
            <View sx={{ height: bottomInset }} />
          </Main>
        </Container>
      </SafeAreaView>
    </FadeInView>
  );
}
