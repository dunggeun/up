import { createElement } from 'react';
import { useMutation, type UseMutationResult } from 'react-query';
import { Text } from 'src/designs';
import * as Toast from 'src/components/Toast';
import { AppManager } from 'src/modules';
import { addQuest } from 'src/data';
import { t } from 'src/translations';

const manager = AppManager.getInstance();
const queryClient = manager.getQueryClient();

const ErrorToastContent = createElement(Text, null, t('message.error.common'));

export const useAddQuest = (): UseMutationResult<
  void,
  Error,
  Parameters<typeof addQuest>[0]
> => {
  return useMutation(addQuest, {
    onError: () => Toast.show(ErrorToastContent),
    onSettled: () => void queryClient.invalidateQueries('quests'),
  });
};
