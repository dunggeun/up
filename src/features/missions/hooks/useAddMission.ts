import { useMutation, type UseMutationResult } from 'react-query';
import { addMission } from 'src/data';
import { AppManager } from 'src/modules/app';
import { Logger } from 'src/modules/logger';
import { queryClient } from 'src/stores/reactQuery';
import { t } from 'src/translations';
import type { Mission } from '../types';

const TAG = 'useAddMission';

export const useAddMission = (): UseMutationResult<
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
    },
    onError: (error) => {
      Logger.error(TAG, error.message);
      AppManager.showToast(t('message.error.common'));
    },
  });
};
