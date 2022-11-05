import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

export function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Hello, World!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
