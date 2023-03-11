import { createElement } from 'react';
import { useMutation, type UseMutationResult } from 'react-query';
import { Text } from 'src/designs';
import { AppManager } from 'src/modules';
import { updateQuest } from 'src/data';
import { t } from 'src/translations';

interface UseUpdateQuestParams {
  onSuccess?: () => void;
}

const manager = AppManager.getInstance();
const queryClient = manager.getQueryClient();

const ErrorToastContent = createElement(Text, null, t('message.error.common'));

export const useUpdateQuest = ({
  onSuccess,
}: UseUpdateQuestParams): UseMutationResult<
  void,
  Error,
  Parameters<typeof updateQuest>[0]
> => {
  return useMutation(updateQuest, {
    onError: () => AppManager.showToast(ErrorToastContent),
    onSuccess: () => onSuccess?.(),
    onSettled: (_data, _error, { questId }) => {
      void queryClient.invalidateQueries(['quest', questId]);
      void queryClient.invalidateQueries('quests');
    },
  });
};
