import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled, useDripsyTheme, Container, View } from 'dripsy';
import { useActor } from '@xstate/react';
import { H1, Input } from 'src/designs';
import { FadeInView, LinearGradient, Section } from 'src/components';
import { AppManager } from 'src/modules';
import { useMainTabBarInset } from 'src/hooks';
import { t } from 'src/translations';
import { BadgeSection } from './BadgeSection';
import { ThemeSection } from './ThemeSection';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type ProfileProps = MainTabProps<'Profile'>;

const SHADOW_HEIGHT = 16;

const SafeAreaView = styled(RNSafeAreaView)({
  flex: 1,
});

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
  const [state] = useActor(AppManager.getInstance().getService());
  const { bottomInset } = useMainTabBarInset();
  const { theme } = useDripsyTheme();

  useEffect(() => {
    setUserName(state.context.user?.name ?? '');
  }, [state.context.user?.name]);

  const handleChangeUserName = (name: string): void => {
    setUserName(name);
  };

  return (
    <FadeInView>
      <SafeAreaView edges={['top', 'left', 'right']}>
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
            <BadgeSection />
            <ThemeSection />
            <View sx={{ height: bottomInset }} />
          </Main>
        </Container>
      </SafeAreaView>
    </FadeInView>
  );
}
