import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { CreateQuestScreen, QuestDetailScreen } from 'src/screens';

import type { QuestStackScreenParamList } from './types';

const QuestStack = createStackNavigator<QuestStackScreenParamList>();

export function QuestStackNavigator(): JSX.Element {
  return (
    <QuestStack.Navigator
      
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <QuestStack.Screen
        component={CreateQuestScreen}
        name="CreateQuest"
      />
      <QuestStack.Screen
        component={QuestDetailScreen}
        name="QuestDetail"
      />
    </QuestStack.Navigator>
  );
}
