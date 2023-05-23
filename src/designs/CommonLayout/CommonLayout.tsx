import React, { Fragment, type PropsWithChildren } from 'react';
import { Animated } from 'react-native';
import { styled, Container as DripsyContainer, View } from 'dripsy';
import { KeyboardAvoidingView } from 'src/components/KeyboardAvoidingView';
import { LinearGradient } from 'src/components/LinearGradient';
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from 'src/components/SafeAreaView';
import { themeLight } from 'src/themes';
import { SHARED_CONFIG } from 'src/constants';
import { AppBar, type AppBarProps } from '../AppBar';

const HeaderWrapper = styled(View)({
  marginX: -themeLight.space.$04,
  zIndex: 3,
});

const ScrollView = styled(Animated.ScrollView)({
  marginX: -themeLight.space.$04,
  paddingX: themeLight.space.$04,
});

const BodyWrapper = styled(View)({
  flex: 1,
  gap: '$04',
});

const FooterWrapper = styled(View)(
  ({ withPadding }: { withPadding: boolean }) => ({
    position: 'relative',
    gap: '$04',
    paddingBottom: withPadding ? '$04' : 0,
  }),
);

const SHADOW_HEIGHT = 16;
const FooterShadow = styled(LinearGradient)({
  position: 'absolute',
  left: 0,
  right: 0,
  height: SHADOW_HEIGHT,
  marginTop: -SHADOW_HEIGHT,
  zIndex: 3,
  elevation: 3,
});

interface CommonLayoutProps extends SafeAreaViewProps {
  keyboardAvoiding?: boolean;
}

export function CommonLayout({
  children,
  keyboardAvoiding,
  ...props
}: PropsWithChildren<CommonLayoutProps>): React.ReactElement {
  const AvoidingView = keyboardAvoiding ? KeyboardAvoidingView : Fragment;
  return (
    <SafeAreaView {...props}>
      <AvoidingView>
        <DripsyContainer>{children}</DripsyContainer>
      </AvoidingView>
    </SafeAreaView>
  );
}

CommonLayout.Header = function Header(
  props: Omit<AppBarProps, 'shadow'>,
): React.ReactElement {
  return (
    <HeaderWrapper>
      <AppBar {...props} shadow />
    </HeaderWrapper>
  );
};

interface BodyProps {
  scrollEnabled?: boolean;
}

CommonLayout.Body = function Body({
  children,
  scrollEnabled = true,
}: PropsWithChildren<BodyProps>): React.ReactElement {
  const Container = scrollEnabled ? ScrollView : View;
  const additionalProps = scrollEnabled
    ? SHARED_CONFIG.scrollableViewProps
    : null;

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Container {...additionalProps} style={{ flex: 1 }}>
      <BodyWrapper>{children}</BodyWrapper>
    </Container>
  );
};

CommonLayout.Footer = function Footer({
  children,
}: PropsWithChildren<Record<string, unknown>>): React.ReactElement {
  return (
    <FooterWrapper withPadding={Boolean(children)}>
      <FooterShadow color="white" direction="to-up" />
      {children}
    </FooterWrapper>
  );
};
