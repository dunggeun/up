import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OpenSourceProjectScreen } from 'src/screens';

import type { CommonStackScreenParamList } from './types';

const CommonStack = createStackNavigator<CommonStackScreenParamList>();


export function CommonStackNavigator(): JSX.Element {
  return (
    <CommonStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <CommonStack.Screen
        component={OpenSourceProjectScreen}
        name="OpenSourceProject"
      />
    </CommonStack.Navigator>
  );
}
