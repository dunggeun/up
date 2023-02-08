import React from 'react';
import { styled, Container, View, Image } from 'dripsy';
import { SafeAreaView } from 'react-native-safe-area-context';
import { presets } from 'src/themes';
import { Button, H1, AppBar } from 'src/designs';
import { t } from 'src/translations';
import { LANDING_LOGO_SIZE, LANDING_LOGO_MARGIN } from 'src/constants';
import Logo from 'src/assets/images/logo.png';

import type { RootStackProps } from 'src/navigators/RootStack/types';

type LandingProps = RootStackProps<'Landing'>;

const Content = styled(View)({
  flex: 1,
});

const PageTitleArea = styled(View)({
  paddingY: '$04',
});

const LogoArea = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: LANDING_LOGO_MARGIN,
});

const LogoImage = styled(Image)({
  width: LANDING_LOGO_SIZE,
  height: LANDING_LOGO_SIZE,
});

const ButtonArea = styled(View)({
  paddingY: '$04',
});

export function Landing ({ navigation }: LandingProps): JSX.Element {
  const handlePressNextButton = (): void => {
    navigation.navigate('RegisterUser');
  };

  return (
    <SafeAreaView style={presets.flexWhite}>
      <Container>
        <AppBar />
        <Content>
          <PageTitleArea>
            <H1 variant="primary">{t('message.greeting')}</H1>
          </PageTitleArea>
          <LogoArea>
            <LogoImage source={Logo} />
          </LogoArea>
        </Content>
        <ButtonArea>
          <Button
            color="$brand"
            disableLongPress
            onPress={handlePressNextButton}
          >
            {t('label.start')}
          </Button>
        </ButtonArea>
      </Container>
    </SafeAreaView>
  );
}
