import { atom } from 'recoil';

import type { Quest } from 'src/types';

export const questList = atom<Quest[]>({
  key: 'questList',
  default: [],
});
