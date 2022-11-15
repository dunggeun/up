import React, { Suspense } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DripsyProvider } from 'dripsy';
import { SplashScreen } from 'src/screens';
import { themeLight } from 'src/themes';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line import/no-named-as-default-member
const Navigator = React.lazy(() => import('src/navigators'));

const gestureHandlerStyle = { flex: 1 } as const;

function AppProviders<T = unknown>({ children }: PropsWithChildren<T>): JSX.Element {
  return (
    <GestureHandlerRootView style={gestureHandlerStyle}>
      <SafeAreaProvider>
        <DripsyProvider theme={themeLight}>
          <NavigationContainer>
            {children}
          </NavigationContainer>
        </DripsyProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export function App(): JSX.Element {
  return (
    <AppProviders>
      <Suspense fallback={<SplashScreen />} >
        <Navigator />
      </Suspense>
    </AppProviders>
  );
}
