import { useMutation, type UseMutationResult } from 'react-query';
import { deleteQuest } from 'src/data';
import { AppManager } from 'src/modules/app';
import { Logger } from 'src/modules/logger';
import { queryClient } from 'src/stores/reactQuery';
import { t } from 'src/translations';
import type { Quest } from '../types';

interface UseDeleteQuestParams {
  onSuccess?: () => void;
}

const TAG = 'useDeleteQuest';

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
    onError: (error) => {
      Logger.error(TAG, error.message);
      AppManager.showToast(t('message.error.common'));
    },
  });
};
