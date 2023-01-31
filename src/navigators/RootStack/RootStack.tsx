import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { t } from 'src/translations';
import { AppManager } from 'src/modules';
import { useIsAuthorized } from 'src/hooks';
import {
  Landing as LandingScreen,
  RegisterUser as RegisterUserScreen,
} from 'src/screens';
import { MainTabNavigator } from '../MainTab';

import type { RootStackScreenParamList } from './types';

const RootStack = createStackNavigator<RootStackScreenParamList>();

export function RootStackNavigator(): JSX.Element | null {
  AppManager.getInstance().initialize();
  const { authorized } = useIsAuthorized();

  const renderScreens = (): JSX.Element => {
    switch (authorized) {
      case true:
        return (
          <RootStack.Screen component={MainTabNavigator} name="Main" />
        );

      case false:
      default:
        return (
          <>
            <RootStack.Screen
              component={LandingScreen}
              name="Landing"
              options={{
                title: t('title.landing'),
                animationEnabled: false
              }}
            />
            <RootStack.Screen
              component={RegisterUserScreen}
              name="RegisterUser"
              options={{ title: t('title.register_user') }}
            />
          </>
        );
    }
  };

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} >
      {renderScreens()}
    </RootStack.Navigator>
  );
}
