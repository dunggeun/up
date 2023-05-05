import type { StackScreenProps } from '@react-navigation/stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type UserStackScreenParamList = {
  UserEdit: undefined;
};

export type UserStackProps<RouteName extends keyof UserStackScreenParamList> =
  StackScreenProps<UserStackScreenParamList, RouteName>;
