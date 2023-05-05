import { useQuery, type UseQueryResult } from 'react-query';
import { fetchQuests } from 'src/data';
import { Logger } from 'src/modules/logger';
import type { Quest } from '../types';

interface UseQuestConfig {
  suspense?: boolean;
}

const TAG = 'useQuests';

export const useQuests = ({
  suspense,
}: UseQuestConfig): UseQueryResult<Quest[]> => {
  return useQuery(['quests', 'list'], fetchQuests, {
    suspense,
    onError: (error) => {
      Logger.error(TAG, (error as Error).message);
    },
  });
};
