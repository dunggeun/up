import { useMutation, type UseMutationResult } from 'react-query';
import { deleteMission } from 'src/data';
import { AppManager } from 'src/modules/app';
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
}: UseDeleteMissionParams): UseMutationResult<void, Error> => {
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
      AppManager.showToast(t('message.error.common'));
    },
  });
};
