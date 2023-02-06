import { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDripsyTheme } from 'dripsy';
import { Home, Menu, Profile } from 'src/assets/icons';
import { TabBar } from 'src/components';
import {
  Profile as ProfileScreen,
  Home as HomeScreen
} from 'src/screens';
import { t } from 'src/translations';

import type { MainTabScreenParamList } from './types';

const MainTab = createBottomTabNavigator<MainTabScreenParamList>();

function Empty(): null {
  return null;
}

export function MainTabNavigator(): JSX.Element {
  const { theme } = useDripsyTheme();
  const { bottom } = useSafeAreaInsets();

  const tabBarOptions = useMemo(() => ({
    title: '',
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
      sceneContainerStyle={{ backgroundColor: theme.colors.$white }}
      screenOptions={tabBarOptions}
      tabBar={TabBar}
    >
      <MainTab.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          title: t('title.profile'),
          tabBarIcon: Profile,
        }}
      />
      <MainTab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          title: t('title.home'),
          tabBarIcon: Home,
        }}
      />
      <MainTab.Screen
        component={Empty}
        name="Menu"
        options={{
          title: t('title.menu'),
          tabBarIcon: Menu,
        }}
      />
    </MainTab.Navigator>
  );
};
