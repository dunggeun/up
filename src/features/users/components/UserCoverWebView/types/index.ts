import type { User } from 'src/features/users';

export interface CoverGenerateConfig {
  color: string;
  user: Pick<User, 'name' | 'level' | 'currentExp'> & {
    totalExp: number;
  };
  date: string;
}

export interface WebViewMessage {
  type: 'success' | 'error';
  data: string;
}
