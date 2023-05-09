import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {
  QuestCreateScreen,
  QuestDetailScreen,
  QuestFinishedScreen,
} from 'src/features/quests';
import { SHARED_CONFIG } from 'src/constants';
import type { QuestStackScreenParamList } from './types';

const QuestStack = createStackNavigator<QuestStackScreenParamList>();

export function QuestStackNavigator(): JSX.Element {
  return (
    <QuestStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: SHARED_CONFIG.navigatorCardStyle,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <QuestStack.Screen component={QuestCreateScreen} name="QuestCreate" />
      <QuestStack.Screen component={QuestDetailScreen} name="QuestDetail" />
      <QuestStack.Screen component={QuestFinishedScreen} name="QuestFinished" />
    </QuestStack.Navigator>
  );
}
