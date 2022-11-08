import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { PropsWithChildren } from 'react';
import { RootStackNavigator } from './src/screens';

function AppProviders<T = unknown>({ children }: PropsWithChildren<T>): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export function App(): JSX.Element {
  return (
    <AppProviders>
      <RootStackNavigator />
    </AppProviders>
  );
}
