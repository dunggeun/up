import type { StackScreenProps } from '@react-navigation/stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackScreenParamList = {
  Main: undefined;
  Common: undefined;
  Landing: undefined;
  RegisterUser: undefined;
}

export type RootStackProps<RouteName extends keyof RootStackScreenParamList> =
  StackScreenProps<RootStackScreenParamList, RouteName>;
