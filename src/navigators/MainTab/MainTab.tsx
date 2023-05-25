import { useMemo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDripsyTheme } from 'dripsy';
import { MenuScreen, useGuideModal } from 'src/features/misc';
import { GuideModal } from 'src/features/misc/components/GuideModal';
import {
  useUserThemeColor,
  HomeScreen,
  ProfileScreen,
} from 'src/features/users';
import { TabBar } from 'src/components';
import { Icons } from 'src/assets';
import { t } from 'src/translations';
import type { MainTabScreenParamList } from './types';

const MainTab = createBottomTabNavigator<MainTabScreenParamList>();

export function MainTabNavigator(): React.ReactElement {
  const { visibility, setVisibility } = useGuideModal();
  const { theme } = useDripsyTheme();
  const { bottom } = useSafeAreaInsets();
  const userColor = useUserThemeColor();

  const tabBarOptions = useMemo(
    () => ({
      title: '',
      headerShown: false,
      unmountOnBlur: false,
      freezeOnBlur: true,
      tabBarShowLabel: false,
      tabBarActiveTintColor: theme.colors[userColor],
      tabBarInactiveTintColor: theme.colors.$text_tertiary,
      tabBarStyle: {
        marginBottom: bottom || theme.space.$04,
      },
      tabBarIconStyle: {
        transform: [{ scale: 1.5 }],
      },
    }),
    [theme, bottom, userColor],
  );

  const handleCloseGuideModal = useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  return (
    <>
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
            tabBarIcon: Icons.Profile,
          }}
        />
        <MainTab.Screen
          component={HomeScreen}
          name="Home"
          options={{
            title: t('title.home'),
            tabBarIcon: Icons.Home,
          }}
        />
        <MainTab.Screen
          component={MenuScreen}
          name="Menu"
          options={{
            title: t('title.menu'),
            tabBarIcon: Icons.Menu,
          }}
        />
      </MainTab.Navigator>
      <GuideModal onClose={handleCloseGuideModal} visible={visibility} />
    </>
  );
}
