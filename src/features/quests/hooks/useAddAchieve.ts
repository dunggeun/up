import { createElement } from 'react';
import { useActor } from '@xstate/react';
import { useMutation, type UseMutationResult } from 'react-query';
import { Text } from 'src/designs';
import { AppManager } from 'src/modules';
import { updateQuestForAddAchieve } from 'src/modules/app/helpers';
import { addAchieve, type AddAchieveResult } from 'src/data';
import { t } from 'src/translations';

import type { Quest } from '../types';

const manager = AppManager.getInstance();
const queryClient = manager.getQueryClient();
const service = manager.getService();

const ErrorToastContent = createElement(Text, null, t('message.error.common'));

export const useAddAchieve = (): UseMutationResult<
  AddAchieveResult,
  Error,
  Parameters<typeof addAchieve>[0],
  { previousQuest?: Quest, previousQuests?: Quest[] }
> => {
  const [_, send] = useActor(service);

  return useMutation(addAchieve, {
    onMutate: async ({ questId }) => {
      await queryClient.cancelQueries(['quest', questId]);
      await queryClient.cancelQueries('quests');

      const previousQuests = queryClient.getQueryData<Quest[]>('quests');
      const targetIndex = previousQuests?.findIndex(({ id }) => id === questId) ?? -1;
      const previousQuest = previousQuests?.[targetIndex];
  
      if (!~targetIndex && previousQuest) {
        const updatedQuest = updateQuestForAddAchieve(previousQuest);
        previousQuests[targetIndex] = updatedQuest;
        queryClient.setQueryData<Quest>(['quest', questId], updatedQuest);
        queryClient.setQueryData<Quest[]>(['quests'], [...previousQuests]);
      }

      return { previousQuest, previousQuests };
    },
    onError: (_error, { questId }, context) => {
      if (context?.previousQuest) {
        queryClient.setQueryData<Quest>(['quest', questId], context.previousQuest);
      }

      if (context?.previousQuests) {
        queryClient.setQueryData<Quest[]>('quests', context.previousQuests);
      }
  
      AppManager.showToast(ErrorToastContent);
    },
    onSuccess: ({ achieve }) => {
      send({ type: 'REWARD', exp: achieve.exp });
    },
    onSettled: (_data, _error, { questId }) => {
      void queryClient.invalidateQueries(['quest', questId]);
      void queryClient.invalidateQueries('quests');
    },
  });
};
