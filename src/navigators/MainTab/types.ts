import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MainTabScreenParamList = {
  Home: undefined;
  User: undefined;
  Menu: undefined;
}

export type MainTabProps<RouteName extends keyof MainTabScreenParamList> =
  BottomTabScreenProps<MainTabScreenParamList, RouteName>;
