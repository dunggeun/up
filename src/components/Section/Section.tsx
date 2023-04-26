import { styled, View } from 'dripsy';
import React, { type PropsWithChildren } from 'react';
import { H2 } from 'src/designs';

export interface SectionProps {
  title: string;
}

const SectionContainer = styled(View)({
  width: '100%',
  paddingY: '$04',
  gap: '$03',
});

export function Section({
  children,
  title,
}: PropsWithChildren<SectionProps>): JSX.Element {
  return (
    <SectionContainer>
      <H2 variant="primary">{title}</H2>
      <View>{children}</View>
    </SectionContainer>
  );
}
