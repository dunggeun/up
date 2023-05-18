import type { User } from 'src/features/users';

export interface CoverGenerateConfig
  extends Pick<User, 'name' | 'level' | 'currentExp'> {
  userColor: string;
  targetExp: number;
  formattedDate: string;
  missions: string[];
  earnedExp: number;
}

export interface WebViewMessage {
  type: 'success' | 'error';
  data: string;
}
