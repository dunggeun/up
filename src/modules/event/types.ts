// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Achieve, Quest } from 'src/features/quests';

export type AppEventType = keyof AppEventPayload;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AppEventPayload = {
  levelup: {
    level: number;
  };
  createAchieve: {
    quest: Quest;
    achieve: Achieve;
  };
  createQuest: Quest;
  doneQuest: Quest;
  deleteQuest: any;
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
