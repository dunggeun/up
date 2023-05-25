import { useMutation, type UseMutationResult } from 'react-query';
import { deleteMission, type MissionIdParam } from 'src/data';
import { ToastController } from 'src/modules/app/controllers/ToastController';
import { Logger } from 'src/modules/logger';
import { queryClient } from 'src/stores/reactQuery';
import { t } from 'src/translations';
import type { Mission } from '../types';

interface UseDeleteMissionParams {
  onSuccess?: () => void;
}

const TAG = 'useDeleteMission';

export const useDeleteMission = ({
  onSuccess,
}: UseDeleteMissionParams): UseMutationResult<void, Error, MissionIdParam> => {
  return useMutation(deleteMission, {
    onSuccess: (_data, { missionId }) => {
      queryClient.setQueryData<Mission[]>(
        ['missions', 'list'],
        (previousMissions = []) =>
          previousMissions.filter(
            (previousMission) => previousMission.id !== missionId,
          ),
      );

      void queryClient.invalidateQueries(['missions', 'list'], {
        refetchActive: false,
      });

      onSuccess?.();
    },
    onError: (error) => {
      Logger.error(TAG, error.message);
      ToastController.show(t('message.error.common'));
    },
  });
};
