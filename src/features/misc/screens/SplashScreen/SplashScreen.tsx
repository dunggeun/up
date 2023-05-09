import React from 'react';
import { styled, View, Image } from 'dripsy';
import Logo from 'src/assets/images/logo.png';
import {
  APP_BAR_HEIGHT,
  LANDING_LOGO_SIZE,
  LANDING_LOGO_MARGIN,
} from 'src/constants';
import { CommonLayout } from 'src/designs';

const LogoArea = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: APP_BAR_HEIGHT,
  paddingBottom: LANDING_LOGO_MARGIN,
});

const LogoImage = styled(Image)({
  width: LANDING_LOGO_SIZE,
  height: LANDING_LOGO_SIZE,
});

export function SplashScreen(): JSX.Element {
  return (
    <CommonLayout>
      <LogoArea>
        <LogoImage source={Logo} />
      </LogoArea>
    </CommonLayout>
  );
}
