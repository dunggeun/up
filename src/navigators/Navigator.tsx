import React from 'react';
import { AnimateSuspense } from 'src/components';
import { SplashScreen } from 'src/features/misc';
import { RootStackNavigator } from './RootStack';

export function Navigator(): JSX.Element {
  return (
    <AnimateSuspense fallback={<SplashScreen />}>
      <RootStackNavigator />
    </AnimateSuspense>
  );
}
