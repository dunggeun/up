import React, { type ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { styled, Container as DripsyContainer, View } from 'dripsy';
import { LinearGradient } from 'src/components/LinearGradient';
import { SafeAreaView } from 'src/components/SafeAreaView';
import { AppBar, type AppBarProps } from 'src/designs/molecules/AppBar';

const HeaderWrapper = styled(View)({
  marginX: '-$04',
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

const FooterShadow = styled(LinearGradient)({
  position: 'absolute',
  left: 0,
  right: 0,
  gap: '$04',
  paddingX: '$04',
  paddingBottom: '$04',
});

function CommonLayout ({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <SafeAreaView>
      <DripsyContainer>
        {children}
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

CommonLayout.Body = function Body ({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <ScrollView>
      <BodyWrapper>
        {children}
      </BodyWrapper>
    </ScrollView>
  );
};

CommonLayout.Footer = function Footer ({ children }: { children?: ReactNode }): JSX.Element {
  return (
    <FooterWrapper withPadding={Boolean(children)}>
      <FooterShadow color="white" fromOpacity={0} rotate={90} toOpacity={1} />
      {children}
    </FooterWrapper>
  );
};
