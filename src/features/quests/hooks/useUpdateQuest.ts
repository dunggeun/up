import { useMutation, type UseMutationResult } from 'react-query';
import { updateQuest } from 'src/data';
import { AppManager } from 'src/modules/app';
import { Logger } from 'src/modules/logger';
import { queryClient } from 'src/stores/reactQuery';
import { t } from 'src/translations';
import type { Quest, QuestDetail } from '../types';

interface UseUpdateQuestParams {
  onSuccess?: () => void;
}

const TAG = 'useUpdateQuest';

export const useUpdateQuest = ({
  onSuccess,
}: UseUpdateQuestParams): UseMutationResult<
  Partial<Quest>,
  Error,
  Parameters<typeof updateQuest>[0]
> => {
  return useMutation(updateQuest, {
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
    onError: (error) => {
      Logger.error(TAG, error.message);
      AppManager.showToast(t('message.error.common'));
    },
  });
};
