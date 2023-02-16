import React, { useRef, useEffect, type PropsWithChildren } from 'react';
import { Animated } from 'react-native';
import { styled } from 'dripsy';
import { H2 } from 'src/designs';

export interface DetailSectionProps {
  title: string;
  delay?: number;
}

const SectionContainer = styled(Animated.View)({
  gap: '$04',
});

const SectionTitle = styled(H2, {
  defaultVariant: 'text.primary'
})({
  paddingY: '$04',
});

export function DetailSection ({
  children,
  title,
  delay
}: PropsWithChildren<DetailSectionProps>): JSX.Element {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      delay,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation, delay]);

  return (
    <SectionContainer style={{ opacity: fadeAnimation }}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  );
}
