import { useActor } from '@xstate/react';
import { useMutation, type UseMutationResult } from 'react-query';
import { ToastController } from 'src/components/Toast/ToastController';
import { addAchieve, type AddAchieveResult } from 'src/data';
import { Logger } from 'src/modules/logger';
import { globalMachineService } from 'src/stores/machines';
import { queryClient } from 'src/stores/reactQuery';
import { t } from 'src/translations';
import type { Mission, MissionDetail } from '../types';

const TAG = 'useAddAchieve';

export const useAddAchieve = (): UseMutationResult<
  AddAchieveResult,
  Error,
  Parameters<typeof addAchieve>[0],
  { previousMission?: Mission; previousMissions?: Mission[] }
> => {
  const [_, send] = useActor(globalMachineService);

  return useMutation(addAchieve, {
    onSuccess: ({ mission, achieve }, { missionId }) => {
      queryClient.setQueryData<number>(
        ['achieve', 'count'],
        (count) => (count ?? 0) + 1,
      );
      queryClient.setQueryData<MissionDetail>(
        ['missions', 'detail', missionId],
        (missionDetail) => ({
          mission,
          achieveList: [achieve, ...(missionDetail?.achieveList ?? [])],
        }),
      );
      queryClient.setQueryData<Mission[]>(
        ['missions', 'list'],
        (previousMissions = []) =>
          previousMissions.map((previousMission) =>
            previousMission.id === mission.id ? mission : previousMission,
          ),
      );
      send({ type: 'REWARD', exp: achieve.exp });

      void queryClient.invalidateQueries(['missions', 'detail', missionId], {
        refetchActive: false,
      });
      void queryClient.invalidateQueries(['missions', 'list'], {
        refetchActive: false,
      });
    },
    onError: (error) => {
      Logger.error(TAG, error.message);
      ToastController.show(t('message.error.common'));
    },
  });
};
