import { useQuery, type UseQueryResult } from 'react-query';
import { fetchQuestDetailById } from 'src/data';
import { Logger } from 'src/modules/logger';
import type { QuestDetail } from '../types';

interface UseQuestDetailParams {
  id: number;
}

interface UseQuestDetailConfig {
  suspense?: boolean;
}

const TAG = 'useQuestDetail';

export const useQuestDetail = (
  { id }: UseQuestDetailParams,
  { suspense }: UseQuestDetailConfig = {},
): UseQueryResult<QuestDetail> => {
  return useQuery(
    ['quests', 'detail', id],
    () => fetchQuestDetailById({ questId: id }),
    {
      suspense,
      onError: (error) => {
        Logger.error(TAG, (error as Error).message);
      },
    },
  );
};
