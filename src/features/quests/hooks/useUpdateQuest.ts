import { createElement } from 'react';
import { useMutation, type UseMutationResult } from 'react-query';
import { Text } from 'src/designs';
import { AppManager } from 'src/modules';
import { updateQuest } from 'src/data';
import { t } from 'src/translations';

import type { Quest } from '../types';

interface UseUpdateQuestParams {
  onSuccess?: () => void;
}

const manager = AppManager.getInstance();
const queryClient = manager.getQueryClient();

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
      const oldQuest = queryClient.getQueryData<Quest>(
        ['quests', 'detail', questId],
      );

      if (oldQuest) {
        const updatedQuest = { ...oldQuest, ...data };

        queryClient.setQueryData<Quest>(
          ['quests', 'detail', questId],
          updatedQuest,
        );

        queryClient.setQueryData<Quest[]>(
          ['quests', 'list'],
          (previousQuests = []) => previousQuests.map(
            (previousQuest) => previousQuest.id === oldQuest.id
              ? updatedQuest
              : previousQuest
          ),
        );
      }

      void queryClient.invalidateQueries(['quests', 'detail', questId], {
        refetchActive: !oldQuest,
      });
      void queryClient.invalidateQueries(['quests', 'list']);

      onSuccess?.();
    },
  });
};
