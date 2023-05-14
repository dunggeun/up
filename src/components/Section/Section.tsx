import React, { type PropsWithChildren } from 'react';
import { styled, View } from 'dripsy';
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
  title,
  subTitle,
  center = false,
}: PropsWithChildren<SectionProps>): React.ReactElement {
  const renderTitle = (): React.ReactElement | null => {
    const renderSubTitle = (): React.ReactElement | null =>
      subTitle ? <SubTitle>{` ${subTitle}`}</SubTitle> : null;

    return title ? (
      <Title>
        {title}
        {renderSubTitle()}
      </Title>
    ) : null;
  };

  return (
    <SectionContainer>
      {renderTitle()}
      <ContentWrapper center={center}>{children}</ContentWrapper>
    </SectionContainer>
  );
}
