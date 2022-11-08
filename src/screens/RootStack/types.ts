import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

export interface RootStackScreenParamList extends ParamListBase {
  Main: undefined;
  Common: undefined;
  Idle: undefined;
}

export type RootStackProps<RouteName extends keyof RootStackScreenParamList> =
  StackScreenProps<RootStackScreenParamList, RouteName>;
