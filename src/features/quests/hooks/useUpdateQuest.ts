import { createElement } from 'react';
import { useMutation, type UseMutationResult } from 'react-query';
import { Text } from 'src/designs';
import { AppManager } from 'src/modules/app';
import { queryClient } from 'src/stores/reactQuery';
import { updateQuest } from 'src/data';
import { t } from 'src/translations';

import type { Quest, QuestDetail } from '../types';

interface UseUpdateQuestParams {
  onSuccess?: () => void;
}

const ErrorToastContent = createElement(Text, null, t('message.error.common'));

export const useUpdateQuest = ({
  onSuccess,
}: UseUpdateQuestParams): UseMutationResult<
  Partial<Quest>,
  Error,
  Parameters<typeof updateQuest>[0]
> => {
  return useMutation(updateQuest, {
    onError: (_error) => {
      AppManager.showToast(ErrorToastContent);
    },
    onSuccess: (data, { questId }) => {
      const oldQuestDetail = queryClient.getQueryData<QuestDetail>([
        'quests',
        'detail',
        questId,
      ]);

      if (oldQuestDetail) {
        const updatedQuest = { ...oldQuestDetail.quest, ...data };

        queryClient.setQueryData<QuestDetail>(['quests', 'detail', questId], {
          ...oldQuestDetail,
          quest: updatedQuest,
        });

        queryClient.setQueryData<Quest[]>(
          ['quests', 'list'],
          (previousQuests = []) =>
            previousQuests.map((previousQuest) =>
              previousQuest.id === oldQuestDetail.quest.id
                ? updatedQuest
                : previousQuest,
            ),
        );

        void queryClient.invalidateQueries(['quests', 'detail', questId]);
        void queryClient.invalidateQueries(['quests', 'list']);
      }

      onSuccess?.();
    },
  });
};
