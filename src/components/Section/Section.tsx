import React, { type PropsWithChildren } from 'react';
import { styled, View } from 'dripsy';
import { match, P } from 'ts-pattern';
import { H2 } from '../../designs/atoms/H2';
import { H3 } from '../../designs/atoms/H3';

export interface SectionProps {
  title?: string;
  subTitle?: string;
  center?: boolean;
}

const SectionContainer = styled(View)({
  width: '100%',
  paddingY: '$04',
  gap: '$03',
});

const ContentWrapper = styled(View)(({ center }: { center: boolean }) => ({
  gap: '$02',
  alignItems: center ? 'center' : 'stretch',
}));

const Title = styled(H2, {
  defaultVariant: 'text.primary',
})();

const SubTitle = styled(H3, {
  defaultVariant: 'text.secondary',
})({ paddingLeft: '$02' });

export function Section({
  children,
  center = false,
  ...restProps
}: PropsWithChildren<SectionProps>): React.ReactElement {
  return (
    <SectionContainer>
      {match(restProps)
        .with(
          { title: P.string, subTitle: P.string },
          ({ title, subTitle }) => (
            <Title>
              {title}
              <SubTitle>{` ${subTitle}`}</SubTitle>
            </Title>
          ),
        )
        .with({ title: P.select(P.string) }, (title) => <Title>{title}</Title>)
        .otherwise(() => null)}
      <ContentWrapper center={center}>{children}</ContentWrapper>
    </SectionContainer>
  );
}
