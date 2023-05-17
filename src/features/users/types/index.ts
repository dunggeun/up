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
  remindAt: string | null;
  createdAt: number;
  updatedAt: number;
}
