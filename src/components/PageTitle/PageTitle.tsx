import React from 'react';
import { styled, View } from 'dripsy';
import { H1 } from '../../designs/atoms/H1';

export interface PageTitleProps {
  title: string;
}

const StyledView = styled(View)({
  width: '100%',
  paddingY: '$04',
});

export function PageTitle({ title }: PageTitleProps): JSX.Element {
  return (
    <StyledView>
      <H1 variant="primary">{title}</H1>
    </StyledView>
  );
}
