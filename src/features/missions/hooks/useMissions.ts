import { useQuery, type UseQueryResult } from 'react-query';
import { fetchMissions } from 'src/data';
import { Logger } from 'src/modules/logger';
import type { Mission } from '../types';

interface UseMissionsConfig {
  suspense?: boolean;
}

const TAG = 'useMissions';

export const useMissions = ({
  suspense,
}: UseMissionsConfig): UseQueryResult<Mission[]> => {
  return useQuery(['missions', 'list'], fetchMissions, {
    suspense,
    onError: (error) => {
      Logger.error(TAG, (error as Error).message);
    },
  });
};
