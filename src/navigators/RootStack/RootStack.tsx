import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { LandingScreen } from 'src/features/misc';
import { UserRegisterScreen } from 'src/features/users';
import { AppManager } from 'src/modules/app';
import { useIsAuthorized } from 'src/hooks';
import { SHARED_CONFIG } from 'src/constants';
import { t } from 'src/translations';
import { CommonStackNavigator } from '../CommonStack';
import { MainTabNavigator } from '../MainTab';
import { QuestStackNavigator } from '../QuestStack';
import { UserStackNavigator } from '../UserStack';
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
            <RootStack.Screen component={UserStackNavigator} name="User" />
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
