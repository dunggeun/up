import { useQuery, type UseQueryResult } from 'react-query';
import { fetchAchieves } from 'src/data';
import type { AchieveDetail } from '../types';

interface UseQuestConfig {
  suspense?: boolean;
}

export const useRecentAchieves = ({
  suspense,
}: UseQuestConfig): UseQueryResult<AchieveDetail[]> => {
  return useQuery(['achieves', 'list'], fetchAchieves, {
    suspense,
  });
};
