import { atom } from 'recoil';

import type { Quest } from 'src/features/quests';

export const questList = atom<Quest[]>({
  key: 'questList',
  default: [],
});
