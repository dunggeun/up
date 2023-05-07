import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  OpenSourceProjectScreen,
  DataManagementScreen,
} from 'src/features/misc';
import { SHARED_CONFIG } from 'src/constants';

import type { CommonStackScreenParamList } from './types';

const CommonStack = createStackNavigator<CommonStackScreenParamList>();

export function CommonStackNavigator(): JSX.Element {
  return (
    <CommonStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: SHARED_CONFIG.navigatorCardStyle,
      }}
    >
      <CommonStack.Screen
        component={OpenSourceProjectScreen}
        name="OpenSourceProject"
      />
      <CommonStack.Screen
        component={DataManagementScreen}
        name="DataManagement"
      />
    </CommonStack.Navigator>
  );
}
