import React, { Suspense, type PropsWithChildren } from 'react';
import { styled } from 'dripsy';
import { AnimatePresence, MotiView } from 'moti';

export interface AnimateSuspenseProps {
  fallback?: React.ReactNode;
}

const AnimateWrapper = styled(MotiView)({ flex: 1, backgroundColor: '$white' });

export function AnimateSuspense({
  children,
  fallback,
}: PropsWithChildren<AnimateSuspenseProps>): JSX.Element {
  return (
    <AnimatePresence exitBeforeEnter>
      <Suspense fallback={fallback}>
        <AnimateWrapper
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          exitTransition={{ type: 'timing' }}
          from={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'timing' }}
        >
          {children}
        </AnimateWrapper>
      </Suspense>
    </AnimatePresence>
  );
}
