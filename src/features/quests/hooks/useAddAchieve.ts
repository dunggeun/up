import { createElement } from 'react';
import { useActor } from '@xstate/react';
import { useMutation, type UseMutationResult } from 'react-query';
import { Text } from 'src/designs';
import { AppManager } from 'src/modules';
import { addAchieve, type AddAchieveResult } from 'src/data';
import { t } from 'src/translations';

import type { Quest, QuestDetail } from '../types';

interface UseAddAchieveParams {
  onSuccess?: () => void;
}

const manager = AppManager.getInstance();
const queryClient = manager.getQueryClient();
const service = manager.getService();

const ErrorToastContent = createElement(Text, null, t('message.error.common'));

export const useAddAchieve = ({
  onSuccess,
}: UseAddAchieveParams): UseMutationResult<
  AddAchieveResult,
  Error,
  Parameters<typeof addAchieve>[0],
  { previousQuest?: Quest, previousQuests?: Quest[] }
> => {
  const [_, send] = useActor(service);

  return useMutation(addAchieve, {
    onSuccess: ({ quest, achieve }, { questId }) => {
      queryClient.setQueryData<QuestDetail>(
        ['quests', 'detail', questId],
        (questDetail) => ({
          quest,
          achieveList: [achieve, ...(questDetail?.achieveList ?? [])],
        }),
      );
      queryClient.setQueryData<Quest[]>(
        ['quests', 'list'],
        (previousQuests = []) => previousQuests.map(
          (previousQuest) => previousQuest.id === quest.id ? quest : previousQuest
        ),
      );
      send({ type: 'REWARD', exp: achieve.exp });

      void queryClient.invalidateQueries(['quests', 'detail', questId], {
        refetchActive: false,
      });
      void queryClient.invalidateQueries(['quests', 'list'], {
        refetchActive: false,
      });

      onSuccess?.();
    },
    onError: (_error) => {
      AppManager.showToast(ErrorToastContent);
    },
  });
};
