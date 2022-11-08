import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import type { RootStackScreenParamList } from './types';

const RootStack = createStackNavigator<RootStackScreenParamList>();

function Screen(): JSX.Element {
  return (
    <SafeAreaView>
      <Text>Hello, world!</Text>
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
