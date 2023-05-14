import React, { Suspense, type PropsWithChildren } from 'react';
import { styled } from 'dripsy';
import { MotiView } from 'moti';

export interface AnimateSuspenseProps {
  fallback?: React.ReactNode;
}

const AnimateWrapper = styled(MotiView)({
  flex: 1,
  backgroundColor: '$white',
});

export function AnimateSuspense({
  children,
  fallback,
}: PropsWithChildren<AnimateSuspenseProps>): React.ReactElement {
  return (
    <Suspense fallback={fallback}>
      <AnimateWrapper
        animate={{ opacity: 1, scale: 1 }}
        from={{ opacity: 0.5, scale: 0.8 }}
        transition={{ type: 'timing' }}
      >
        {children}
      </AnimateWrapper>
    </Suspense>
  );
}
