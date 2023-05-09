import { useActor } from '@xstate/react';
import { useMutation, type UseMutationResult } from 'react-query';
import { addAchieve, type AddAchieveResult } from 'src/data';
import { AppManager } from 'src/modules/app';
import { Logger } from 'src/modules/logger';
import { globalMachineService } from 'src/stores/machines';
import { queryClient } from 'src/stores/reactQuery';
import { t } from 'src/translations';
import type { Quest, QuestDetail } from '../types';

const TAG = 'useAddAchieve';

export const useAddAchieve = (): UseMutationResult<
  AddAchieveResult,
  Error,
  Parameters<typeof addAchieve>[0],
  { previousQuest?: Quest; previousQuests?: Quest[] }
> => {
  const [_, send] = useActor(globalMachineService);

  return useMutation(addAchieve, {
    onSuccess: ({ quest, achieve }, { questId }) => {
      queryClient.setQueryData<number>(
        ['achieve', 'count'],
        (count) => (count ?? 0) + 1,
      );
      queryClient.setQueryData<QuestDetail>(
        ['quests', 'detail', questId],
        (questDetail) => ({
          quest,
          achieveList: [achieve, ...(questDetail?.achieveList ?? [])],
        }),
      );
      queryClient.setQueryData<Quest[]>(
        ['quests', 'list'],
        (previousQuests = []) =>
          previousQuests.map((previousQuest) =>
            previousQuest.id === quest.id ? quest : previousQuest,
          ),
      );
      send({ type: 'REWARD', exp: achieve.exp });

      void queryClient.invalidateQueries(['quests', 'detail', questId], {
        refetchActive: false,
      });
      void queryClient.invalidateQueries(['quests', 'list'], {
        refetchActive: false,
      });
    },
    onError: (error) => {
      Logger.error(TAG, error.message);
      AppManager.showToast(t('message.error.common'));
    },
  });
};
