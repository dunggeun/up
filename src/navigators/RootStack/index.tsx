import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { Demo } from 'src/components/Demo';
import type { RootStackScreenParamList } from './types';

const RootStack = createStackNavigator<RootStackScreenParamList>();

function Screen(): JSX.Element {
  return (
    <SafeAreaView>
      <Demo text="Hello, world!" />
    </SafeAreaView>
  );
}

export function RootStackNavigator(): JSX.Element {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen component={Screen} name="Main" />
    </RootStack.Navigator>
  );
}
