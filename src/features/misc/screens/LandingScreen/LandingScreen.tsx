import React from 'react';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { styled, View, Image } from 'dripsy';
import { MotiView } from 'moti';
import Logo from 'src/assets/images/logo.png';
import { LANDING_LOGO_SIZE, LANDING_LOGO_MARGIN } from 'src/constants';
import { CommonLayout, Button, H1 } from 'src/designs';
import { t } from 'src/translations';
import type { RootStackProps } from 'src/navigators/RootStack/types';

type LandingScreenProps = RootStackProps<'Landing'>;

const ACCESSIBILITY = {
  start: t('label.start'),
};

const PageTitleArea = styled(Animated.View)({
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

const FooterButtonSection = styled(Animated.View)();

const scaleLogoViewStyle = {
  width: LANDING_LOGO_SIZE,
  height: LANDING_LOGO_SIZE,
} as const;

export function LandingScreen({
  navigation,
}: LandingScreenProps): React.ReactElement {
  const handlePressNextButton = (): void => {
    navigation.navigate('UserRegister');
  };

  return (
    <CommonLayout>
      <CommonLayout.Header />
      <CommonLayout.Body scrollEnabled={false}>
        <PageTitleArea entering={ZoomIn}>
          <H1 variant="primary">{t('message.greeting')}</H1>
        </PageTitleArea>
        <LogoArea>
          <MotiView
            animate={{ scale: 1.2 }}
            delay={500}
            from={{ scale: 1 }}
            style={scaleLogoViewStyle}
            transition={{
              loop: true,
              type: 'timing',
              duration: 1000,
              delay: 100,
            }}
          >
            <LogoImage source={Logo} />
          </MotiView>
        </LogoArea>
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <FooterButtonSection entering={ZoomIn.delay(600)}>
          <Button
            accessibilityHint={ACCESSIBILITY.start}
            accessibilityLabel={ACCESSIBILITY.start}
            color="$brand"
            disableLongPress
            onPress={handlePressNextButton}
          >
            {t('label.start')}
          </Button>
        </FooterButtonSection>
      </CommonLayout.Footer>
    </CommonLayout>
  );
}
