import { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDripsyTheme } from 'dripsy';
import { Home, Menu, Profile } from 'src/assets/icons';
import { TabBar } from 'src/components';

import type { MainTabScreenParamList } from './types';

const MainTab = createBottomTabNavigator<MainTabScreenParamList>();

function Empty(): null {
  return null;
}

export function MainTabNavigator(): JSX.Element {
  const { theme } = useDripsyTheme();
  const { bottom } = useSafeAreaInsets();

  const tabBarOptions = useMemo(() => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveTintColor: theme.colors.$brand,
    tabBarInactiveTintColor: theme.colors.$text_tertiary,
    tabBarStyle: {
      marginBottom: bottom || theme.space.$04,
    },
    tabBarIconStyle: {
      transform: [{ scale: 1.5 }]
    },
  }), [theme, bottom]);

  return (
    <MainTab.Navigator
      backBehavior="none"
      initialRouteName="Home"
      screenOptions={tabBarOptions}
      tabBar={TabBar}
    >
      <MainTab.Screen
        component={Empty}
        name="User"
        options={{ tabBarIcon: Profile }}
      />
      <MainTab.Screen
        component={Empty}
        name="Home"
        options={{ tabBarIcon: Home }}
      />
      <MainTab.Screen
        component={Empty}
        name="Menu"
        options={{ tabBarIcon: Menu }}
      />
    </MainTab.Navigator>
  );
};