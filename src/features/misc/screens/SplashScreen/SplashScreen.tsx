import React from 'react';
import { styled, View, Image } from 'dripsy';
import Logo from 'src/assets/images/logo.png';
import { LANDING_LOGO_SIZE } from 'src/constants';
import { CommonLayout } from 'src/designs';

const LogoArea = styled(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const LogoImage = styled(Image)({
  width: LANDING_LOGO_SIZE,
  height: LANDING_LOGO_SIZE,
});

export function SplashScreen(): React.ReactElement {
  return (
    <CommonLayout>
      <CommonLayout.Body scrollEnabled={false}>
        <LogoArea>
          <LogoImage source={Logo} />
        </LogoArea>
      </CommonLayout.Body>
    </CommonLayout>
  );
}
