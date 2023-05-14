import React from 'react';
import { SplashScreen } from 'src/features/misc';
import { AnimateSuspense } from 'src/components';
import { RootStackNavigator } from './RootStack';

export function Navigator(): React.ReactElement {
  return (
    <AnimateSuspense fallback={<SplashScreen />}>
      <RootStackNavigator />
    </AnimateSuspense>
  );
}
