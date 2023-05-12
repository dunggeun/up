import { useMutation, type UseMutationResult } from 'react-query';
import { updateMission } from 'src/data';
import { AppManager } from 'src/modules/app';
import { Logger } from 'src/modules/logger';
import { queryClient } from 'src/stores/reactQuery';
import { t } from 'src/translations';
import type { Mission, MissionDetail } from '../types';

interface UseUpdateMissionParams {
  onSuccess?: () => void;
}

const TAG = 'useUpdateMission';

export const useUpdateMission = ({
  onSuccess,
}: UseUpdateMissionParams): UseMutationResult<
  Partial<Mission>,
  Error,
  Parameters<typeof updateMission>[0]
> => {
  return useMutation(updateMission, {
    onSuccess: (data, { missionId }) => {
      const oldMissionDetail = queryClient.getQueryData<MissionDetail>([
        'missions',
        'detail',
        missionId,
      ]);

      if (oldMissionDetail) {
        const updatedMission = { ...oldMissionDetail.mission, ...data };

        queryClient.setQueryData<MissionDetail>(
          ['missions', 'detail', missionId],
          {
            ...oldMissionDetail,
            mission: updatedMission,
          },
        );

        queryClient.setQueryData<Mission[]>(
          ['missions', 'list'],
          (previousMissions = []) =>
            previousMissions.map((previousMission) =>
              previousMission.id === oldMissionDetail.mission.id
                ? updatedMission
                : previousMission,
            ),
        );

        void queryClient.invalidateQueries(['missions', 'detail', missionId]);
        void queryClient.invalidateQueries(['missions', 'list']);
      }

      onSuccess?.();
    },
    onError: (error) => {
      Logger.error(TAG, error.message);
      AppManager.showToast(t('message.error.common'));
    },
  });
};
