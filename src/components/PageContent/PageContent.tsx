import React, { type PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';
import { styled, View } from 'dripsy';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PageContentProps extends ViewProps {}

const StyledView = styled(View)({
  position: 'relative',
  flex: 1,
  gap: '$04',
});

export function PageContent({
  children,
}: PropsWithChildren<PageContentProps>): React.ReactElement {
  return <StyledView>{children}</StyledView>;
}
