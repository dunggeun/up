import React from 'react';
import { styled, View, ActivityIndicator } from 'dripsy';

export interface LoadingIndicatorProps {
  full?: boolean;
}

const Container = styled(View)(({ full }: Pick<LoadingIndicatorProps, 'full'>) => ({
  ...(full ? { flex: 1 } : null),
  width: '100%',
  padding: '$04',
  justifyContent: 'center',
  alignContent: 'center',
}));

export function LoadingIndicator({ full = true }: LoadingIndicatorProps): JSX.Element {
  return (
    <Container full={full}>
      <ActivityIndicator />
    </Container>
  );
}
