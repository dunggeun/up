import { atom } from 'recoil';

import type { QuestItemPosition } from '../types';

export const questItemPosition = atom<QuestItemPosition | null>({
  key: 'questItemPosition',
  default: null,
});
