import type { UserStackScreenParamList } from './UserStack/types';
import type { MainTabScreenParamList } from './MainTab/types';
import type { CommonStackScreenParamList } from './CommonStack/types';
import type { QuestStackScreenParamList } from './QuestStack/types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NavigatorScreens = {
  Main: MainTabScreenParamList;
  User: UserStackScreenParamList;
  Common: CommonStackScreenParamList;
  Quest: QuestStackScreenParamList;
};
