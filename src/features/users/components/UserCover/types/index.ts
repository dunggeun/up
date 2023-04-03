import type { User } from 'src/features/users';

export interface CoverGenerateConfig {
  color: string;
  user: Pick<User, 'name' | 'level' | 'currentExp'> & {
    totalExp: number;
  };
  recentQuestTitle: string;
  labels: {
    recentAchieve: string;
  };
}

export interface WebViewMessage {
  type: 'success' | 'error';
  data: string;
}
