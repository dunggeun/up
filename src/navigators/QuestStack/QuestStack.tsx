import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { CreateQuest, QuestDetail } from 'src/screens';

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
        component={CreateQuest}
        name="CreateQuest"
      />
      <QuestStack.Screen
        component={QuestDetail}
        name="QuestDetail"
      />
    </QuestStack.Navigator>
  );
}
