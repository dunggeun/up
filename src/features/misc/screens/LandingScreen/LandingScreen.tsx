import React from 'react';
import { styled, View, Image } from 'dripsy';
import { MotiView } from 'moti';
import Logo from 'src/assets/images/logo.png';
import { LANDING_LOGO_SIZE, LANDING_LOGO_MARGIN } from 'src/constants';
import { CommonLayout, Button, H1 } from 'src/designs';
import { t } from 'src/translations';
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
  const handlePressNextButton = (): void => {
    navigation.navigate('UserRegister');
  };

  return (
    <CommonLayout>
      <CommonLayout.Header />
      <CommonLayout.Body scrollEnabled={false}>
        <PageTitleArea>
          <H1 variant="primary">{t('message.greeting')}</H1>
        </PageTitleArea>
        <LogoArea>
          <MotiView
            animate={{ scale: 1.5 }}
            from={{ scale: 1 }}
            style={scaleLogoViewStyle}
            transition={{
              type: 'spring',
              damping: 2.5,
              stiffness: 120,
            }}
          >
            <LogoImage source={Logo} />
          </MotiView>
        </LogoArea>
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button color="$brand" disableLongPress onPress={handlePressNextButton}>
          {t('label.start')}
        </Button>
      </CommonLayout.Footer>
    </CommonLayout>
  );
}
