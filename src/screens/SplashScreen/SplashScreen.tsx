import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
});

export function SplashScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Splash</Text>
    </SafeAreaView>
  );
}
