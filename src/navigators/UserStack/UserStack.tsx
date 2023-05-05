import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { UserEditScreen } from 'src/features/users/screens';
import { SHARED_CONFIG } from 'src/constants';

import type { UserStackScreenParamList } from './types';

const UserStack = createStackNavigator<UserStackScreenParamList>();

export function UserStackNavigator(): JSX.Element {
  return (
    <UserStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: SHARED_CONFIG.navigatorCardStyle,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <UserStack.Screen component={UserEditScreen} name="UserEdit" />
    </UserStack.Navigator>
  );
}
