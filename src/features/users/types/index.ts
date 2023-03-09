export interface User {
  name: string;
  level: number;
  totalExp: number;
  currentExp: number;
  badge: number;
  unlockedBadges: Record<string, boolean>;
  theme: number;
  createdAt: number;
  updatedAt: number;
}
