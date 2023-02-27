import React, { type PropsWithChildren } from 'react';
import { styled, View } from 'dripsy';
import type { ViewProps } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageContentProps extends ViewProps {};

const StyledView = styled(View)({
  position: 'relative',
  flex: 1,
  gap: '$04',
});

export function PageContent ({ children }: PropsWithChildren<PageContentProps>): JSX.Element {
  return <StyledView>{children}</StyledView>;
}
