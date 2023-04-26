import { useQuery, type UseQueryResult } from 'react-query';
import { fetchQuestDetailById } from 'src/data';
import type { QuestDetail } from '../types';

interface UseQuestDetailParams {
  id: number;
}

interface UseQuestDetailConfig {
  suspense?: boolean;
}

export const useQuestDetail = (
  { id }: UseQuestDetailParams,
  { suspense }: UseQuestDetailConfig = {},
): UseQueryResult<QuestDetail> => {
  return useQuery(
    ['quests', 'detail', id],
    () => fetchQuestDetailById({ questId: id }),
    { suspense },
  );
};
