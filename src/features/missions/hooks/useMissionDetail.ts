import { useQuery, type UseQueryResult } from 'react-query';
import { fetchMissionDetailById } from 'src/data';
import { Logger } from 'src/modules/logger';
import type { MissionDetail } from '../types';

interface UseMissionDetailParams {
  id: number;
}

interface UseMissionDetailConfig {
  suspense?: boolean;
}

const TAG = 'useMissionDetail';

export const useMissionDetail = (
  { id }: UseMissionDetailParams,
  { suspense }: UseMissionDetailConfig = {},
): UseQueryResult<MissionDetail> => {
  return useQuery(
    ['missions', 'detail', id],
    () => fetchMissionDetailById({ missionId: id }),
    {
      suspense,
      onError: (error) => {
        Logger.error(TAG, (error as Error).message);
      },
    },
  );
};
