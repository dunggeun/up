import React, { Suspense } from 'react';
import { SplashScreen } from 'src/screens';
import { RootStackNavigator } from './RootStack';

export function Navigator(): JSX.Element {
  return (
    <Suspense fallback={<SplashScreen />} >
      <RootStackNavigator />
      {/* other stacks */}
    </Suspense>
  );
}
