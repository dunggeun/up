import { useQuery, type UseQueryResult } from 'react-query';
import { fetchAchieveCount } from 'src/data';

interface UseAchieveCountConfig {
  suspense?: boolean;
}

export const useAchieveCount = ({
  suspense,
}: UseAchieveCountConfig): UseQueryResult<number> => {
  return useQuery(['achieve', 'count'], fetchAchieveCount, {
    suspense,
  });
};
