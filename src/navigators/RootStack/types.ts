import type { StackScreenProps } from '@react-navigation/stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackScreenParamList = {
  // authorized
  Main: undefined;
  Common: undefined;
  User: undefined;
  Mission: undefined;
  // unauthorized
  Landing: undefined;
  UserRegister: undefined;
};

export type RootStackProps<RouteName extends keyof RootStackScreenParamList> =
  StackScreenProps<RootStackScreenParamList, RouteName>;
