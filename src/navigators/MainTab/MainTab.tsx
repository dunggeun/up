import { useMemo } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSx, useDripsyTheme } from 'dripsy';
import { Home, Menu, Profile } from 'src/assets/icons';
import { CONTAINER_MAX_WIDTH } from 'src/constants';

import type { MainTabScreenParamList } from './types';

const TAB_BAR_HEIGHT = 60;
const BORDER_WIDTH = 2;

const MainTab = createBottomTabNavigator<MainTabScreenParamList>();

function Empty(): null {
  return null;
}

export function MainTabNavigator(): JSX.Element {
  const sx = useSx();
  const { theme } = useDripsyTheme();
  const { bottom } = useSafeAreaInsets();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const tabBarStyle = sx({
    alignSelf: 'center',
    width: '90%',
    maxWidth: CONTAINER_MAX_WIDTH,
    height: TAB_BAR_HEIGHT,
    padding: '$04',
    paddingBottom: '$04',
    marginBottom: Platform.OS === 'web' ? '$04' : bottom,
    borderRadius: '$full',
    borderWidth: BORDER_WIDTH,
    borderTopWidth: BORDER_WIDTH,
    borderColor: '$text_primary',
    borderTopColor: '$text_primary',
    backgroundColor: '$white',
  });

  const tabBarItemOptions = useMemo(() => ({
    tabBarShowLabel: false,
    tabBarActiveTintColor: theme.colors.$brand,
    tabBarInactiveTintColor: theme.colors.$text_primary,
    tabBarItemStyle: {
      paddingBottom: theme.space.$01,
    },
    tabBarIconStyle: {
      transform: [{ scale: 1.5 }]
    },
  }), [theme]);

  return (
    <MainTab.Navigator
      backBehavior="none"
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tabBarStyle,
      }}
    >
      <MainTab.Screen
        component={Empty}
        name="User"
        options={{ ...tabBarItemOptions, tabBarIcon: Profile }}
      />
      <MainTab.Screen
        component={Empty}
        name="Home"
        options={{ ...tabBarItemOptions, tabBarIcon: Home }}
      />
      <MainTab.Screen
        component={Empty}
        name="Menu"
        options={{ ...tabBarItemOptions, tabBarIcon: Menu }}
      />
    </MainTab.Navigator>
  );
};
