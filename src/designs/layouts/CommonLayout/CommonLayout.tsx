import React, { type PropsWithChildren } from 'react';
import { Animated } from 'react-native';
import { styled, Container as DripsyContainer, View } from 'dripsy';
import { SafeAreaView, type SafeAreaViewProps } from 'src/components/SafeAreaView';
import { KeyboardAvoidingView } from 'src/components/KeyboardAvoidingView';
import { LinearGradient } from 'src/components/LinearGradient';
import { AppBar, type AppBarProps } from 'src/designs/molecules/AppBar';
import { SHARED_CONFIG } from 'src/constants';

const HeaderWrapper = styled(View)({
  marginX: '-$04',
});

const ScrollView = styled(Animated.ScrollView)({
  marginX: '-$04',
  paddingX: '$04',
});

const BodyWrapper = styled(View)({
  flex: 1,
  gap: '$04',
});

const FooterWrapper = styled(View)(({ withPadding }: { withPadding: boolean }) => ({
  position: 'relative',
  gap: '$04',
  paddingBottom: withPadding ? '$04' : 0,
}));

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

export function CommonLayout ({
  children,
  keyboardAvoiding,
  ...props
}: PropsWithChildren<CommonLayoutProps>): JSX.Element {
  return (
    <SafeAreaView {...props}>
      <DripsyContainer>
        {keyboardAvoiding ? (
          <KeyboardAvoidingView>
            {children}
          </KeyboardAvoidingView>
        ) : children}
      </DripsyContainer>
    </SafeAreaView>
  );
}

CommonLayout.Header = function Header (props: Omit<AppBarProps, 'shadow'>): JSX.Element {
  return (
    <HeaderWrapper>
      <AppBar {...props} shadow />
    </HeaderWrapper>
  );
};

interface BodyProps {
  scrollEnabled?: boolean;
}

CommonLayout.Body = function Body ({
  children,
  scrollEnabled = true
}: PropsWithChildren<BodyProps>): JSX.Element {
  const Container = scrollEnabled ? ScrollView : View;
  const additionalProps = scrollEnabled ? SHARED_CONFIG.scrollableViewProps : null;

  return (
    <Container {...additionalProps} style={{ flex: 1 }}>
      <BodyWrapper>
        {children}
      </BodyWrapper>
    </Container>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
CommonLayout.Footer = function Footer ({ children }: PropsWithChildren<{}>): JSX.Element {
  return (
    <FooterWrapper withPadding={Boolean(children)}>
      <FooterShadow color="white" fromOpacity={0} rotate={90} toOpacity={1} />
      {children}
    </FooterWrapper>
  );
};
