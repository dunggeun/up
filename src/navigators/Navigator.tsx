import React from 'react';
import { SplashScreen } from 'src/features/misc';
import { AnimateSuspense } from 'src/components';
import { RootStackNavigator } from './RootStack';

export function Navigator(): JSX.Element {
  return (
    <AnimateSuspense fallback={<SplashScreen />}>
      <RootStackNavigator />
    </AnimateSuspense>
  );
}
