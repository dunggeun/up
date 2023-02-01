import React, { Suspense } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DripsyProvider } from 'dripsy';
import { navigationRef } from 'src/navigators/helpers';
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
          <NavigationContainer ref={navigationRef}>
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
      <StatusBar barStyle="dark-content" />
      <Suspense fallback={null}>
        <Navigator />
      </Suspense>
    </AppProviders>
  );
}
