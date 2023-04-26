import type { QuestStackScreenParamList } from './QuestStack/types';
import type { MainTabScreenParamList } from './MainTab/types';
import type { CommonStackScreenParamList } from './CommonStack/types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NavigatorScreens = {
  Main: MainTabScreenParamList;
  Common: CommonStackScreenParamList;
  Quest: QuestStackScreenParamList;
};
