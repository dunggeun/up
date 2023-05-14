import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {
  MissionCreateScreen,
  MissionDetailScreen,
  MissionFinishedScreen,
} from 'src/features/missions';
import { SHARED_CONFIG } from 'src/constants';
import type { MissionStackScreenParamList } from './types';

const MissionStack = createStackNavigator<MissionStackScreenParamList>();

export function MissionStackNavigator(): React.ReactElement {
  return (
    <MissionStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: SHARED_CONFIG.navigatorCardStyle,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <MissionStack.Screen
        component={MissionCreateScreen}
        name="MissionCreate"
      />
      <MissionStack.Screen
        component={MissionDetailScreen}
        name="MissionDetail"
      />
      <MissionStack.Screen
        component={MissionFinishedScreen}
        name="MissionFinished"
      />
    </MissionStack.Navigator>
  );
}
