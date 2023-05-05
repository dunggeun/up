import { createElement } from 'react';
import { useActor } from '@xstate/react';
import { useMutation, type UseMutationResult } from 'react-query';
import { AppManager } from 'src/modules/app';
import { globalMachineService } from 'src/stores/machines';
import { queryClient } from 'src/stores/reactQuery';
import { addAchieve, type AddAchieveResult } from 'src/data';
import { Text } from 'src/designs';
import { t } from 'src/translations';

import type { Quest, QuestDetail, AchieveDetail } from '../types';

const ErrorToastContent = createElement(Text, null, t('message.error.common'));

export const useAddAchieve = (): UseMutationResult<
  AddAchieveResult,
  Error,
  Parameters<typeof addAchieve>[0],
  { previousQuest?: Quest; previousQuests?: Quest[] }
> => {
  const [_, send] = useActor(globalMachineService);

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
        (previousQuests = []) =>
          previousQuests.map((previousQuest) =>
            previousQuest.id === quest.id ? quest : previousQuest,
          ),
      );
      queryClient.setQueryData<AchieveDetail[]>(
        ['achieves', 'list'],
        (previousAchieves = []) => [
          {
            ...achieve,
            quest_name: quest.title,
          },
          ...previousAchieves,
        ],
      );
      send({ type: 'REWARD', exp: achieve.exp });

      void queryClient.invalidateQueries(['quests', 'detail', questId], {
        refetchActive: false,
      });
      void queryClient.invalidateQueries(['quests', 'list'], {
        refetchActive: false,
      });
      void queryClient.invalidateQueries(['achieves', 'list'], {
        refetchActive: false,
      });
    },
    onError: (_error) => {
      AppManager.showToast(ErrorToastContent);
    },
  });
};
