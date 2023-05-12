import React, { type PropsWithChildren } from 'react';
import { styled, View } from 'dripsy';
import { MotiView } from 'moti';
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
  delay,
}: PropsWithChildren<DetailSectionProps>): JSX.Element {
  return (
    <MotiView
      animate={{ opacity: 1 }}
      delay={delay}
      from={{ opacity: 0 }}
      transition={{ type: 'timing' }}
    >
      <SectionContainer>
        <SectionTitle>{title}</SectionTitle>
        {children}
      </SectionContainer>
    </MotiView>
  );
}
