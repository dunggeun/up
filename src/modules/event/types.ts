/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Mission, Achieve } from 'src/features/missions';

export type AppEventType = keyof AppEventPayload;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AppEventPayload = {
  levelup: {
    level: number;
  };
  createAchieve: {
    mission: Mission;
    achieve: Achieve;
  };
  createMission: Mission;
  doneMission: {
    missionId: number;
  };
  deleteMission: any;
  unlockBadge: {
    badgeId: number;
  };
  shareProfile: any;
  enterOpenSource: any;
  changeTheme: {
    themeId: number;
  };
};

export type EventHandler<Type extends AppEventType> = (
  event: AppEventPayload[Type],
) => void;

export interface AppEventSubscription {
  remove: () => void;
}
