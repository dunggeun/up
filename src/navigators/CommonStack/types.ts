import type { StackScreenProps } from '@react-navigation/stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type CommonStackScreenParamList = {
  OpenSourceProject: undefined;
}

export type CommonStackProps<RouteName extends keyof CommonStackScreenParamList> =
  StackScreenProps<CommonStackScreenParamList, RouteName>;
