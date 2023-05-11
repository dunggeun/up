import type { StackScreenProps } from '@react-navigation/stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MissionStackScreenParamList = {
  MissionCreate: undefined;
  MissionDetail: {
    id: number;
  };
  MissionFinished: {
    id: number;
  };
};

export type MissionStackProps<
  RouteName extends keyof MissionStackScreenParamList,
> = StackScreenProps<MissionStackScreenParamList, RouteName>;
