import type { StackScreenProps } from '@react-navigation/stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type QuestStackScreenParamList = {
  CreateQuest: undefined;
  QuestDetail: {
    id: number;
  };
}

export type QuestStackProps<RouteName extends keyof QuestStackScreenParamList> =
  StackScreenProps<QuestStackScreenParamList, RouteName>;
