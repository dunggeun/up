import React, { type PropsWithChildren } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { styled, View } from 'dripsy';
import { H2 } from 'src/designs/atoms/H2';

export interface DetailSectionProps {
  title: string;
  delay?: number;
}

const SectionContainer = styled(View)({
  gap: '$04',
});

const SectionTitle = styled(H2, {
  defaultVariant: 'text.primary',
})({
  paddingY: '$04',
});

export function DetailSection({
  children,
  title,
  delay = 0,
}: PropsWithChildren<DetailSectionProps>): React.ReactElement {
  return (
    <Animated.View entering={FadeIn.delay(delay)}>
      <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        {children}
      </SectionContainer>
    </Animated.View>
  );
}
