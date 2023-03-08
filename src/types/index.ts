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

export interface Quest {
  id: number;
  title: string;
  description: string;
  max_streak: number;
  current_streak: number;
  created_at: number;
  finished_at: number;
}

export interface Achieve {
  id: number;
  qid: number;
  exp: number;
  created_at: number;
}
