import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Input } from 'src/designs';
import { Demo } from 'src/components/Demo';

import type { RootStackScreenParamList } from './types';

const RootStack = createStackNavigator<RootStackScreenParamList>();

function Screen(): JSX.Element {
  const [inputValue, setInputValue] = useState('');

  return (
    <SafeAreaView>
      <Button accessibilityRole="button" color="$blue" label="Button!" />
      <Input
        onChangeText={(value): void => setInputValue(value)}
        placeholder="Input here"
        value={inputValue}
      />
      <Demo text={inputValue} />
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
