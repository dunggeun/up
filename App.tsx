import React, { type PropsWithChildren } from 'react';
import { StatusBar } from 'react-native';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DripsyProvider } from 'dripsy';
import { queryClient } from 'src/stores/reactQuery';
import { navigationRef } from 'src/navigators/helpers';
import { titleFormatter } from 'src/utils';
import { themeLight } from 'src/themes';
import { AnimateSuspense, Toast } from 'src/components';

// eslint-disable-next-line import/no-named-as-default-member
const Navigator = React.lazy(() => import('src/navigators'));

const gestureHandlerStyle = { flex: 1 } as const;

function AppProviders<T = unknown>({
  children,
}: PropsWithChildren<T>): JSX.Element {
  return (
    <GestureHandlerRootView style={gestureHandlerStyle}>
      <SafeAreaProvider>
        <DripsyProvider theme={themeLight}>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <NavigationContainer
                documentTitle={{ formatter: titleFormatter }}
                ref={navigationRef}
              >
                {children}
              </NavigationContainer>
            </RecoilRoot>
          </QueryClientProvider>
          <Toast />
        </DripsyProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export function App(): JSX.Element {
  return (
    <AppProviders>
      <StatusBar barStyle="dark-content" />
      <AnimateSuspense fallback={null}>
        <Navigator />
      </AnimateSuspense>
    </AppProviders>
  );
}
