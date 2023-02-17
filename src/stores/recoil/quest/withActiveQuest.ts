import { selector } from 'recoil';
import { questList } from './atom';

export const activeQuestList = selector({
  key: 'activeQuestList',
  // eslint-disable-next-line camelcase
  get: ({ get }) => get(questList).filter(({ finished_at }) => !finished_at),
});
