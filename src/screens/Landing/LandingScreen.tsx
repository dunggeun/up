import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring
} from 'react-native-reanimated';
import { styled, View, Image } from 'dripsy';
import { CommonLayout, Button, H1 } from 'src/designs';
import { LANDING_LOGO_SIZE, LANDING_LOGO_MARGIN } from 'src/constants';
import { t } from 'src/translations';
import Logo from 'src/assets/images/logo.png';

import type { RootStackProps } from 'src/navigators/RootStack/types';

type LandingScreenProps = RootStackProps<'Landing'>;

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

const scaleLogoViewStyle = {
  width: LANDING_LOGO_SIZE,
  height: LANDING_LOGO_SIZE,
} as const;

export function LandingScreen({ navigation }: LandingScreenProps): JSX.Element {
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
    <CommonLayout>
      <CommonLayout.Header />
      <CommonLayout.Body scrollEnabled={false}>
        <PageTitleArea>
          <H1 variant="primary">{t('message.greeting')}</H1>
        </PageTitleArea>
        <LogoArea>
          <Animated.View style={[scaleLogoViewStyle, animatedLogoViewStyle]}>
            <LogoImage source={Logo} />
          </Animated.View>
        </LogoArea>
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button
          color="$brand"
          disableLongPress
          onPress={handlePressNextButton}
        >
          {t('label.start')}
        </Button>
      </CommonLayout.Footer>
    </CommonLayout>
  );
}
