import React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { styled, Container, View } from 'dripsy';
import { FadeInView } from 'src/components';
import { H1 } from 'src/designs';
import { useMainTabBarInset } from 'src/hooks';
import { VERSION } from 'src/constants';
import { t } from 'src/translations';
import { MenuItem } from './MenuItem';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type MenuProps = MainTabProps<'Menu'>;

const SafeAreaView = styled(RNSafeAreaView)({
  flex: 1,
});

const Header = styled(View)({
  width: '100%',
  paddingY: '$04',
});

const Main = styled(View)();

export function Menu (_props: MenuProps): JSX.Element {
  const { bottomInset } = useMainTabBarInset();

  const handlePressVersion = (): void => {
    // @todo
  };

  const handlePressSendFeedback = (): void => {
    // @todo
  };

  const handlePressRating = (): void => {
    // @todo
  };

  const handlePressOpenSource = (): void => {
    // @todo
  };

  return (
    <FadeInView>
      <SafeAreaView edges={['top', 'left', 'right']}>
        <Container>
          <Header>
            <H1 variant="primary">{t('title.menu')}</H1>
          </Header>
          <Main>
            <MenuItem
              label={t('label.version')}
              onPress={handlePressVersion}
              subLabel={VERSION}
            />
            <MenuItem
              label={t('label.send_feedback')}
              onPress={handlePressSendFeedback}
            />
            <MenuItem
              label={t('label.rating')}
              onPress={handlePressRating}
            />
            <MenuItem
              label={t('label.open_source')}
              onPress={handlePressOpenSource}
            />
            <View sx={{ height: bottomInset }} />
          </Main>
        </Container>
      </SafeAreaView>
    </FadeInView>
  );
}
