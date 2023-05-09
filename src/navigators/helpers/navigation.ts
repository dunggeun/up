import { createRef } from 'react';
import type { NavigatorScreens } from '../types';
import type {
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef<ParamListBase>>();

export const navigate = <
  RouteName extends keyof NavigatorScreens,
  ScreenName extends keyof NavigatorScreens[RouteName],
  ParamType extends NavigatorScreens[RouteName][ScreenName],
>(
  name: RouteName,
  screenName: ScreenName,
  params?: ParamType,
): void => {
  navigationRef.current?.navigate(
    name as string,
    { screen: screenName, params } as object,
  );
};
