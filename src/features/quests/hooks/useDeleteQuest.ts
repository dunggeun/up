import { useMutation, type UseMutationResult } from 'react-query';
import { AppManager } from 'src/modules/app';
import { queryClient } from 'src/stores/reactQuery';
import { deleteQuest } from 'src/data';
import { t } from 'src/translations';

import type { Quest } from '../types';

interface UseDeleteQuestParams {
  onSuccess?: () => void;
}

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
        (previousQuests = []) =>
          previousQuests.filter(
            (previousQuest) => previousQuest.id !== questId,
          ),
      );

      void queryClient.invalidateQueries(['quests', 'list'], {
        refetchActive: false,
      });

      onSuccess?.();
    },
    onError: (_error) => {
      AppManager.showToast(t('message.error.common'));
    },
  });
};
