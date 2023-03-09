import type { StackScreenProps } from '@react-navigation/stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackScreenParamList = {
  Main: undefined;
  Common: undefined;
  Quest: undefined;
  Landing: undefined;
  UserRegister: undefined;
}

export type RootStackProps<RouteName extends keyof RootStackScreenParamList> =
  StackScreenProps<RootStackScreenParamList, RouteName>;
