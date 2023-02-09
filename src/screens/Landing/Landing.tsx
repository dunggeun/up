import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import { styled, Container, View, Image } from 'dripsy';
import { SafeAreaView } from 'src/components';
import { Button, H1, AppBar } from 'src/designs';
import { presets } from 'src/themes';
import { LANDING_LOGO_SIZE, LANDING_LOGO_MARGIN } from 'src/constants';
import { t } from 'src/translations';
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
  width: '100%',
  height: '100%',
});

const ButtonArea = styled(View)({
  paddingY: '$04',
});

const scaleLogoViewStyle = {
  width: LANDING_LOGO_SIZE,
  height: LANDING_LOGO_SIZE,
} as const;

export function Landing ({ navigation }: LandingProps): JSX.Element {
  const scale = useSharedValue(1);
  const animatedLogoViewStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withSpring(1.5, { damping: 2.5, stiffness: 120 });
  }, [scale]);

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
            <Animated.View style={[scaleLogoViewStyle, animatedLogoViewStyle]}>
              <LogoImage source={Logo} />
            </Animated.View>
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
