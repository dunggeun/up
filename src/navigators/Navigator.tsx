import React from 'react';
import { AnimateSuspense } from 'src/components';
import { SplashScreen } from 'src/features/misc';
import { ExpEffectView } from 'src/features/quests/components/ExpEffectView';
import { RootStackNavigator } from './RootStack';

export function Navigator(): JSX.Element {
  return (
    <AnimateSuspense fallback={<SplashScreen />}>
      <RootStackNavigator />
      <ExpEffectView />
    </AnimateSuspense>
  );
}
