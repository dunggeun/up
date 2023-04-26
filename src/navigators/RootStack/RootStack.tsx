import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { AppManager } from 'src/modules';
import { useIsAuthorized } from 'src/hooks';
import { UserRegisterScreen } from 'src/features/users';
import { LandingScreen } from 'src/features/misc';
import { t } from 'src/translations';
import { SHARED_CONFIG } from 'src/constants';
import { MainTabNavigator } from '../MainTab';
import { CommonStackNavigator } from '../CommonStack';
import { QuestStackNavigator } from '../QuestStack';

import type { RootStackScreenParamList } from './types';

const RootStack = createStackNavigator<RootStackScreenParamList>();

export function RootStackNavigator(): JSX.Element | null {
  AppManager.getInstance().initialize();
  const { authorized } = useIsAuthorized();

  const renderScreens = (): JSX.Element => {
    switch (authorized) {
      case true:
        return (
          <>
            <RootStack.Screen
              component={MainTabNavigator}
              name="Main"
              options={{ animationEnabled: false }}
            />
            <RootStack.Screen component={CommonStackNavigator} name="Common" />
            <RootStack.Screen
              component={QuestStackNavigator}
              name="Quest"
              options={TransitionPresets.ModalSlideFromBottomIOS}
            />
          </>
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
                animationEnabled: false,
              }}
            />
            <RootStack.Screen
              component={UserRegisterScreen}
              name="UserRegister"
              options={{ title: t('title.register_user') }}
            />
          </>
        );
    }
  };

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: SHARED_CONFIG.navigatorCardStyle,
      }}
    >
      {renderScreens()}
    </RootStack.Navigator>
  );
}
