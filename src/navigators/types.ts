import type { CommonStackScreenParamList } from './CommonStack/types';
import type { MainTabScreenParamList } from './MainTab/types';
import type { MissionStackScreenParamList } from './MissionStack/types';
import type { UserStackScreenParamList } from './UserStack/types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NavigatorScreens = {
  Main: MainTabScreenParamList;
  User: UserStackScreenParamList;
  Common: CommonStackScreenParamList;
  Mission: MissionStackScreenParamList;
};
