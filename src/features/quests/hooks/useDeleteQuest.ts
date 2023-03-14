import { createElement } from 'react';
import { useMutation, type UseMutationResult } from 'react-query';
import { Text } from 'src/designs';
import { AppManager } from 'src/modules';
import { deleteQuest } from 'src/data';
import { t } from 'src/translations';

import type { Quest } from '../types';

interface UseDeleteQuestParams {
  onSuccess?: () => void;
}

const manager = AppManager.getInstance();
const queryClient = manager.getQueryClient();

const ErrorToastContent = createElement(Text, null, t('message.error.common'));

export const useDeleteQuest = ({
  onSuccess,
}: UseDeleteQuestParams): UseMutationResult<
  void,
  Error,
  Parameters<typeof deleteQuest>[0]
> => {
  return useMutation(deleteQuest, {
    onSuccess: (_data, { questId }) => {
      queryClient.setQueryData<Quest[]>(
        ['quests', 'list'],
        (previousQuests = []) => previousQuests.filter(
          (previousQuest) => previousQuest.id !== questId
        ),
      );

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
