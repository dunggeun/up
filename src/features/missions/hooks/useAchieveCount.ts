import { useQuery, type UseQueryResult } from 'react-query';
import { fetchAchieveCount } from 'src/data';
import { Logger } from 'src/modules/logger';

interface UseAchieveCountConfig {
  suspense?: boolean;
}

const TAG = 'useAchieveCount';

export const useAchieveCount = ({
  suspense,
}: UseAchieveCountConfig): UseQueryResult<number> => {
  return useQuery(['achieve', 'count'], fetchAchieveCount, {
    suspense,
    onError: (error) => {
      Logger.error(TAG, (error as Error).message);
    },
  });
};
