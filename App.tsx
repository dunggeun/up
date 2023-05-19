import React, { type PropsWithChildren } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { DripsyProvider } from 'dripsy';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { Logger } from 'src/modules/logger';
import { navigationRef } from 'src/navigators/helpers';
import { queryClient } from 'src/stores/reactQuery';
import { RecoilExternalPortal } from 'src/stores/recoil';
import { themeLight } from 'src/themes';
import { colors } from 'src/themes/colors';
import { titleFormatter } from 'src/utils';
import { AnimateSuspense, Toast } from 'src/components';
import { Modals } from './Modals';

// eslint-disable-next-line import/no-named-as-default-member
const Navigator = React.lazy(() => import('src/navigators'));

const gestureHandlerStyle = { flex: 1 } as const;

function AppProviders<T = unknown>({
  children,
}: PropsWithChildren<T>): React.ReactElement {
  return (
    <GestureHandlerRootView style={gestureHandlerStyle}>
      <SafeAreaProvider>
        <DripsyProvider theme={themeLight}>
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>
              <RecoilExternalPortal />
              <NavigationContainer
                documentTitle={{ formatter: titleFormatter }}
                onReady={(): void => {
                  Logger.info('NavigationContainer', 'onReady');
                }}
                ref={navigationRef}
              >
                {children}
              </NavigationContainer>
              <Toast />
              <Modals />
            </RecoilRoot>
          </QueryClientProvider>
        </DripsyProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export function App(): React.ReactElement {
  return (
    <AppProviders>
      <StatusBar backgroundColor={colors.$white} barStyle="dark-content" />
      <AnimateSuspense fallback={null}>
        <Navigator />
      </AnimateSuspense>
    </AppProviders>
  );
}
