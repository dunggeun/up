export type RemindTime = `${number}:${number}`;

export interface User {
  name: string;
  level: number;
  totalExp: number;
  currentExp: number;
  badge: number;
  unlockedBadges: Record<string, number>;
  theme: number;
  settings: {
    enableHaptic: boolean;
  };
  remindAt: RemindTime | null;
  createdAt: number;
  updatedAt: number;
}
