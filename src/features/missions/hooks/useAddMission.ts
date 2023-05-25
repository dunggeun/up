import { useMutation, type UseMutationResult } from 'react-query';
import { addMission } from 'src/data';
import { ToastController } from 'src/modules/app/controllers/ToastController';
import { Logger } from 'src/modules/logger';
import { queryClient } from 'src/stores/reactQuery';
import { t } from 'src/translations';
import type { Mission } from '../types';

const TAG = 'useAddMission';

interface UseAddMissionConfig {
  onSuccess?: () => void;
}

export const useAddMission = ({
  onSuccess,
}: UseAddMissionConfig): UseMutationResult<
  Mission,
  Error,
  Parameters<typeof addMission>[0]
> => {
  return useMutation(addMission, {
    onSuccess: (mission) => {
      queryClient.setQueryData<Mission[]>(
        ['missions', 'list'],
        (previousMissions = []) => [mission, ...previousMissions],
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
