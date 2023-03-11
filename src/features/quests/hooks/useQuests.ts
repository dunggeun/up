import { useQuery, type UseQueryResult } from 'react-query';
import { fetchQuests } from 'src/data';
import type { Quest } from '../types';

interface UseQuestConfig {
  suspense?: boolean;
}

export const useQuests = ({ suspense }: UseQuestConfig): UseQueryResult<Quest[]> => {
  return useQuery('quests', fetchQuests, { suspense });
};
